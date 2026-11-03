import { useTranslation } from '../i18n/I18nProvider';

/**
 * One contact value (address, phone, email). External links — the address,
 * which opens the office on Google Maps — open in a new tab, and say so to
 * screen readers.
 */
export default function ContactLink({ href, external, children }) {
  const { t } = useTranslation();

  if (!href) return <span>{children}</span>;
  if (!external) return <a href={href}>{children}</a>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={t('contact.openMap')}
      aria-label={`${children} — ${t('contact.openMap')} (${t('common.newTab')})`}
    >
      {children}
    </a>
  );
}
