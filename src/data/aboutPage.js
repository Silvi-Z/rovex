/**
 * About page — Figma frame 106:45 "About us".
 *
 * Copy lives in the locale files (`about.*`, and `advantages.<id>` for the
 * feature list, shared with the home accordion); this file keeps layout data.
 */

/**
 * The two feature columns (ids from ADVANTAGE_IDS). The frame places every row by hand, so the
 * desktop metrics differ slightly from row to row; they are kept per item
 * so each title, bullet and body lands on its frame coordinate:
 *
 *   rowH     rule-to-rule pitch (rule included); omitted on the last row
 *   titleTop rule's bottom edge → title box
 *   iconTop  title box → bullet
 *   bodyGap  title box bottom → body box
 *
 * Below 1101px the rows fall back to one shared rhythm (see FullCycle.css).
 */
export const FEATURE_COLUMNS = [
  [
    {
      id: 'deadlines',
      metrics: { rowH: 163, titleTop: 31, iconTop: 5, bodyGap: 11 },
    },
    {
      id: 'engineering',
      metrics: { rowH: 212, titleTop: 32, iconTop: 6, bodyGap: 15 },
    },
    {
      id: 'materials',
      metrics: { rowH: 211, titleTop: 30, iconTop: 0, bodyGap: 26 },
    },
    {
      id: 'aftercare',
      metrics: { rowH: 163, titleTop: 31, iconTop: 7, bodyGap: 11 },
    },
  ],
  [
    {
      id: 'production',
      metrics: { rowH: 163, titleTop: 31, iconTop: 5, bodyGap: 10 },
    },
    {
      id: 'savings',
      metrics: { rowH: 212, titleTop: 22, iconTop: 10, bodyGap: 18 },
    },
    {
      id: 'transparency',
      metrics: { titleTop: 30, iconTop: 0, bodyGap: 4 },
    },
  ],
];

/** Production photos, in frame order: the large tile, then the 2 × 2 block. */
export const ABOUT_GALLERY = [
  { id: 'g1', image: '/assets/about-gallery-1.jpg', width: 630, height: 540 },
  { id: 'g2', image: '/assets/about-gallery-2.jpg', width: 302, height: 258 },
  { id: 'g3', image: '/assets/about-gallery-3.jpg', width: 302, height: 258 },
  { id: 'g4', image: '/assets/about-gallery-4.jpg', width: 302, height: 258 },
  { id: 'g5', image: '/assets/about-gallery-5.jpg', width: 302, height: 258 },
];

/**
 * Client logos, row by row. `width`/`height` are the logo's box in the
 * frame; `dx`/`dy` its offset from the centre of its 320 × 187 cell.
 */
export const CLIENTS = [
  { id: 'alexander',   name: 'The Alexander',                image: '/assets/client-alexander.png',    width: 195, height: 145, dx: -0.5, dy: 1 },
  { id: 'kempinski',   name: 'Kempinski',                    image: '/assets/client-kempinski.png',    width: 257, height: 145, dx: -0.5, dy: 1 },
  { id: 'liberty-one', name: 'LibertyOne',                   image: '/assets/client-liberty-one.png',  width: 272, height: 124, dx: 0,    dy: 6.5 },
  { id: 'opera-suite', name: 'Opera Suite Hotel',            image: '/assets/client-opera-suite.png',  width: 189, height: 156, dx: -2.5, dy: 0.5 },
  { id: 'multi-group', name: 'Multi Group',                  image: '/assets/client-multi-group.png',  width: 150, height: 153, dx: -12,  dy: 0 },
  { id: 'doubletree',  name: 'DoubleTree by Hilton',         image: '/assets/client-doubletree.png',   width: 252, height: 168, dx: 3,    dy: 0.5 },
  { id: 'yerevan-mall',name: 'Yerevan Mall',                 image: '/assets/client-yerevan-mall.png', width: 177, height: 141, dx: 5.5,  dy: 2 },
  { id: 'dilijan',     name: 'Dilijan International School', image: '/assets/client-dilijan.png',      width: 118, height: 177, dx: 9,    dy: 5 },
  { id: 'renaissance', name: 'Renaissance Premium Home',     image: '/assets/client-renaissance.png',  width: 117, height: 155, dx: -6.5, dy: 0 },
  { id: 'coaf',        name: 'COAF — Children of Armenia Fund', image: '/assets/client-coaf.png',      width: 297, height: 50,  dx: -0.5, dy: 0.5 },
  { id: 'courtyard',   name: 'Courtyard by Marriott',        image: '/assets/client-courtyard.png',    width: 254, height: 40,  dx: 0,    dy: 0.5 },
  { id: 'niko',        name: 'Niko',                         image: '/assets/client-niko.png',         width: 230, height: 113, dx: 9,    dy: 0 },
];
