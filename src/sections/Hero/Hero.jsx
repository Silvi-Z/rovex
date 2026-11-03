import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import Lines from '../../i18n/Lines';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero__media" role="presentation" />
      <div className="hero__shade" role="presentation" />
      <div className="hero__glow" role="presentation" />

      <div className="container hero__content">
        <h1 className="hero__title">
          <Lines value={t('home.hero.title')} />
        </h1>
        <p className="hero__sub">
          <Lines value={t('home.hero.sub')} />
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary btn--hero" to="/contact">
            {t('cta.discuss')}
          </Link>
          <Link className="btn btn--ghost btn--hero" to="/projects">
            {t('home.hero.viewProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
}
