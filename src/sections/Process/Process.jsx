import { PROCESS_STEP_IDS } from '../../data/processSteps';
import { useTranslation } from '../../i18n/I18nProvider';
import Lines from '../../i18n/Lines';
import './Process.css';

export default function Process() {
  const { t } = useTranslation();

  return (
    <section className="process">
      <div className="process__glow" role="presentation" />
      <div className="container">
        <h2 className="process__heading">{t('home.process.heading')}</h2>

        <div className="process__rail" role="presentation" />

        <ol className="process__grid">
          {PROCESS_STEP_IDS.map((id, index) => {
            const title = t(`home.process.steps.${id}.title`);
            const isSingleLine = !Array.isArray(title) || title.length === 1;

            return (
              <li className="step" key={id}>
                <span className="step__num" aria-hidden="true">{index + 1}</span>
                <h3 className={isSingleLine ? 'step__title step__title--single' : 'step__title'}>
                  <Lines value={title} />
                </h3>
                <p className="step__body">{t(`home.process.steps.${id}.body`)}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
