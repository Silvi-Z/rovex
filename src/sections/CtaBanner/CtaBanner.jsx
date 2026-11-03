import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/I18nProvider';
import Lines from '../../i18n/Lines';
import './CtaBanner.css';

export default function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="cta">
      <img
        className="cta__mark"
        src="/assets/logo-rovex-watermark.png"
        width="455"
        height="331"
        alt=""
        aria-hidden="true"
      />
      <div className="container cta__inner">
        <h2 className="cta__heading">
          <Lines value={t('cta.heading')} />
        </h2>
        <Link className="btn btn--white" to="/contact">{t('cta.button')}</Link>
      </div>
    </section>
  );
}
