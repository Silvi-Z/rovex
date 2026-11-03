import { useTranslation } from '../../i18n/I18nProvider';
import './ServicesHero.css';

export default function ServicesHero() {
  const { t } = useTranslation();

  return (
    <section className="shero">
      <div className="shero__media" role="presentation" />
      <div className="container shero__content">
        <h1 className="shero__title">{t('servicesPage.title')}</h1>
        <p className="shero__sub">{t('servicesPage.tagline')}</p>
      </div>
    </section>
  );
}
