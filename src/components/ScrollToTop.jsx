import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A client-side navigation keeps the previous scroll position, which is
 * wrong when moving between pages. Reset it on every path change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
