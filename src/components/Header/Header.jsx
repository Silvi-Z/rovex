import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_ITEMS, LANGUAGES } from '../../data/navigation';
import MobileMenu from '../MobileMenu/MobileMenu';
import './Header.css';

const MOBILE_MENU_ID = 'mobile-menu';

/**
 * Site header. Absolutely positioned against `.app`, so on the home page it
 * overlays the hero exactly as it did in the original HTML, and on every
 * other page it sits on the dark page background.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="nav">
        <div className="container nav__inner">
          <Link className="nav__logo" to="/" aria-label="Rovex">
            <img src="/assets/logo-rovex-header.png" width="148" height="38" alt="Rovex" />
          </Link>

          <nav className="nav__links" aria-label="Հիմնական">
            {NAV_ITEMS.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
              >
                {label}
              </NavLink>
            ))}

            <span className="nav__lang">
              <Link to="/">{LANGUAGES.active}</Link>
              <span className="nav__lang-sep">{LANGUAGES.inactive}</span>
            </span>
          </nav>

          <Link className="btn btn--primary nav__cta" to="/contact">
            Քննարկե՞նք ձեր նախագիծը
          </Link>

          <button
            className="nav__burger"
            type="button"
            aria-label="Մենյու"
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
