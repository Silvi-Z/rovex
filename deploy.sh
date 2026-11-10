#!/usr/bin/env bash
#
# Deploy rovex.am from this machine.
#
#   ./deploy.sh              pull main, build, upload, switch the site over, verify
#   ./deploy.sh --rollback   put the previous version back
#
# Works in Git Bash on Windows, and on macOS / Linux. Needs Node 20.19+ and SSH
# key access to the server (nothing is ever asked for interactively).
#
# The site is built HERE, not on the server: the server's Node is too old for
# Vite, and building locally keeps the shared server untouched. The new build
# is uploaded beside the live one and swapped in with a rename, so visitors
# never see a half-uploaded site. The replaced version stays on the server as
# /var/www/rovex.am.prev for --rollback.
#
# If server/contact/ (the contact-form backend) differs from what the server
# runs, it is uploaded and its container restarted too; otherwise it is left
# alone.

set -euo pipefail

SERVER="${DEPLOY_SERVER:-root@161.35.197.210}"
WEBROOT=/var/www/rovex.am
BACKEND_DIR=/opt/rovex-contact
SITE=https://rovex.am

cd "$(dirname "$0")"

step() { printf '\n\033[1;34m==>\033[0m %s\n' "$*"; }
ok()   { printf '    \033[32m%s\033[0m\n' "$*"; }
die()  { printf '\n\033[1;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }

# OpenSSH prints a post-quantum key-exchange notice on every connection to this
# server; it is harmless, so keep it out of the output.
remote() {
    ssh -o BatchMode=yes -o ConnectTimeout=15 "$SERVER" "$@" 2> >(grep -v -e 'post-quantum' -e 'store now' -e 'openssh.com/pq' >&2)
}

# --------------------------------------------------------------------- access
step "Checking SSH access to $SERVER"
remote true 2>/dev/null || die "Cannot reach $SERVER over SSH without a password.
       This machine's SSH key must be in the server's /root/.ssh/authorized_keys.
       Test with:  ssh $SERVER"
ok "access OK"

# ------------------------------------------------------------------- rollback
if [ "${1:-}" = "--rollback" ]; then
    step "Rolling back to the previous version"
    remote "set -e
        [ -d $WEBROOT.prev ] || { echo 'no previous version on the server'; exit 1; }
        rm -rf $WEBROOT.bad
        mv $WEBROOT $WEBROOT.bad && mv $WEBROOT.prev $WEBROOT && mv $WEBROOT.bad $WEBROOT.prev"
    ok "rolled back (running ./deploy.sh --rollback again switches forward again)"
    exit 0
fi
[ $# -eq 0 ] || die "unknown option: $1  (use no options, or --rollback)"

# ------------------------------------------------------------------ toolchain
step "Checking Node"
command -v node >/dev/null || die "Node is not installed (need 20.19 or newer)."
NODE_VER=$(node -p 'process.versions.node')
IFS=. read -r NODE_MAJ NODE_MIN _ <<<"$NODE_VER"
if [ "$NODE_MAJ" -lt 20 ] || { [ "$NODE_MAJ" -eq 20 ] && [ "$NODE_MIN" -lt 19 ]; }; then
    die "Node $NODE_VER is too old for Vite; install 20.19+ (22 LTS recommended)."
fi
ok "node $NODE_VER"

# ------------------------------------------------------------------------ git
step "Getting the latest code"
[ -z "$(git status --porcelain)" ] || die "There are uncommitted changes here. Commit or stash them first,
       so what goes live is exactly what is in the repository."
BRANCH=$(git rev-parse --abbrev-ref HEAD)
[ "$BRANCH" = "main" ] || die "You are on branch '$BRANCH'. Production deploys come from main:  git checkout main"
git pull --ff-only --quiet || die "git pull failed (your main and GitHub's have diverged). Sort that out first."
[ "$(git rev-parse HEAD)" = "$(git rev-parse '@{u}')" ] || die "You have commits that are not on GitHub yet. Push them first:  git push
       (the live site should always match what is in the repository)"
COMMIT=$(git log -1 --format='%h %s')
ok "$COMMIT"

# ---------------------------------------------------------------------- build
step "Building"
npm ci --no-audit --no-fund --loglevel=error
npm run build --silent
BUNDLE=$(grep -o '/build/[^"]*\.js' dist/index.html | head -1)
[ -n "$BUNDLE" ] || die "build produced no JavaScript bundle"
ok "built $BUNDLE"

# --------------------------------------------------------------------- upload
step "Uploading and switching the site over"
tar czf - -C dist . | remote "set -e
    NEW=$WEBROOT.new
    rm -rf \$NEW; mkdir -p \$NEW; tar xzf - -C \$NEW
    chown -R www-data:www-data \$NEW
    find \$NEW -type d -exec chmod 755 {} +; find \$NEW -type f -exec chmod 644 {} +
    rm -rf $WEBROOT.prev
    mv $WEBROOT $WEBROOT.prev && mv \$NEW $WEBROOT"
ok "live; previous version kept as $WEBROOT.prev"

# -------------------------------------------------------------------- backend
step "Checking the contact-form backend"
# Compare with line endings normalised: a Windows checkout has CRLF files, the
# server has LF, and that difference alone must not count as a change.
local_sum()  { tr -d '\r' < "$1" | sha256sum | cut -d' ' -f1; }
remote_sum() { remote "tr -d '\r' < $BACKEND_DIR/$1 2>/dev/null | sha256sum | cut -d' ' -f1"; }
changed=0
for f in app.py Dockerfile; do
    [ "$(local_sum "server/contact/$f")" = "$(remote_sum "$f")" ] || changed=1
done
if [ $changed -eq 1 ]; then
    for f in app.py Dockerfile; do
        tr -d '\r' < "server/contact/$f" | remote "cat > $BACKEND_DIR/$f"
    done
    remote "$BACKEND_DIR/restart"
    ok "backend updated and restarted -- send one test through the contact form"
else
    ok "unchanged, left running"
fi

# --------------------------------------------------------------------- verify
step "Verifying $SITE"
LIVE_BUNDLE=$(curl -fsS "$SITE/" | grep -o '/build/[^"]*\.js' | head -1 || true)
[ "$LIVE_BUNDLE" = "$BUNDLE" ] || die "the live site serves '$LIVE_BUNDLE', expected '$BUNDLE'.
       Roll back with:  ./deploy.sh --rollback"
for path in / /contact "$BUNDLE"; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$SITE$path")
    [ "$code" = "200" ] || die "$SITE$path returned $code.  Roll back with:  ./deploy.sh --rollback"
done
HEALTH=$(remote "curl -s http://127.0.0.1:8002/healthz" || true)
case "$HEALTH" in
    *'"configured": true'*) ok "pages load, contact backend healthy" ;;
    *) printf '    \033[33mpages load, but the contact backend reports: %s\033[0m\n' "${HEALTH:-no answer}" ;;
esac

printf '\n\033[1;32mDeployed:\033[0m %s\n' "$COMMIT"
