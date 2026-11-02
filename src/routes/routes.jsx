import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import ProductsServicesPage from '../pages/ProductsServicesPage';
import ProjectsPage from '../pages/ProjectsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

/**
 * Route table. Paths are kept in sync with `src/data/navigation.js`, which
 * is what the header, mobile menu and footer render their links from.
 */
export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/',                  element: <HomePage /> },
      { path: '/products-services', element: <ProductsServicesPage /> },
      { path: '/projects',          element: <ProjectsPage /> },
      { path: '/about',             element: <AboutPage /> },
      { path: '/contact',           element: <ContactPage /> },
      { path: '*',                  element: <NotFoundPage /> },
    ],
  },
];
