"""
Contact-form backend for rovex.am.

Receives the enquiry form from the site (POST /api/contact, multipart/form-data)
and forwards it by email to info@rovex.am through Zoho SMTP.

Standard library only -- no packages to install or keep patched. It runs in its
own container on 127.0.0.1 and is reached only through nginx, which also does
the rate limiting and caps the request size.

Why Zoho SMTP and not local mail: rovex.am's SPF record authorises only Zoho,
so mail sent from the server itself would be rejected or land in spam.

Configuration (environment):
    SMTP_HOST   default smtppro.zoho.com
    SMTP_PORT   default 465 (implicit TLS)
    SMTP_USER   mailbox to log in as, e.g. info@rovex.am
    SMTP_PASS   Zoho app-specific password for that mailbox
    MAIL_FROM   default SMTP_USER
    MAIL_TO     default info@rovex.am
    LISTEN_PORT default 8000

Responses are JSON: {"ok": true} or {"ok": false, "error": "<code>"}; the site
maps the code to text in the visitor's language.
"""

import json
import logging
import os
import re
import smtplib
import ssl
import sys
from datetime import datetime, timezone
from email.message import EmailMessage
from email.parser import BytesParser
from email.policy import HTTP, default as default_policy
from email.utils import formataddr
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

SMTP_HOST = os.environ.get("SMTP_HOST", "smtppro.zoho.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "465"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
MAIL_FROM = os.environ.get("MAIL_FROM", SMTP_USER)
MAIL_TO = os.environ.get("MAIL_TO", "info@rovex.am")
LISTEN_PORT = int(os.environ.get("LISTEN_PORT", "8000"))

MAX_BODY = 12 * 1024 * 1024        # whole request; nginx enforces the same cap
MAX_FILE = 10 * 1024 * 1024        # the attachment itself
MAX_TEXT = 200                     # any single text field

# Allowed attachments, checked by content, not just by the name the browser sent.
FILE_SIGNATURES = {
    ".pdf": (b"%PDF-",),
    ".png": (b"\x89PNG\r\n\x1a\n",),
    ".jpg": (b"\xff\xd8\xff",),
    ".jpeg": (b"\xff\xd8\xff",),
}
MIME_TYPES = {".pdf": "application/pdf", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg"}

EMAIL_RE = re.compile(r"^[^@\s<>\"']+@[^@\s<>\"']+\.[^@\s<>\"']{2,}$")
PHONE_RE = re.compile(r"^[0-9+()\-.\s]{5,30}$")

logging.basicConfig(stream=sys.stdout, level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("rovex-contact")


class BadRequest(Exception):
    def __init__(self, code, status=400):
        super().__init__(code)
        self.code = code
        self.status = status


def parse_multipart(content_type, body):
    """Return (fields: dict[str, str], files: list[(filename, bytes)])."""
    if not content_type.lower().startswith("multipart/form-data"):
        raise BadRequest("bad_request")
    head = f"Content-Type: {content_type}\r\nMIME-Version: 1.0\r\n\r\n".encode()
    msg = BytesParser(policy=HTTP).parsebytes(head + body)
    if not msg.is_multipart():
        raise BadRequest("bad_request")

    fields, files = {}, []
    for part in msg.iter_parts():
        name = part.get_param("name", header="content-disposition")
        if not name:
            continue
        filename = part.get_filename()
        payload = part.get_payload(decode=True) or b""
        if filename is not None:
            if payload:
                files.append((filename, payload))
        else:
            fields[name] = payload.decode("utf-8", errors="replace").strip()
    return fields, files


def clean_line(value):
    # No newlines in anything that ends up in a header or a single-line field.
    return re.sub(r"[\r\n\t]+", " ", value).strip()


def validate(fields, files):
    # Honeypot: a field real visitors never see. Bots fill it; pretend success.
    if fields.get("website"):
        return None

    data = {k: clean_line(fields.get(k, "")) for k in ("fullName", "company", "phone", "email", "lang")}
    if any(len(v) > MAX_TEXT for v in data.values()):
        raise BadRequest("too_long")
    if not data["fullName"]:
        raise BadRequest("name_required")
    if not data["phone"] and not data["email"]:
        raise BadRequest("contact_required")
    if data["email"] and not EMAIL_RE.match(data["email"]):
        raise BadRequest("email_invalid")
    if data["phone"] and not PHONE_RE.match(data["phone"]):
        raise BadRequest("phone_invalid")

    if len(files) > 1:
        raise BadRequest("file_invalid")
    attachment = None
    if files:
        filename, content = files[0]
        filename = os.path.basename(clean_line(filename).replace("\\", "/"))[:120] or "attachment"
        ext = os.path.splitext(filename)[1].lower()
        if len(content) > MAX_FILE:
            raise BadRequest("file_too_large", 413)
        if ext not in FILE_SIGNATURES or not content.startswith(FILE_SIGNATURES[ext]):
            raise BadRequest("file_invalid")
        attachment = (filename, content, MIME_TYPES[ext])

    data["attachment"] = attachment
    return data


def build_message(data, client_ip):
    msg = EmailMessage(policy=default_policy)
    msg["From"] = formataddr(("Rovex website", MAIL_FROM))
    msg["To"] = MAIL_TO
    if data["email"]:
        msg["Reply-To"] = formataddr((data["fullName"], data["email"]))
    subject = f"Website request: {data['fullName']}"
    if data["company"]:
        subject += f" ({data['company']})"
    msg["Subject"] = subject

    sent_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "New request from the contact form on rovex.am",
        "",
        f"Name:     {data['fullName']}",
        f"Company:  {data['company'] or '-'}",
        f"Phone:    {data['phone'] or '-'}",
        f"Email:    {data['email'] or '-'}",
        f"File:     {data['attachment'][0] if data['attachment'] else '-'}",
        "",
        f"Site language: {data['lang'] or '-'}",
        f"Sent: {sent_at}",
        f"IP: {client_ip}",
        "",
        "Reply to this email to answer the visitor directly." if data["email"] else
        "The visitor left no email address; contact them by phone.",
    ]
    msg.set_content("\n".join(lines))

    if data["attachment"]:
        filename, content, mime = data["attachment"]
        maintype, subtype = mime.split("/")
        msg.add_attachment(content, maintype=maintype, subtype=subtype, filename=filename)
    return msg


def send(msg):
    context = ssl.create_default_context()
    if SMTP_PORT == 465:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=30) as smtp:
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)
    else:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=30) as smtp:
            smtp.starttls(context=context)
            smtp.login(SMTP_USER, SMTP_PASS)
            smtp.send_message(msg)


