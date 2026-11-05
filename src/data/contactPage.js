import { MAP } from './company';

/**
 * Contact page — Figma frame 55:12. Visible copy lives in the locale files
 * (`contact.*`, `cta.heading`); this file keeps structure only.
 */

/**
 * The large contact rows in the left column (not the footer's small ones).
 * Icon sizes are the frame's boxes (59:326–59:328); the images are exported
 * from those nodes at 2×.
 */
export const CONTACT_ROWS = [
  {
    key: 'address',
    icon: '/assets/contact-icon-location.png',
    iconSize: { width: 25.3, height: 31.3 },
    textKey: 'contact.address',
    href: MAP.link,
    external: true,
  },
  {
    key: 'phone',
    icon: '/assets/contact-icon-phone.png',
    iconSize: { width: 32, height: 31.8 },
    text: '+374 94707171',
    href: 'tel:+37494707171',
  },
  {
    key: 'email',
    icon: '/assets/contact-icon-mail.png',
    iconSize: { width: 33.3, height: 25 },
    text: 'info@rovex.am',
    href: 'mailto:info@rovex.am',
  },
];

/** Form fields; labels are `contact.form.<name>`. */
export const FORM_FIELDS = [
  { name: 'fullName', type: 'text',  autoComplete: 'name' },
  { name: 'company',  type: 'text',  autoComplete: 'organization' },
  { name: 'phone',    type: 'tel',   autoComplete: 'tel' },
  { name: 'email',    type: 'email', autoComplete: 'email' },
];

export const FILE_ACCEPT = '.pdf,.jpeg,.jpg,.png';

/** Attachment size limit; the server (server/contact) enforces the same. */
export const FILE_MAX_BYTES = 10 * 1024 * 1024;
