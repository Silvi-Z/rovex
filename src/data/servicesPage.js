/**
 * Services page — Figma frame 143:325 "Services". Ids, images and the
 * frame's geometry only; every visible string lives in the locale files
 * under `servicesPage.*`.
 */

/**
 * The 2 × 2 service cards (y 683 → 1495). The frame does not place the four
 * illustrations or titles on a common grid, so each card keeps its own
 * offsets (px from the card's top-left corner):
 *   img   — where the illustration sits and how wide it is
 *   title — top of the title box
 * The illustrations are the frame's mask groups, exported at 2× and flattened
 * onto the card colour (cards 1–2 are #111422, cards 3–4 #101321).
 */
export const SERVICE_CARDS = [
  {
    id: 'facade',
    image: '/assets/services-facade.jpg',
    bg: '#111422',
    height: 390,
    img: { x: 32, y: 0, w: 439, h: 306 },
    titleTop: 251,
  },
  {
    id: 'glazing',
    image: '/assets/services-glazing.jpg',
    bg: '#111422',
    height: 390,
    img: { x: 68, y: 11, w: 386, h: 263 },
    titleTop: 251,
  },
  {
    id: 'cladding',
    image: '/assets/services-cladding.jpg',
    bg: '#101321',
    height: 389,
    img: { x: 40, y: 30, w: 439, h: 329 },
    titleTop: 240,
  },
  {
    id: 'maintenance',
    image: '/assets/services-maintenance.jpg',
    bg: '#101321',
    height: 389,
    img: { x: 52.5, y: 23, w: 405, h: 283.5 },
    titleTop: 226,
  },
];

/**
 * In-house production timeline (y 1906 → 3310). Photos alternate sides and
 * butt end to end; the title, its rule and the numbered disc sit beside each
 * photo at the frame's own offsets from the photo's top:
 *   height   — photo height
 *   rowH     — distance to the next photo's top (the frame's photos overlap
 *              by half a pixel, so rows follow the frame's own pitch)
 *   titleTop — top of the title box
 *   ruleGap  — title box bottom → rule
 *   ruleW    — rule length
 *   numTop   — top of the 75px disc
 */
export const PRODUCTION_STEPS = [
  { id: 'cutting',    image: '/assets/services-cutting.jpg',    side: 'left',  height: 278, rowH: 278,   titleTop: 93, ruleGap: 13, ruleW: 454, numTop: 81 },
  { id: 'edging',     image: '/assets/services-edging.jpg',     side: 'right', height: 276.5, rowH: 276, titleTop: 98, ruleGap: 18, ruleW: 451, numTop: 90 },
  { id: 'tempering',  image: '/assets/services-tempering.jpg',  side: 'left',  height: 276.5, rowH: 276, titleTop: 78, ruleGap: 14, ruleW: 459, numTop: 74 },
  { id: 'washing',    image: '/assets/services-washing.jpg',    side: 'right', height: 276, rowH: 276,   titleTop: 78, ruleGap: 9,  ruleW: 460, numTop: 96 },
  { id: 'lamination', image: '/assets/services-lamination.jpg', side: 'left',  height: 276.5, rowH: 276.5, titleTop: 91, ruleGap: 14, ruleW: 454, numTop: 88 },
];

/** Maintenance checklist, in the frame's reading order (two rows of two, then one centred). */
export const MAINTENANCE_ITEMS = ['inspection', 'fastenings', 'hardware', 'drainage', 'emergency'];