class Handler(BaseHTTPRequestHandler):
    server_version = "rovex-contact"
    sys_version = ""

    def log_message(self, fmt, *args):  # access log is nginx's job
        pass

    def reply(self, status, payload):
        body = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/healthz":
            self.reply(200, {"ok": True, "configured": bool(SMTP_USER and SMTP_PASS)})
        else:
            self.reply(404, {"ok": False, "error": "not_found"})

    def do_POST(self):
        if self.path.split("?")[0] != "/api/contact":
            return self.reply(404, {"ok": False, "error": "not_found"})
        client_ip = self.headers.get("X-Real-IP", self.client_address[0])
        try:
            length = int(self.headers.get("Content-Length") or 0)
            if length <= 0:
                raise BadRequest("bad_request")
            if length > MAX_BODY:
                raise BadRequest("file_too_large", 413)
            body = self.rfile.read(length)
            fields, files = parse_multipart(self.headers.get("Content-Type", ""), body)
            data = validate(fields, files)
            if data is None:
                log.info("honeypot hit from %s, dropped", client_ip)
                return self.reply(200, {"ok": True})
            if not (SMTP_USER and SMTP_PASS):
                log.error("SMTP credentials are not configured")
                return self.reply(503, {"ok": False, "error": "unavailable"})
            send(build_message(data, client_ip))
            log.info("request sent (ip %s, attachment %s)", client_ip, "yes" if data["attachment"] else "no")
            self.reply(200, {"ok": True})
        except BadRequest as e:
            log.info("rejected %s from %s", e.code, client_ip)
            self.reply(e.status, {"ok": False, "error": e.code})
        except (smtplib.SMTPException, OSError) as e:
            log.error("send failed: %s: %s", type(e).__name__, e)
            self.reply(502, {"ok": False, "error": "send_failed"})
        except Exception:
            log.exception("unexpected error")
            self.reply(500, {"ok": False, "error": "send_failed"})


if __name__ == "__main__":
    if not (SMTP_USER and SMTP_PASS):
        log.warning("SMTP_USER / SMTP_PASS not set: requests will be refused until they are")
    log.info("listening on :%d, delivering to %s via %s:%d", LISTEN_PORT, MAIL_TO, SMTP_HOST, SMTP_PORT)
    ThreadingHTTPServer(("0.0.0.0", LISTEN_PORT), Handler).serve_forever()
