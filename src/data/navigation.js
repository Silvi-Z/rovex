/**
 * Single source of truth for the site's navigation.
 * Consumed by the header, the mobile menu and the footer menu column.
 * `key` / `footerKey` are translation keys (src/locales/<lang>/translation.json).
 *
 * `footerKey` exists because the Figma frame names this one item
 * differently in the header and in the footer.
 */
export const NAV_ITEMS = [
  { path: '/',                  key: 'nav.home' },
  { path: '/products-services', key: 'nav.services', footerKey: 'nav.servicesFull' },
  { path: '/projects',          key: 'nav.projects' },
  { path: '/about',             key: 'nav.about' },
  { path: '/contact',           key: 'nav.contact' },
];
