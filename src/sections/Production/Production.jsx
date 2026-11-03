import { PRODUCTION_STEPS } from '../../data/servicesPage';
import { useTranslation } from '../../i18n/I18nProvider';
import './Production.css';

export default function Production() {
  const { t } = useTranslation();

  return (
    <section className="prod">
      <div className="prod__glow" role="presentation" />
      <div className="prod__inner">
        <h2 className="prod__heading">{t('servicesPage.production.heading')}</h2>
        <p className="prod__lead">{t('servicesPage.production.body')}</p>

        <ol className="prod__timeline">
          {PRODUCTION_STEPS.map(({ id, image, side, height, rowH, titleTop, ruleGap, ruleW, numTop }, index) => {
            const title = t(`servicesPage.production.steps.${id}`);
            return (
              <li
                className={`pstep pstep--${side}`}
                key={id}
                style={{
                  '--photo-h': `${height}px`,
                  '--row-h': `${rowH}px`,
                  '--title-top': `${titleTop}px`,
                  '--rule-gap': `${ruleGap}px`,
                  '--rule-w': `${ruleW}px`,
                  '--num-top': `${numTop}px`,
                }}
              >
                <img className="pstep__photo" src={image} alt={title} loading="lazy" />
                <span className="pstep__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="pstep__title">
                  <span className="pstep__label">{title}</span>
                </h3>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
