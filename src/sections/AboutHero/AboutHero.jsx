import { useTranslation } from '../../i18n/I18nProvider';
import './AboutHero.css';

export default function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="ahero">
      <div className="ahero__media" role="presentation" />
      <div className="ahero__shade" role="presentation" />
      <img
        className="ahero__glow"
        src="/assets/about-hero-glow.svg"
        width="726.5"
        height="628"
        alt=""
        aria-hidden="true"
      />
      <div className="container ahero__content">
        <h1 className="ahero__title">{t('whyRovex')}</h1>
        <p className="ahero__sub">{t('about.heroSub')}</p>
      </div>
    </section>
  );
}
