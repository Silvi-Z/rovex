import { useId, useState } from 'react';
import { FILE_ACCEPT, FILE_MAX_BYTES, FORM_FIELDS } from '../../data/contactPage';
import { useTranslation } from '../../i18n/I18nProvider';
import './ContactForm.css';

const ENDPOINT = '/api/contact';
const EMAIL_RE = /^[^@\s<>"']+@[^@\s<>"']+\.[^@\s<>"']{2,}$/;

/** Error codes the server can return; anything else shows the generic text. */
const KNOWN_ERRORS = [
  'name_required', 'contact_required', 'email_invalid', 'phone_invalid',
  'file_invalid', 'file_too_large', 'too_long', 'rate_limited',
];

/**
 * The white enquiry card.
 *
 * Posts to the contact backend (server/contact), which emails the request to
 * info@rovex.am. The frame specifies no success or error states, so they are
 * kept to one line of text under the button, styled from the card's own type.
 */
export default function ContactForm() {
  const id = useId();
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorCode, setErrorCode] = useState('');
  const { t, language } = useTranslation();

  const fail = (code) => {
    setErrorCode(KNOWN_ERRORS.includes(code) ? code : 'generic');
    setStatus('error');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (name) => String(data.get(name) ?? '').trim();
    const file = data.get('attachment');

    // Same rules as the server, checked here first so nothing is uploaded in vain.
    if (!value('fullName')) return fail('name_required');
    if (!value('phone') && !value('email')) return fail('contact_required');
    if (value('email') && !EMAIL_RE.test(value('email'))) return fail('email_invalid');
    if (file && file.size > FILE_MAX_BYTES) return fail('file_too_large');

    data.set('lang', language);
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data });
      if (res.status === 429) return fail('rate_limited');
      if (res.status === 413) return fail('file_too_large');
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) return fail(json.error);
      setStatus('sent');
      form.reset();
      setFileName('');
    } catch {
      fail('generic');
    }
  };

  // Editing after a message clears it, so stale errors don't linger.
  const handleChange = () => {
    if (status === 'error' || status === 'sent') setStatus('idle');
  };

  return (
    <form className="cform" onSubmit={handleSubmit} onChange={handleChange} noValidate>
      <h2 className="cform__title">{t('contact.form.title')}</h2>

      {FORM_FIELDS.map(({ name, type, autoComplete }) => (
        <div className="cform__row" key={name}>
          <label className="cform__label" htmlFor={`${id}-${name}`}>
            {t(`contact.form.${name}`)}
          </label>
          <input
            className="cform__input"
            id={`${id}-${name}`}
            name={name}
            type={type}
            autoComplete={autoComplete}
            maxLength={200}
          />
        </div>
      ))}

      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div className="cform__hp" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="cform__row">
        <span className="cform__label" id={`${id}-file-label`}>{t('contact.form.fileLabel')}</span>
        <label className="cform__file" htmlFor={`${id}-file`}>
          <img className="cform__file-icon" src="/assets/icon-upload.png" width="26" height="26" alt="" />
          <span className="cform__file-action">{t('contact.form.fileAction')}</span>
          <span className="cform__file-hint">{fileName || t('contact.form.fileHint')}</span>
          <input
            className="cform__file-input"
            id={`${id}-file`}
            name="attachment"
            type="file"
            accept={FILE_ACCEPT}
            aria-labelledby={`${id}-file-label`}
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
      </div>

      <button className="cform__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
      </button>

      <p
        className={`cform__status${status === 'error' ? ' cform__status--error' : ''}`}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {status === 'sent' && t('contact.form.sent')}
        {status === 'error' && t(`contact.form.errors.${errorCode}`)}
      </p>
    </form>
  );
}
