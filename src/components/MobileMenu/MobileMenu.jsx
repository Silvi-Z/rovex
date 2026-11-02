import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_ITEMS, LANGUAGES } from '../../data/navigation';
import './MobileMenu.css';

/** Full-screen navigation shown behind the burger below 1100px. */
export default function MobileMenu({ id, isOpen, onClose }) {
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
      <nav className="mobile-menu__nav" aria-label="Հիմնական">
        {NAV_ITEMS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'mobile-menu__link is-active' : 'mobile-menu__link'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <span className="mobile-menu__lang">
        <Link to="/" onClick={onClose}>{LANGUAGES.active}</Link>
        <span>{LANGUAGES.inactive}</span>
      </span>
    </div>
  );
}
