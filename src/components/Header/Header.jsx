import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { useTranslation } from '../../i18n/I18nProvider';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // The header is fixed; it gets a background only once the page has
  // scrolled, so at the top it overlays the hero exactly as in the frame.
  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  return (
    <>
      <header className={isScrolled ? 'nav is-scrolled' : 'nav'}>
        <div className="container nav__inner">
          <Link className="nav__logo" to="/" aria-label="Rovex">
            <img src="/assets/logo-rovex-header.svg" width="170" height="44" alt="Rovex" />

          </Link>

          <nav className="nav__links" aria-label={t('nav.mainAria')}>
            {NAV_ITEMS.map(({ path, key }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
              >
                {t(key)}
              </NavLink>
            ))}

            <LanguageSwitcher className="nav__lang" />
          </nav>

          <Link className="btn btn--primary nav__cta" to="/contact">
            {t('cta.discuss')}
          </Link>

          <button
            className="nav__burger"
            type="button"
            aria-label={t('nav.menuAria')}
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
