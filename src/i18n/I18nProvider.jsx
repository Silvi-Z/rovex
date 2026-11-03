import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import hy from '../locales/hy/translation.json';
import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';
import { DEFAULT_LANGUAGE, LANGUAGES, STORAGE_KEY } from './languages';

const RESOURCES = { hy, en, ru };

const I18nContext = createContext(null);

function lookup(dictionary, key) {
  return key.split('.').reduce(
    (node, part) => (node == null ? undefined : node[part]),
    dictionary,
  );
}

function readStoredLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && RESOURCES[stored] ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE; // storage blocked (private mode, sandbox…)
  }
}

/**
 * Holds the active language for the whole app. Switching re-renders every
 * consumer in place (no reload), persists the choice in localStorage and
 * keeps <html lang> in sync for fonts, hyphenation and screen readers.
 */
export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  const setLanguage = useCallback((code) => {
    if (!RESOURCES[code]) return;
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* the choice still applies for this visit */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Missing keys fall back to Armenian (the source language), then to the
   * key itself, so a gap never renders as blank or crashes. Values may be
   * strings or arrays (lines the design breaks explicitly).
   */
  const t = useCallback(
    (key) => {
      let value = lookup(RESOURCES[language], key);
      if (value === undefined && language !== DEFAULT_LANGUAGE) {
        value = lookup(RESOURCES[DEFAULT_LANGUAGE], key);
      }
      if (value === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key "${key}" (${language})`);
        return key;
      }
      return value;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, languages: LANGUAGES, t }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useTranslation must be used inside <I18nProvider>');
  return context;
}

/** Sets "<title> — Rovex" (or just "Rovex") and updates it on language change. */
export function usePageTitle(titleKey) {
  const { t, language } = useTranslation();

  useEffect(() => {
    const site = t('meta.siteName');
    document.title = titleKey ? `${t(titleKey)} — ${site}` : site;
    return () => {
      document.title = site;
    };
  }, [titleKey, t, language]);
}
