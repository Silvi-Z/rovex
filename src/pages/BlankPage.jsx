import { usePageTitle, useTranslation } from '../i18n/I18nProvider';

/**
 * Placeholder for the routes whose content has not been designed yet.
 *
 * Intentionally empty: the shared header is rendered by the layout and
 * nothing is invented here. Replace the body of a page by swapping its
 * entry in `src/routes/routes.jsx` for a real component.
 *
 * `titleKey` is a translation key for the document title and landmark label.
 */
export default function BlankPage({ titleKey }) {
  const { t } = useTranslation();
  usePageTitle(titleKey);

  return <main className="page page--blank" aria-label={titleKey ? t(titleKey) : undefined} />;
}
