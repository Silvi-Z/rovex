import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { COMPANY, CONTACTS, SOCIALS } from '../../data/company';
import { useTranslation } from '../../i18n/I18nProvider';
import ContactLink from '../ContactLink';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/logo-rovex.png"
            width="221"
            height="56"
            alt={COMPANY.name}
          />
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">{t('footer.menu')}</h4>
          <ul className="footer__list">
            {NAV_ITEMS.map(({ path, key, footerKey }) => (
              <li key={path}>
                <Link to={path}>{t(footerKey ?? key)}</Link>
              </li>
            ))}
          </ul>

          <div className="footer__social">
            {SOCIALS.map(({ key, labelKey, icon, href }) => (
              <a
                key={key}
                className="footer__social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t(labelKey)} (${t('common.newTab')})`}
                title={t(labelKey)}
              >
                <img src={icon} width="22" height="22" alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col footer__col--contact">
          <h4 className="footer__col-title">{t('footer.contact')}</h4>
          <ul className="footer__list footer__list--contact">
            {CONTACTS.map(({ key, icon, iconSize, text, textKey, href, external }) => {
              const label = textKey ? t(textKey) : text;
              return (
                <li key={key}>
                  <img
                    className="footer__ico"
                    src={icon}
                    width={iconSize.width}
                    height={iconSize.height}
                    alt=""
                  />
                  <ContactLink href={href} external={external}>{label}</ContactLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span className="footer__copy">
          <img src="/assets/icon-copyright.png" width="11" height="11" alt="" />
          <span>{COMPANY.copyright}</span>
        </span>
        <span>{COMPANY.motto}</span>
      </div>
    </footer>
  );
}
