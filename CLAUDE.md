# CLAUDE.md

Guidance for working in this repository and a full plan for migrating the site
from vanilla JavaScript to **React**.

---

## 1. What this project is today

A static, single-page personal portfolio for **Sameer (Samir) Watts**, hosted on
**GitHub Pages** under the custom domain **`sameerwatts.com`** (see `CNAME`).

There is no build step. The browser loads `index.html`, which pulls in seven CSS
files and one ES-module entry point (`script.js`). `index.php` only exists so the
same markup can be served by a PHP host (`include_once("index.html")`).

### Current file map

| File | Responsibility |
|------|----------------|
| `index.html` | All markup — 5 sections: Home/Nav, About, Experience, Work, Contact |
| `css/style.css` | Layout primitives, colors, backgrounds, overlay |
| `css/typography.css` | Font-size / weight / spacing utility classes (`fs-30`, `fw-900`, …) |
| `css/navbarStyle.css` | Navbar, gradient progress bar, hamburger, sticky states |
| `css/aboutStyle.css` | Skills grid + animated progress bars |
| `css/experienceStyle.css` | Experience/company cards |
| `css/workStyle.css` | Work cards + popup detail modal |
| `css/contactsStyle.css` | Contact list |
| `elements.js` | Cached `document.querySelector(...)` DOM references |
| `handlers.js` | Behaviour: nav active link, mobile menu, popup show/hide, scroll effects |
| `utils.js` | Skill-bar scroll animation + top gradient scroll-progress indicator |
| `script.js` | Entry point — wires DOM event listeners to handlers |
| `images/`, `docs/` | Logos, favicon, résumé PDF |

### Behaviours to preserve (this is the real spec)

1. **Sticky navbar** — once the page scrolls past the header, `.nav-wrapper` gets
   `active`; scrolling further reveals the logo (`showLogo`).
2. **Mobile menu** — hamburger toggles `mobile-nav` on the list and `is-active`
   on the toggle.
3. **Active nav link** — clicking a link moves the `active` attribute and closes
   the mobile menu.
4. **Top gradient scroll-progress bar** — `.grad-bar` width tracks scroll %.
5. **Skill bars animate in** — when a `.progress-bar` scrolls into view it grows
   to the percentage in its label; it resets when out of view.
6. **Work popups** — clicking a work card shows its detail modal + dimming
   overlay; the `×` button (and overlay) closes it.

All of these are driven today by **toggling CSS classes** on real DOM nodes. In
React the same classes stay in the CSS, but the class toggling becomes derived
from **state** instead of imperative `classList` calls.

---

## 2. Target React architecture

Recommended stack: **Vite + React** (function components + hooks). Vite is chosen
over Create React App because CRA is deprecated, and Vite deploys cleanly to
GitHub Pages. **No Redux is needed** — the only shared state is "which work popup
is open," which is trivial local state.

### 2.1 Proposed folder structure

```
src/
  main.jsx                 # ReactDOM.createRoot -> <App/>
  App.jsx                  # Composes all sections
  index.css                # imports the 7 existing css files unchanged
  data/
    skills.js              # frontend[] + languages[]  {name, percent}
    experience.js          # companies[] {name, logo, blurb, className, whiteText}
    works.js               # works[] {title, logo, blurb, link, ...}
    contacts.js            # contacts[] {label, value, href, download?}
  hooks/
    useScrollProgress.js   # scroll % for gradient bar
    useStickyNav.js        # navbar 'active' + logo 'showLogo' booleans
    useInView.js           # IntersectionObserver wrapper for skill bars
  components/
    Navbar/
      Navbar.jsx           # logo, hamburger, nav links; owns mobile-open state
      GradientBar.jsx      # top scroll-progress bar
    Home/
      Home.jsx             # header name + "Front-end Developer" + underline
    About/
      About.jsx            # section wrapper + intro copy
      SkillsGrid.jsx       # renders two ProgressBox columns from data
      ProgressBox.jsx      # one skill row; animates via useInView
    Experience/
      Experience.jsx       # maps experience data -> ServiceCard
      ServiceCard.jsx
    Work/
      Work.jsx             # maps works data -> WorkCard; owns openWork state + Overlay
      WorkCard.jsx         # card + its popup detail
      Overlay.jsx
    Contact/
      Contact.jsx          # maps contacts data
    common/
      SectionTitle.jsx     # the "title" block (heading + tagline) reused per section
```

### 2.2 Component tree

