import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { COMPANY, CONTACTS, SOCIALS } from '../../data/company';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/logo-rovex-footer.png"
            width="230"
            height="59"
            alt={COMPANY.name}
          />
          <p className="footer__tagline">{COMPANY.tagline}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Մենյու</h4>
          <ul className="footer__list">
            {NAV_ITEMS.map(({ path, label, footerLabel }) => (
              <li key={path}>
                <Link to={path}>{footerLabel ?? label}</Link>
              </li>
            ))}
          </ul>

          <div className="footer__social">
            {SOCIALS.map(({ key, label, icon, href }) => (
              <a key={key} href={href} aria-label={label}>
                <img src={icon} width="22" height="22" alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col footer__col--contact">
          <h4 className="footer__col-title">Կապ</h4>
          <ul className="footer__list footer__list--contact">
            {CONTACTS.map(({ key, icon, iconSize, text, href }) => (
              <li key={key}>
                <img
                  className="footer__ico"
                  src={icon}
                  width={iconSize.width}
                  height={iconSize.height}
                  alt=""
                />
                {href ? <a href={href}>{text}</a> : <span>{text}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>{COMPANY.copyright}</span>
        <span>{COMPANY.motto}</span>
      </div>
    </footer>
  );
}
