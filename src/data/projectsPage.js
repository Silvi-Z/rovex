/**
 * Projects page — Figma frame 66:435.
 *
 * `categories` on each project follow that project's own type line: anything
 * whose type says "Հյուրանոցային" is in the hotels filter, "Բնակելի" in
 * residential, and so on. Two projects (Opera Suite, Irina Rodnina Ice Arena)
 * have types matching none of the type tabs, so they appear only under "all".
 *
 * "in-progress" (Ընթացիկ) is a status, not a type: it is added alongside a
 * project's type categories, so those projects show under both tabs.
 *
 * Filter labels and project types are translation keys
 * (`projectsPage.filters.<id>`, `projectTypes.<type>`); titles are proper
 * names and stay as in the frame.
 */

export const PROJECT_FILTER_IDS = ['all', 'hotel', 'residential', 'education', 'retail', 'in-progress'];

export const PROJECTS = [
  { id: 'abovyan-5',                    title: 'Abovyan 5',                     type: 'hotel',                  image: '/assets/proj-abovyan-5.png',                    categories: ['hotel', 'in-progress'] },
  { id: 'dvin-hotel',                   title: 'Dvin Hotel',                    type: 'hotel',                  image: '/assets/proj-dvin-hotel.png',                   categories: ['hotel'] },
  { id: 'double-tree',                  title: 'Double Tree by Hilton',         type: 'hotel',                  image: '/assets/proj-double-tree.png',                  categories: ['hotel'] },
  { id: 'the-alexander',                title: 'The Alexander',                 type: 'hotel',                  image: '/assets/proj-the-alexander.png',                categories: ['hotel'] },
  { id: 'renaissance-premium-home',     title: 'Renaissace Premium Home',       type: 'residential',            image: '/assets/proj-renaissance-premium-home.png',     categories: ['residential', 'in-progress'] },
  { id: 'coaf-smart-center',            title: 'COAF Smart Center',             type: 'educationCommunity',     image: '/assets/proj-coaf-smart-center.png',            categories: ['education'] },
  { id: 'dilijan-international-school', title: 'Dilijan International School',  type: 'internationalEducation', image: '/assets/proj-dilijan-international-school.png', categories: ['education'] },
  { id: 'liberty-1',                    title: 'Liberty 1',                     type: 'residential',            image: '/assets/proj-liberty-1.png',                    categories: ['residential'] },
  { id: 'courtyard-by-marriott',        title: 'Courtyard by Marriott',         type: 'hotelResidential',       image: '/assets/proj-courtyard-by-marriott.png',        categories: ['hotel', 'residential'] },
  { id: 'opera-suite',                  title: 'Opera Suite',                   type: 'entertainment',          image: '/assets/proj-opera-suite.png',                  categories: [] },
  { id: 'irina-rodnina-ice-arena',      title: 'Irina Rodnina Ice Arena',       type: 'skatingSchool',          image: '/assets/proj-irina-rodnina-ice-arena.png',      categories: [] },
  { id: 'yerevan-mall',                 title: 'Yerevan Mall',                  type: 'shoppingEntertainment',  image: '/assets/proj-yerevan-mall.png',                 categories: ['retail'] },
];
