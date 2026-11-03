import { MAINTENANCE_ITEMS } from '../../data/servicesPage';
import { useTranslation } from '../../i18n/I18nProvider';
import Lines from '../../i18n/Lines';
import './Maintenance.css';

export default function Maintenance() {
  const { t } = useTranslation();

  return (
    <section className="maint">
      <div className="container maint__inner">
        <h2 className="maint__heading">{t('servicesPage.maintenance.heading')}</h2>
        <p className="maint__sub">{t('servicesPage.maintenance.sub')}</p>
        <p className="maint__body">{t('servicesPage.maintenance.body')}</p>

        <ul className="maint__list">
          {MAINTENANCE_ITEMS.map((id) => (
            <li className="maint__item" key={id}>
              <span><Lines value={t(`servicesPage.maintenance.items.${id}`)} /></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
