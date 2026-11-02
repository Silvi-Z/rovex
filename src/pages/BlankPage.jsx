import { useEffect } from 'react';

/**
 * Placeholder for the routes whose content has not been designed yet.
 *
 * Intentionally empty: the shared header is rendered by the layout and
 * nothing is invented here. Replace the body of a page by swapping its
 * entry in `src/routes/routes.jsx` for a real component.
 */
export default function BlankPage({ title }) {
  useEffect(() => {
    document.title = title ? `${title} — Rovex` : 'Rovex';
    return () => {
      document.title = 'Rovex';
    };
  }, [title]);

  return <main className="page page--blank" aria-label={title} />;
}
