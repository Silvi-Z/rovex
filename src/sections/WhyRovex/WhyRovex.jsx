import Accordion from '../../components/Accordion/Accordion';
import { ADVANTAGE_IDS } from '../../data/advantages';
import { useTranslation } from '../../i18n/I18nProvider';
import './WhyRovex.css';

export default function WhyRovex() {
  const { t } = useTranslation();

  const items = ADVANTAGE_IDS.map((id) => ({
    id,
    label: t(`advantages.${id}.title`),
    body: t(`advantages.${id}.body`),
  }));

  return (
    <section className="why">
      <div className="container why__grid">
        <div className="why__left">
          <h2 className="why__heading">{t('home.why.heading')}</h2>
          <p className="why__body">{t('home.why.body')}</p>
        </div>

        <div className="why__right">
          <h2 className="why__title">{t('whyRovex')}</h2>
          <Accordion items={items} defaultOpenId={ADVANTAGE_IDS[0]} />
        </div>
      </div>
    </section>
  );
}
