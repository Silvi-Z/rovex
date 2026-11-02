/**
 * Projects page — Figma frame 66:435.
 *
 * `categories` on each project are taken from that project's own meta line,
 * not assigned independently: anything whose meta says "Հյուրանոցային" is in
 * the hotels filter, "Բնակելի" in residential, and so on. Two projects
 * (Opera Suite, Irina Rodnina Ice Arena) have meta lines that match none of
 * the five tabs, so they appear only under "all" — that follows from the
 * design's own copy rather than from a category invented here.
 */

export const PROJECT_FILTERS = [
  { id: 'all',         label: 'Բոլոր նախագծերը' },
  { id: 'hotel',       label: 'Հյուրանոցային' },
  { id: 'residential', label: 'Բնակելի' },
  { id: 'education',   label: 'Կրթական' },
  { id: 'retail',      label: 'Առևտրային' },
];

export const PROJECTS = [
  {
    id: 'abovyan-5',
    title: 'Abovyan 5',
    meta: '2026 Հյուրանոցային համալիր',
    image: '/assets/proj-abovyan-5.png',
    categories: ['hotel'],
  },
  {
    id: 'dvin-hotel',
    title: 'Dvin Hotel',
    meta: '2018 Հյուրանոցային համալիր',
    image: '/assets/proj-dvin-hotel.png',
    categories: ['hotel'],
  },
  {
    id: 'double-tree',
    title: 'Double Tree by Hilton',
    meta: '2015 Հյուրանոցային համալիր',
    image: '/assets/proj-double-tree.png',
    categories: ['hotel'],
  },
  {
    id: 'the-alexander',
    title: 'The Alexander',
    meta: '2018 Հյուրանոցային համալիր',
    image: '/assets/proj-the-alexander.png',
    categories: ['hotel'],
  },
  {
    id: 'renaissance-premium-home',
    title: 'Renaissace Premium Home',
    meta: '2024 Բնակելի համալիր',
    image: '/assets/proj-renaissance-premium-home.png',
    categories: ['residential'],
  },
  {
    id: 'coaf-smart-center',
    title: 'COAF Smart Center',
    meta: '2018 Կրթական և համայնքային կենտրոն',
    image: '/assets/proj-coaf-smart-center.png',
    categories: ['education'],
  },
  {
    id: 'dilijan-international-school',
    title: 'Dilijan International School',
    meta: '2014 Միջազգային կրթական համալիր',
    image: '/assets/proj-dilijan-international-school.png',
    categories: ['education'],
  },
  {
    id: 'liberty-1',
    title: 'Liberty 1',
    meta: '2024 Բնակելի համալիր',
    image: '/assets/proj-liberty-1.png',
    categories: ['residential'],
  },
  {
    id: 'courtyard-by-marriott',
    title: 'Courtyard by Marriott',
    meta: '2024 Հյուրանոցային և բնակելի\nբազմաֆունկցիոնալ համալիր',
    image: '/assets/proj-courtyard-by-marriott.png',
    categories: ['hotel', 'residential'],
  },
  {
    id: 'opera-suite',
    title: 'Opera Suite',
    meta: '2015 Ժամանցային համալիր',
    image: '/assets/proj-opera-suite.png',
    categories: [],
  },
  {
    id: 'irina-rodnina-ice-arena',
    title: 'Irina Rodnina Ice Arena',
    meta: '2015 Գեղասահքի և հոկեյի մարզադպրոց',
    image: '/assets/proj-irina-rodnina-ice-arena.png',
    categories: [],
  },
  {
    id: 'yerevan-mall',
    title: 'Yerevan Mall',
    meta: '2014 Առևտրաժամանցային համալիր',
    image: '/assets/proj-yerevan-mall.png',
    categories: ['retail'],
  },
];
