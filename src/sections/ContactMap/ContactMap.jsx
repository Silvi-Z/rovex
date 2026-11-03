import { MAP } from '../../data/company';
import { useTranslation } from '../../i18n/I18nProvider';
import './ContactMap.css';

/**
 * Live Google Map of the office, in the strip the frame fills with a map
 * image (55:10): same full-bleed band, same location, same zoom and Google's
 * default style. Map labels follow the site language.
 */
export default function ContactMap() {
  const { t, language } = useTranslation();

  return (
    <section className="cmap">
      <iframe
        className="cmap__frame"
        src={MAP.embed(language)}
        title={t('contact.mapTitle')}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        className="cmap__card"
        href={MAP.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/icon-location.png" alt="" width="14" height="18" />
        <span>{t('contact.address')}</span>
      </a>
    </section>
  );
}
