# sameerwatts.github.io

Personal portfolio site for Sameer (Samir) Watts, live at
**[sameerwatts.com](https://sameerwatts.com)**.

A single-page site — Home, About, Experience, Work, Contact — built with React
and Vite.

## Stack

- [React](https://react.dev/) 19
- [Vite](https://vitejs.dev/) 8

## Getting started

Requires Node 22+.

```bash
npm install       # install dependencies
npm run dev       # start the dev server with hot reload
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Project structure

```
public/           # static assets copied as-is (images, résumé PDF, CNAME)
src/
  components/     # one folder per section (Home, About, Experience, Work, Contact, Navbar)
  data/           # content as plain arrays (skills, experience, works, contacts)
  hooks/          # scroll progress, sticky navbar, in-view animation
  css/            # the site's stylesheets, imported from src/index.css
```

Adding or editing content (a new job, a new project, a skill) is a one-line
change in the relevant `src/data/*.js` file — no markup to touch.

## Deployment

Every push to `master` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it to GitHub Pages. The custom domain is configured via
`public/CNAME`.

Every pull request into `master` runs `.github/workflows/ci.yml`, which builds
the site to catch breakage before merge.
