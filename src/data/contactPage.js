/** Contact page — Figma frame 55:12. */

export const CONTACT_INTRO = {
  title: ['քննարկե՞նք ձեր', 'նախագիծը'],
  lead: [
    // The frame sets a double space after "Ձեր"; HTML collapses runs of
    // whitespace, so the second one is a non-breaking space to keep the line
    // the width the design draws it at.
    'Մենք Ձեր  նախագծի համար կգտնենք տեխնիկապես ճիշտ,',
    'տնտեսապես արդյունավետ և երկարաժամկետ լուծում։',
  ],
};

/** The large contact rows in the left column (not the footer's small ones). */
export const CONTACT_ROWS = [
  {
    key: 'address',
    icon: '/assets/contact-icon-location.png',
    iconSize: { width: 32, height: 40 },
    text: 'Նիկողայոս Ադոնց 4/3',
  },
  {
    key: 'phone',
    icon: '/assets/contact-icon-phone.png',
    iconSize: { width: 39, height: 39 },
    text: '+374 98553533',
    href: 'tel:+37498553533',
  },
  {
    key: 'email',
    icon: '/assets/contact-icon-mail.png',
    iconSize: { width: 43, height: 30 },
    text: 'info@rovex.am',
    href: 'mailto:info@rovex.am',
  },
];

export const FORM = {
  title: 'Ուղարկել հարցում',
  fields: [
    { name: 'fullName', label: 'Անուն Ազգանուն',         type: 'text',  autoComplete: 'name' },
    { name: 'company',  label: 'Ձեր ընկերության անունը',  type: 'text',  autoComplete: 'organization' },
    { name: 'phone',    label: 'Հեռախոսահամար',           type: 'tel',   autoComplete: 'tel' },
    { name: 'email',    label: 'Էլ. հասցե',               type: 'email', autoComplete: 'email' },
  ],
  file: {
    label: 'Կցել ֆայլ',
    action: 'Ընտրել ֆայլեր',
    hint: 'PDF, JPEG, PNG',
    accept: '.pdf,.jpeg,.jpg,.png',
  },
  submit: 'ՈՒՂԱՐԿԵԼ',
};