```
<App>
 ├─ <Navbar>            (state: mobileOpen; consumes useStickyNav)
 │   └─ <GradientBar>   (consumes useScrollProgress)
 ├─ <Home>
 ├─ <About>
 │   └─ <SkillsGrid> -> many <ProgressBox> (each uses useInView)
 ├─ <Experience> -> many <ServiceCard>
 ├─ <Work>              (state: openWork)
 │   ├─ many <WorkCard>
 │   └─ <Overlay>
 └─ <Contact> -> many <ContactItem>
```

### 2.3 State & hooks — how each behaviour maps

| Vanilla today | React equivalent |
|---------------|------------------|
| `menuToggle` click toggles `mobile-nav` / `is-active` | `const [mobileOpen, setMobileOpen] = useState(false)` in `Navbar`; `mobile-nav` on the `<ul class="nav">` **and** `is-active` on the `#mobile-menu` toggle both derive from it |
| nav link sets `active` attribute **and** closes the mobile menu | `const [activeLink, setActiveLink] = useState('home')`; the click handler renders `active` conditionally **and** calls `setMobileOpen(false)` (mirrors `navLinkClickHandler`, which removes both `mobile-nav` and `is-active`) |
| `scrollEventsHandler` → `.nav-wrapper.active` + `.logo.showLogo` | `useStickyNav()` hook: `useEffect` adds a scroll listener, returns `{ sticky, showLogo }` booleans |
| `scrollIndicator()` sets `.grad-bar` width | `useScrollProgress()` hook returns a `0–100` number → inline `style={{ width: `${p}%` }}` |
| `scrollAnimation()` grows `.progress-bar` | `useInView()` (IntersectionObserver) per `ProgressBox`; when in view, set width to `percent` |
| `showWorkPopup` / `hidePopupHandler` toggle `show` | `const [openWork, setOpenWork] = useState(null)` in `Work`; a card is open when `openWork === card.id`; Overlay visible when `openWork !== null` |

**Key principle:** delete `elements.js`, `handlers.js`, `script.js`, `utils.js`.
Their logic becomes hooks/handlers *inside* components. Never call
`document.querySelector` in React — refs and state replace it. The existing CSS
files are reused **as-is**; only the class names must match what the JSX renders.

### 2.4 Data-driven rendering

The Experience and Work sections are large blocks of repeated markup. In React
they become arrays in `src/data/*` mapped to a single card component. Example
shape:

```js
// src/data/works.js
export const works = [
  {
    id: 'spark',
    title: 'Spark',
    logo: '/images/spark-logo.svg',
    link: 'https://spark.faasos.io/login',
    paragraphs: ['Spark is an inventory management tool …', '…'],
  },
  // …one object per work item
];
```

This removes ~500 lines of duplicated HTML and makes edits one-line changes.

---

## 3. Step-by-step migration plan

Do this incrementally; the site should render after every phase.

### Phase 0 — Scaffold (no behaviour yet)
1. `npm create vite@latest . -- --template react` in a fresh branch (or a
   `react/` subfolder first if you want to keep the old site live).
2. Move `images/` and `docs/` into `public/` so paths like `/images/...` and the
   résumé download keep working. Move `CNAME` into `public/` too so GitHub Pages
   keeps the custom domain.
3. Copy the 7 `css/` files into `src/css/` and `import './css/style.css'` (etc.)
   from `src/index.css` or `App.jsx`. **Don't rewrite the CSS.**
4. Confirm `npm run dev` shows a blank Vite page.

### Phase 1 — Static structure (markup only)
5. Recreate the 5 sections as components (`Home`, `About`, `Experience`, `Work`,
   `Contact`) using the **exact class names** from `index.html`. Paste markup in,
   convert `class` → `className`, `for` → `htmlFor`, and self-close tags.
6. Extract the repeated Experience/Work/Contact/Skills markup into `data/*` +
   card components (§2.4).
7. At this point the page looks identical but is fully static (no JS behaviour).

### Phase 2 — Interactions
8. **Navbar mobile menu + active link** — local `useState` in `Navbar`.
9. **Work popups** — lift `openWork` state into `Work`; pass `isOpen` +
   `onOpen`/`onClose` to `WorkCard`; render `Overlay` when something is open.
10. **Scroll hooks** — implement `useScrollProgress` and `useStickyNav`, wire the
    gradient bar and sticky navbar.
11. **Skill-bar animation** — implement `useInView` with `IntersectionObserver`
    (cleaner than the old scroll math) and drive each `ProgressBox` width.
