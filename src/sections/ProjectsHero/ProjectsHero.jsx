import { useTranslation } from '../../i18n/I18nProvider';
import './ProjectsHero.css';

export default function ProjectsHero() {
  const { t } = useTranslation();

  return (
    <section className="phero">
      <div className="phero__media" role="presentation" />
      <div className="container phero__content">
        <h1 className="phero__title">{t('projectsPage.title')}</h1>
        <p className="phero__sub">{t('projectsPage.tagline')}</p>
      </div>
    </section>
  );
}
