import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../data/navigation';
import { useTranslation } from '../../i18n/I18nProvider';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './MobileMenu.css';

/** Full-screen navigation shown behind the burger below 1100px. */
export default function MobileMenu({ id, isOpen, onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu" id={id}>
      <nav className="mobile-menu__nav" aria-label={t('nav.mainAria')}>
        {NAV_ITEMS.map(({ path, key }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'mobile-menu__link is-active' : 'mobile-menu__link'
            }
          >
            {t(key)}
          </NavLink>
        ))}
      </nav>

      {/* The menu stays open on switch, so the change is visible in place. */}
      <LanguageSwitcher className="mobile-menu__lang" />
    </div>
  );
}
