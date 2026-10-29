/**
 * Single source of truth for the site's navigation.
 * Consumed by the header, the mobile menu and the footer menu column.
 *
 * `footerLabel` exists because the Figma frame spells this one item
 * differently in the header and in the footer. Both spellings are
 * reproduced verbatim rather than normalised.
 */
export const NAV_ITEMS = [
  { path: '/',                  label: 'Գլխավոր էջ' },
  {
    path: '/products-services',
    label: 'Ապրանքներ և ծառայությաւոններ',
    footerLabel: 'Ապրանքներ և ծառայություններ',
  },
  { path: '/projects',          label: 'Նախագծեր' },
  { path: '/about',             label: 'Մեր մասին' },
  { path: '/contact',           label: 'Կապ' },
];

export const LANGUAGES = { active: 'ՀԱՅ', inactive: '/EN' };
