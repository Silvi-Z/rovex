import { PARTNERS } from '../../data/partners';
import { useTranslation } from '../../i18n/I18nProvider';
import './Partners.css';

export default function Partners({ className }) {
  const { t } = useTranslation();

  return (
    <section className={className ? `partners ${className}` : 'partners'}>
      <div className="container">
        <h2 className="partners__heading">{t('partners.heading')}</h2>
        <ul className="partners__grid">
          {PARTNERS.map(({ id, name, image, width, href }) => {
            /* width comes from the logo's exact box in the frame; the
               height follows the image's intrinsic ratio */
            const logo = <img src={image} alt={name} style={{ width: `${width}px` }} />;

            return (
              <li className="partners__cell" key={id}>
                {href ? (
                  <a className="partners__link" href={href} target="_blank" rel="noopener noreferrer">
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
