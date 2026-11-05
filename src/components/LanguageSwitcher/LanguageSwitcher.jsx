import { Fragment } from 'react';
import { useTranslation } from '../../i18n/I18nProvider';
import './LanguageSwitcher.css';

/**
 * "ՀԱՅ/EN/РУ" from the frame, made interactive: the active language is
 * white, the others take the frame's muted grey. `className` lets the
 * header and the mobile menu position it.
 */
export default function LanguageSwitcher({ className = '', onChange }) {
  const { language, setLanguage, languages, t } = useTranslation();

  return (
    <div className={`lang ${className}`} role="group" aria-label={t('nav.languageAria')}>
      {languages.map(({ code, short, name }, index) => (
        <Fragment key={code}>
          {index > 0 && <span className="lang__sep" aria-hidden="true">/</span>}
          <button
            type="button"
            lang={code}
            title={name}
            aria-label={name}
            aria-pressed={language === code}
            // className={({ isActive }) => (isActive ? 'nav__link is-active' : 'nav__link')}
            className={language === code ? 'lang__btn is-active' : 'lang__btn'}
            onClick={() => {
              setLanguage(code);
              onChange?.(code);
            }}
          >
            {short}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
