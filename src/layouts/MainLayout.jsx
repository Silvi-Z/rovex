import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import ScrollToTop from '../components/ScrollToTop';

/**
 * Shared shell for every route: the header is rendered once here and the
 * routed page fills the content area below it.
 */
export default function MainLayout() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}
