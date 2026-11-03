import { SERVICE_CARDS } from '../../data/servicesPage';
import { useTranslation } from '../../i18n/I18nProvider';
import './ServiceCards.css';

export default function ServiceCards() {
  const { t } = useTranslation();

  return (
    <section className="scards" aria-label={t('servicesPage.title')}>
      <ul className="scards__grid">
        {SERVICE_CARDS.map(({ id, image, bg, height, img, titleTop }) => (
          <li
            className="scard"
            key={id}
            style={{
              '--card-bg': bg,
              '--card-h': `${height}px`,
              '--img-x': img.x,
              '--img-y': img.y,
              '--img-w': img.w,
              '--title-top': `${titleTop}px`,
            }}
          >
            <img
              className="scard__art"
              src={image}
              width={img.w}
              height={img.h}
              alt=""
              loading="lazy"
            />
            <div className="scard__text">
              <h2 className="scard__title">{t(`servicesPage.cards.${id}.title`)}</h2>
              <p className="scard__body">{t(`servicesPage.cards.${id}.body`)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