12. Delete `elements.js`, `handlers.js`, `script.js`, `utils.js`,
    the old `index.html`, and `index.php`.

### Phase 3 — Build & deploy to GitHub Pages
13. Because the site uses a **custom domain at the root** (`sameerwatts.com`),
    keep Vite's `base: '/'` (default). A `base` prefix is only needed for
    `user.github.io/repo` project sites, which this is not.
14. Build with `npm run build` → outputs `dist/`.
15. Deploy the contents of `dist/` to the branch GitHub Pages serves. Two options:
    - **GitHub Actions** (recommended): add a workflow that runs
      `npm ci && npm run build` and publishes `dist/` via
      `actions/deploy-pages`.
    - **`gh-pages` package**: `npm i -D gh-pages`, add
      `"deploy": "gh-pages -d dist"`, and point Pages at the `gh-pages` branch.
16. Verify `CNAME` is present in the published output so the custom domain and
    HTTPS stay intact.

### Phase 4 — Polish (optional)
- Add ESLint/Prettier (Vite template includes ESLint).
- Consider CSS Modules or keeping global CSS (global is fine here — the class
  names are already namespaced by section).
- Add a `react-scroll` or `IntersectionObserver`-based scroll-spy so the active
  nav link updates automatically while scrolling.

---

## 4. Gotchas specific to this codebase

- **Paths:** current markup mixes `./images/...` and `/images/...`. In a Vite
  app served from the domain root, use root-absolute `/images/...` (assets live
  in `public/`). The résumé link `./docs/Samir Watts - Senior software
  engineer.pdf` has spaces — keep the `download` attribute and URL-encode if
  needed.
- **`navHeight = navWrapper.offsetHeight`** in `elements.js` is read once at load.
  In React, measure with a `ref` inside `useEffect`/`useLayoutEffect` instead of
  a module-level read.
- **Scroll listeners** must be registered in `useEffect` and **removed** in its
  cleanup to avoid leaks on unmount/HMR.
- **The `active` attribute** on nav `<a>` is a non-standard boolean attribute;
  render it as `active=""` conditionally, or (cleaner) switch to a CSS class.
- **Do not introduce Redux** — it is listed as a skill on the page but is not
  warranted by the app's actual state.

### Mobile view — behaviours that depend on more than class names

The plan's rule "match the exact **class names**" is not enough for mobile: the
whole responsive layout is CSS-media-query-driven (`max-width: 992px` /
`1200px` in `navbarStyle.css`), and three mobile behaviours key off an **id**,
**DOM structure**, or a **meta tag** — not classes. Preserve all of these or the
mobile view regresses even though desktop looks fine:

- **Hamburger animation depends on `id="mobile-menu"`, not a class.** The X-morph
  selectors are `#mobile-menu.is-active .bar:nth-child(n)` in `navbarStyle.css`.
  The `<Navbar>` toggle element **must** keep `id="mobile-menu"`. Drop or rename
  it and the menu still opens/closes but the three bars won't animate into an X.
- **The hamburger needs exactly three sibling `.bar` elements, in order.** The
  animation uses `.bar:nth-child(1/2/3)`. Render three `.bar` divs as direct,
  in-order children of `.menu-toggle` — do **not** map them from an array or wrap
  them, or `nth-child` breaks.
- **Preserve the viewport meta tag.** Mobile scaling depends on
  `<meta name="viewport" content="width=device-width, initial-scale=1" />` from
  the old `index.html`. Phase 2 deletes that file — make sure the Vite
  `index.html` template still carries this tag (Vite's default template includes
  one, but confirm it survived).
- **`100vh` quirk (pre-existing, preserved):** the open mobile menu uses
  `height: calc(100vh - 55px)`, which is subject to the mobile-browser-chrome
  `100vh` bug. Reusing the CSS as-is keeps the current behaviour; the migration
  is a good moment to switch to `100dvh` if you want to fix it.
- **No body-scroll-lock (pre-existing, preserved):** the page scrolls behind the
  open mobile menu today. React reuses the CSS as-is, so this is unchanged unless
  you deliberately add a scroll lock tied to `mobileOpen`.

---

## 5. Common commands (after migration)

```bash
npm install        # install deps
npm run dev        # local dev server with HMR
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
npm run deploy     # (if using gh-pages) publish dist/ to GitHub Pages
```

Until the migration lands, the site is plain static files — just open
`index.html` in a browser; there is nothing to build.
