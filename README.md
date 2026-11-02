# Rovex — React (Vite)

The approved static page converted to React. The home page is **pixel-identical
to the approved HTML** — see [Visual preservation](#visual-preservation).

Plain JavaScript, no TypeScript, no CSS framework, no UI library. Three runtime
dependencies: `react`, `react-dom`, `react-router-dom`.

## Commands

```bash
npm install     # install dependencies
npm run dev     # dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # serve the production build locally
```

## Routes

Defined in `src/routes/routes.jsx`; the links come from `src/data/navigation.js`,
so a path is declared in one place and used by the header, the mobile menu and
the footer menu.

| URL | Page component | Nav label | Content |
|---|---|---|---|
| `/` | `pages/HomePage.jsx` | Գլխավոր էջ | The approved landing page |
| `/products-services` | `pages/ProductsServicesPage.jsx` | Ապրանքներ և ծառայությաւոններ | Blank |
| `/projects` | `pages/ProjectsPage.jsx` | Նախագծեր | Frame `66:435` — built, verified |
| `/about` | `pages/AboutPage.jsx` | Մեր մասին | Blank |
| `/contact` | `pages/ContactPage.jsx` | Կապ | Blank |
| `*` | `pages/NotFoundPage.jsx` | — | Blank |

Blank pages render the shared header and an empty `<main>` — no invented copy,
cards or sections. They are one-line wrappers around `pages/BlankPage.jsx`;
give a route real content by swapping its component in the route table.

Unknown URLs fall back to a blank page rather than a 404 screen, because the
design does not specify one.

## Folder structure

```
public/assets/         images, icons and the font (served from /assets)
src/
  main.jsx             entry — mounts BrowserRouter
  App.jsx              renders the route table
  routes/routes.jsx    route configuration (no page logic)
  layouts/
    MainLayout.jsx     header + <Outlet> — the shared shell
  pages/               one component per route
  sections/            the home page's bands (Hero, WhyRovex, Process,
                       Projects, Partners, CtaBanner)
  components/          reusable UI: Header, MobileMenu, Footer,
                       Accordion, ProjectCard, ScrollToTop
  data/                content the UI maps over
  styles/              fonts.css, tokens.css, base.css
```

CSS is co-located with the component that owns it and imported by it. Only the
three global layers live in `src/styles/`.

## Architecture notes

**Layout.** `MainLayout` renders the header once and the routed page below it.
The header is `position: absolute` against `.app`, which is how it was
positioned against the hero in the static page — so on `/` it overlays the hero
photo exactly as before, and on the blank pages it sits on the dark background.

**Navigation.** `NavLink` supplies the active state, so the underline from the
frame now marks whichever page you are on. Its width had to stop being a
hard-coded 96px (the width of "Գլխավոր էջ") and become an offset from the
label — `left: 0; right: -4.3px` — which reproduces the frame's 4px overhang
for any label. At 1440px this renders identically to the original.

**Content.** Repeated content (nav items, accordion rows, process steps,
project cards, partner logos, contact details) lives in `src/data/` so the
components stay small and nothing is duplicated between the header, mobile menu
and footer. One-off headings stay in their component's JSX, where their exact
line breaks are visible.

**Footer** is part of `HomePage`, not the layout, because the blank pages are
required to be blank. It is a standalone component, so moving it into
`MainLayout` later is a one-line change.

**Style import order matters** and is commented in `src/main.jsx`: the global
layers must be imported before `App`, or the bundler emits the component CSS
first and equal-specificity selectors (`.btn` vs `.nav__cta`) resolve the wrong
way. This was a real bug during the port, not a hypothetical.

**Vercel.** `vercel.json` rewrites every path to `/index.html` so deep links and
refreshes work with `BrowserRouter`. Zero config otherwise: Vercel detects Vite,
runs `npm run build` and serves `dist/`. The bundler's output goes to
`dist/build/` (`build.assetsDir`) to keep it separate from `public/assets`.

## Visual preservation

Compared full-page screenshots of the React build against the approved static
page in Chromium, at six widths:

| width | differing pixels |
|---|---|
| 1680 | 0 |
| 1440 | **0** (of 6,711,840) |
| 1280 | 16 — see below |
| 1024 | 0 |
| 768 | 0 |
| 390 | 0 |

The home document is 4661px tall at 1440px, matching the Figma frame.

The 1280px difference is the active-nav underline: the original's fixed 96px
rule over-extended past its label, the new one tracks the label. Both are 2px
tall and in the same place; see the open issue below for why the label is
narrower than 96px at that width.

### Routing verified

Every route was loaded directly by URL, reloaded, and reached by clicking —
header links, mobile-menu links, footer menu links, the header CTA, the hero
"Տեսնել նախագծերը" button, "Բոլոր նախագծերը" and the CTA button. All resolve
correctly, the active state follows, and the console is clean. The header
collapses to the burger at 1100px and below, the burger opens the menu,
navigates and closes, and there is no horizontal overflow at any width tested.

---

## Sync with the Figma update (frame renamed "Home pg")

The frame was re-inspected and diffed against the implementation. Everything
between the header and the footer — hero, Why Rovex, How we work, Projects,
Partners, CTA — is **byte-identical in Figma to the version already built**, and
was verified unchanged (0 differing pixels in rows 80–4276 against the previous
build). The changes were confined to the header and the footer:

**Header** (now grouped as `58:283`, y 26 → 79)

| | before | now |
|---|---|---|
| logo asset | `logo_2 vers-04` | `logo_2 vers-16` |
| logo box | 148 × 38 at y 29 | **170 × 44 at y 35** |
| nav label 2 | Ապրանքներ և ծառայությաւոններ | **Ծառայությաուններ** |
| nav label baseline | y 41 | **y 43** |
| gap between links | 32px | **49px** |
| logo → first link | 82px | **60px** |
| language switcher | ՀԱՅ/EN | **ՀԱՅ/EN/РУ** |
| inactive language colour | `#7c7a7a` | **`#3d3c3c`** |

The three header parts sit at three different heights in the frame (CTA at 26,
labels at 43, logo at 35), so the row is now top-aligned with a per-child
offset instead of centred.

**Footer** (now a component, `78:30`, y 4320 → 4610)

| | before | now |
|---|---|---|
| logo asset | `logo_2 vers-04` | `logo_2 vers-16` |
| logo box | 230 × 59 at y 4335 | **221 × 56 at y 4320** |
| tagline | y 4410 | **y 4413** |
| link columns | 9px below the logo | **24px below the logo** |
| bottom-left | "2026 ROVEX" at x 80 | **copyright glyph 11 × 11 at x 80, text at x 95** |

Everything else in the footer — menu and contact columns, icons, socials, the
rule at 4586, "PRECISION IN EVERY DETAL" — is unchanged and still lands on its
frame coordinate.

### Verified

Measured every header and footer element in Chromium at 1440px against the
frame coordinates. The document is still **4661px** tall. Exact matches: logo
boxes, active underline (310 / 65 / 96 × 2), CTA (1110 / 26 / 250 × 47), footer
logo, tagline, both column titles, all three contact icons, both socials, the
rule, the copyright glyph and "2026 ROVEX".

All six routes still resolve by click, direct URL and refresh; the active state
follows; the burger menu opens, navigates and closes.

### Follow-up fixes

- **Process rail no longer cuts through the digits.** `.process__rail` had
  `position: relative`, which promoted it past the discs in paint order so the
  3px rule crossed the white numerals. It is now unpositioned, so it paints in
  tree order: visible between the discs, covered by them, numerals clean —
  the frame's layering.
- **CTA button label** is `#01014b`, not `#0000ea`.
- **CTA watermark** is anchored with `right: 0` at every width instead of
  `left: 985px` with an override below 1440. At 1440 that resolves to left 985,
  identical to the frame; above 1440 it now stays on the right edge.

### Nav wrapping fixed

The desktop nav used to wrap to two lines on mid-size screens — a flaw carried
in from the original HTML. Measured precisely: it wraps at **1350px and below**
and is clean at 1351px, so the header now hands over to the burger at 1350px
rather than 1100px. The rest of the page still reflows at 1100px, so the header
simply collapses a little earlier than the content. Verified wrap-free and
overflow-free at 1440 / 1400 / 1366 / 1355 / 1351 / 1350 / 1300 / 1101 / 1024 /
390 — note 1366px laptops keep the full desktop nav.

---

## Fonts

All six cuts the frame uses are self-hosted as woff2 — ExtraLight 200, Light
300, Regular 400, Medium 500, SemiBold 600, Bold 700 — declared in
`src/styles/fonts.css`. Converted from the supplied `Montserratarm-*.otf`
(1.0 MB) to woff2 (500 KB total). Nothing is synthetically emboldened any more.

`Inter`, used only for the two footer meta lines, was never supplied and still
falls back to a system UI stack.

---

## Projects page (frame `66:435`)

Built into the existing `/projects` route rather than a new one. Sections in
frame order: hero (0–605), filter tabs, a 4 × 3 gallery (757–2589), then the
shared CTA banner and footer.

**New files**

```
src/pages/ProjectsPage.jsx              route component
src/sections/ProjectsHero/              hero photo + title block
src/sections/ProjectGallery/            filter tabs + grid
src/components/ProjectTile/             one tile: image + caption below it
src/data/projectsPage.js                12 projects + the 5 filters
public/assets/projects-hero.png         hero photo
public/assets/proj-*.png                12 project photos
```

`CtaBanner`, `Footer` and the shared `Header` are reused unchanged.

**Grid.** The frame holds a constant 458px row pitch whatever the caption
length — Courtyard by Marriott's two-line meta runs into the gap instead of
pushing the next row down — so the rows are a fixed height rather than
content-sized. Below 1100px that pitch no longer matches the narrower images,
so rows size to content again.

**Filters.** Each project's categories come from its own meta line, not from a
taxonomy invented here: anything whose meta says "Հյուրանոցային" is in the
hotels filter, "Բնակելի" in residential, and so on. Two projects (Opera Suite,
Irina Rodnina Ice Arena) have meta lines matching none of the five tabs, so
they appear only under "Բոլոր նախագծերը" — a consequence of the design's own
copy. Counts: all 12, hotels 5, residential 3, education 2, retail 1.

### Verified

Rendered at 1440px against the frame export at 2×:

| band | mean Δ /255 | pixels >25 |
|---|---|---|
| hero | 2.55 | 1.3% |
| filter tabs | 1.76 | 1.8% |
| gallery | **0.70** | 0.5% |
| CTA | 4.59 | 1.3% |
| footer | 0.59 | 0.6% |
| **whole page** | **1.69** | 0.97% |

The document is **3456px** tall, matching the frame, and every band boundary
lands on its frame coordinate: hero 0–604, image rows 757 / 1230 / 1673 / 2131,
CTA 2637–3071, footer 3072–3455. Hero title and subtitle ink match to the
pixel (y 414–463 and 494–520); the active filter tab matches exactly in x and
y; card titles and metas match exactly.

All six routes still resolve by click, direct URL and refresh. Grid goes
3 → 2 → 1 columns, no horizontal overflow at 1680 / 1440 / 1351 / 1350 / 1024 /
768 / 390, console clean.

### Changes to shared code

Two corrections that also affect the home page, both verified against *both*
frame exports:

- **CTA gradient.** The stop positions Figma's generated CSS reported
  (`#0000ea` at 5.2%, `#010122` at 99.1%) saturate to full blue well before the
  right edge, which neither frame's render does. Refitted to the renders; the
  error across the band dropped from up to **+19/255** to **1–4/255** on both
  pages.
- **Copyright glyph** now renders. The `copyright 1.svg` pasted into chat lost
  bytes in transit (its embedded PNG will not decode), so the glyph was
  extracted from the frame export instead, like the other images. It lands at
  x 80–90, y 3392–3402 — identical to the frame.

---

## Open issues

### 1. The Projects frame marks the wrong nav item active

Frame `66:435` draws the header's blue underline under **Ծառայությաուններ**
(Services), not under Նախագծեր, even though the page is the projects listing.
That reads as the header component not having been switched to the Projects
state rather than an intentional design — the home frame underlines the item
you are actually on.

The implementation underlines **Նախագծեր**, keeping the active-nav behaviour
consistent across all six routes. This is the one place the page deliberately
departs from the frame; say the word and it becomes a one-line override.

### 2. The hero photo carries its overlays

The clean hero photograph was not available, only the frame export, so
`projects-hero.png` is cut from that export. Its darkening gradient and blue
right-edge glow are therefore **baked into the image** rather than being CSS
layers like the home hero's, and the frame's own header and hero copy had to
be painted out of it (`cv2.inpaint`) so they would not show through behind the
real markup. The repainted areas sit under the rendered header and headline,
so they are not visible — but at very wide viewports the baked gradient
stretches with the photo instead of staying crisp.

Supply the original photograph and this becomes a drop-in swap: replace the
file and move the gradient and glow into `.phero__media` as CSS layers, the
way `Hero.css` does it.

### 3. Nav labels drift up to 3.4px left of the frame

With the frame's 49px gaps, the intermediate labels land 0.3–3.4px left of
their Figma x positions: the browser shapes each label 0.3–0.9px narrower than
Figma measures it, and the error accumulates across the row. **Not** a
font-substitution artefact — the labels are Regular 400, so installing the real
weights left the widths unchanged, and it is inherent to the two engines
measuring the same font differently. The two anchors are exact: the first link
at 310 and the CTA at 1110 (pinned to the 1360 content edge rather than to a
fixed gap, so it cannot drift). Closing the remainder would mean positioning
each label at a hard-coded x, which is not worth the rigidity.

### 4. Carried over from the static page

Listed so they are not lost: the home hero's two blue glows are CSS gradients
rather than the original SVGs; the accordion and footer rule greys are measured
from the render rather than read from the file; accordion rows 2–7 have no body
copy in the design; `Inter` (two footer meta lines) was never supplied and
falls back to a system stack. The static project's README has the detail.

## Logos

Both logos are the `vers-16` artwork the client supplied. The header uses the
SVG as delivered (its own transform already encodes the frame's 170 × 44 crop);
the footer's 221 × 56 box needs a different crop of the same source, so that
one is generated from the SVG's embedded bitmap using the crop ratios from
node `78:29`.
