/** Brand constants — not translated (the motto is English in every language). */
export const COMPANY = {
  name: 'ROVEX',
  copyright: '2026 ROVEX',
  motto: 'PRECISION IN EVERY DETAL',
};

/**
 * The office location, used by every address link and by the contact-page
 * map so they all open the same place. Exact coordinates of the office pin;
 * the address is shown in a card over the map (ContactMap).
 */
const MAP_COORDS = '40.212655414549104,44.52510503264529';

export const MAP = {
  /** Opens Google Maps (app on mobile, site on desktop) at the office. */
  link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_COORDS)}`,
  /** Keyless embed, pin on the exact coordinates. z=18 is close street level (max 21). */
  embed: (language) =>
    `https://maps.google.com/maps?q=${MAP_COORDS}&z=18&hl=${language}&output=embed`,
};

/**
 * Footer contact rows. Rows with `textKey` are translated; the phone number
 * and email are the same in every language. `external` rows open in a new tab.
 */
export const CONTACTS = [
  {
    key: 'address',
    icon: '/assets/icon-location.png',
    iconSize: { width: 14, height: 18 },
    textKey: 'contact.address',
    href: MAP.link,
    external: true,
  },
  {
    key: 'phone',
    icon: '/assets/icon-phone.png',
    iconSize: { width: 18, height: 18 },
    text: '+374 98553533',
    href: 'tel:+37498553533',
  },
  {
    key: 'email',
    icon: '/assets/icon-mail.png',
    iconSize: { width: 19, height: 14 },
    text: 'info@rovex.am',
    href: 'mailto:info@rovex.am',
  },
];

/** `labelKey` gives the accessible name ("Rovex on Instagram"). */
export const SOCIALS = [
  {
    key: 'instagram',
    labelKey: 'social.instagram',
    icon: '/assets/social-1.png',
    href: 'https://www.instagram.com/rovex.am/',
  },
  {
    key: 'facebook',
    labelKey: 'social.facebook',
    icon: '/assets/social-2.png',
    href: 'https://www.facebook.com/rovex.am/',
  },
];
