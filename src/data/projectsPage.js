/**
 * Projects page — Figma frame 66:435.
 *
 * `categories` on each project follow that project's own type line: anything
 * whose type says "Հյուրանոցային" is in the hotels filter, "Բնակելի" in
 * residential, and so on. Two projects (Opera Suite, Irina Rodnina Ice Arena)
 * have types matching none of the five tabs, so they appear only under "all".
 *
 * Filter labels and project types are translation keys
 * (`projectsPage.filters.<id>`, `projectTypes.<type>`); titles are proper
 * names and stay as in the frame.
 */

export const PROJECT_FILTER_IDS = ['all', 'hotel', 'residential', 'education', 'retail'];

export const PROJECTS = [
  { id: 'abovyan-5',                    title: 'Abovyan 5',                     year: 2026, type: 'hotel',                  image: '/assets/proj-abovyan-5.png',                    categories: ['hotel'] },
  { id: 'dvin-hotel',                   title: 'Dvin Hotel',                    year: 2018, type: 'hotel',                  image: '/assets/proj-dvin-hotel.png',                   categories: ['hotel'] },
  { id: 'double-tree',                  title: 'Double Tree by Hilton',         year: 2015, type: 'hotel',                  image: '/assets/proj-double-tree.png',                  categories: ['hotel'] },
  { id: 'the-alexander',                title: 'The Alexander',                 year: 2018, type: 'hotel',                  image: '/assets/proj-the-alexander.png',                categories: ['hotel'] },
  { id: 'renaissance-premium-home',     title: 'Renaissace Premium Home',       year: 2024, type: 'residential',            image: '/assets/proj-renaissance-premium-home.png',     categories: ['residential'] },
  { id: 'coaf-smart-center',            title: 'COAF Smart Center',             year: 2018, type: 'educationCommunity',     image: '/assets/proj-coaf-smart-center.png',            categories: ['education'] },
  { id: 'dilijan-international-school', title: 'Dilijan International School',  year: 2014, type: 'internationalEducation', image: '/assets/proj-dilijan-international-school.png', categories: ['education'] },
  { id: 'liberty-1',                    title: 'Liberty 1',                     year: 2024, type: 'residential',            image: '/assets/proj-liberty-1.png',                    categories: ['residential'] },
  { id: 'courtyard-by-marriott',        title: 'Courtyard by Marriott',         year: 2024, type: 'hotelResidential',       image: '/assets/proj-courtyard-by-marriott.png',        categories: ['hotel', 'residential'] },
  { id: 'opera-suite',                  title: 'Opera Suite',                   year: 2015, type: 'entertainment',          image: '/assets/proj-opera-suite.png',                  categories: [] },
  { id: 'irina-rodnina-ice-arena',      title: 'Irina Rodnina Ice Arena',       year: 2015, type: 'skatingSchool',          image: '/assets/proj-irina-rodnina-ice-arena.png',      categories: [] },
  { id: 'yerevan-mall',                 title: 'Yerevan Mall',                  year: 2014, type: 'shoppingEntertainment',  image: '/assets/proj-yerevan-mall.png',                 categories: ['retail'] },
];
