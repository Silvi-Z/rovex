import { FEATURE_COLUMNS } from '../../data/aboutPage';
import { useTranslation } from '../../i18n/I18nProvider';
import './FullCycle.css';

function Feature({ id, metrics }) {
  const { t } = useTranslation();

  // Desktop-only placement; FullCycle.css reads these inside its >1100px query.
  const style = {
    '--d-row-h': metrics.rowH ? `${metrics.rowH}px` : 'auto',
    '--d-title-top': `${metrics.titleTop}px`,
    '--d-icon-top': `${metrics.iconTop}px`,
    '--d-body-gap': `${metrics.bodyGap}px`,
  };

  return (
    <li className="feature" style={style}>
      <img
        className="feature__bullet"
        src="/assets/about-bullet.svg"
        width="26"
        height="12"
        alt=""
        aria-hidden="true"
      />
      <h3 className="feature__title">{t(`advantages.${id}.title`)}</h3>
      <p className="feature__body">{t(`advantages.${id}.body`)}</p>
    </li>
  );
}

export default function FullCycle() {
  const { t } = useTranslation();

  return (
    <section className="cycle">
      <div className="container">
        <div className="cycle__intro">
          <h2 className="cycle__heading">{t('about.heading')}</h2>
          <p className="cycle__text">{t('about.intro')}</p>
        </div>

        <div className="features">
          {FEATURE_COLUMNS.map((column, i) => (
            <ul
              key={i}
              className={i === 0 ? 'features__col features__col--closed' : 'features__col'}
            >
              {column.map((item) => (
                <Feature key={item.id} {...item} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
