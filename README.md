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
| `/projects` | `pages/ProjectsPage.jsx` | Նախագծեր | Blank |
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

## Open issues

### 1. The header nav wraps between ~1101px and ~1366px — pre-existing

Between the burger breakpoint (1100px) and about 1366px, the desktop nav does
not fit on one line, so flexbox shrinks the links and four of the five labels
wrap to two lines. Measured widths and heights are **identical in the static
page and the React build**, so the port is faithful — this came from the
original HTML, not from the conversion, and the Figma frame only specifies
1440px.

I have not changed it, because preserving the approved responsive behaviour was
part of the brief. The fix is one line — raise the burger breakpoint in
`src/components/Header/Header.css` (and the matching `.hero`/gutter queries)
from `1100px` to `1366px`, so the desktop nav is only shown at widths where it
fits. Say the word and I will apply it.

### 2. Still only one font weight

`Montserratarm-Regular.otf` is the only cut available, so the browser
synthesises SemiBold and Bold and renders Light/ExtraLight as Regular. Carried
over from the static build. Drop the other `.otf` files into
`public/assets/fonts/` and add a `@font-face` block per weight in
`src/styles/fonts.css`.

### 3. Carried over from the static page

Unchanged by this port, listed so they are not lost: the two blue glows are CSS
gradients rather than the original SVGs; the accordion and footer rule greys are
measured from the render rather than read from the file; accordion rows 2–7 have
no body copy in the design; `Inter` falls back to a system stack. The static
project's README has the detail.
