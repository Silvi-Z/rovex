/**
 * Home page project cards. `size` maps to the three card footprints in the
 * frame: xl = 737×526, md = 519×251, sm = 411×251. Titles are proper names
 * and stay untranslated; `type` is a key under `projectTypes` in the locale
 * files, shown after the year.
 */
export const FEATURED_PROJECT = {
  id: 'abovyan-5',
  size: 'xl',
  title: 'Abovyan 5',
  year: 2026,
  type: 'hotel',
  image: '/assets/project-abovyan.png',
  imageSize: { width: 737, height: 526 },
};

export const STACKED_PROJECTS = [
  {
    id: 'double-tree',
    size: 'md',
    title: 'Double Tree by Hilton',
    year: 2015,
    type: 'hotel',
    image: '/assets/project-doubletree.png',
    imageSize: { width: 519, height: 251 },
  },
  {
    id: 'the-alexander',
    size: 'md',
    title: 'The Alexander',
    year: 2018,
    type: 'hotel',
    image: '/assets/project-alexander.png',
    imageSize: { width: 519, height: 251 },
  },
];

export const SECONDARY_PROJECTS = [
  {
    id: 'renaissance',
    size: 'sm',
    title: 'Renaissance Premium Home',
    year: 2026,
    type: 'residential',
    image: '/assets/project-renaissance.png',
    imageSize: { width: 411, height: 251 },
  },
  {
    id: 'dilijan',
    size: 'sm',
    title: 'Dilijan International School',
    year: 2014,
    type: 'internationalEducation',
    image: '/assets/project-dilijan.png',
    imageSize: { width: 411, height: 251 },
  },
  {
    id: 'yerevan-mall',
    size: 'sm',
    title: 'Yerevan Mall',
    year: 2014,
    type: 'shoppingEntertainment',
    image: '/assets/project-yerevan-mall.png',
    imageSize: { width: 411, height: 251 },
  },
];
