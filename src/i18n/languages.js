/**
 * Supported languages, in switcher order. `short` is what the header shows
 * (the frame's "ՀԱՅ/EN/РУ"); `name` is each language's own name, used for
 * the accessible label and tooltip. Neither is translated.
 */
export const LANGUAGES = [
  { code: 'hy', short: 'ՀԱՅ', name: 'Հայերեն' },
  { code: 'en', short: 'EN',  name: 'English' },
  { code: 'ru', short: 'РУ',  name: 'Русский' },
];

export const DEFAULT_LANGUAGE = 'hy';

export const STORAGE_KEY = 'rovex.lang';
