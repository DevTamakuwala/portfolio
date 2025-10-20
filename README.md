# Dev Tamakuwala — Portfolio

This repository contains a personal portfolio website built with React and Tailwind CSS. It showcases projects, skills, journey (education/work), and contact information. The site is designed to be responsive and easy to update.

## What this project contains

- `public/` — static files, icons, and the app HTML. Put assets like `avatar.png` or `Dev_Tamakuwala.pdf` here.
- `src/` — the React application source
	- `components/` — reusable UI components (About, Projects, Skills, Sidebar, Section, etc.)
	- `data/portfolioData.js` — the main content file: edit your name, bio, projects, skills, links, etc.
	- `config/` — particle/background configs and other environment configs
	- `hooks/` — small custom hooks used by components
	- `App.jsx` — main application layout
	- `index.js` — app entry

## Quick start (development)

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm start
```

Open http://localhost:3000 in your browser. The dev server supports hot reloading.

## Editing content

Most site content is driven by `src/data/portfolioData.js`:
- Update `user` for name, titles, bio, social links and `avatar` path.
- Update `projectsData` for project list, tags, links, and flags (demo/playstore).
- Update `skillsData` and `journeyData` for skills and education/work entries.

UI layout and styles are in `src/components/`. Use Tailwind classes to tweak spacing and colors.

## Responsive behavior

The site is responsive using Tailwind breakpoints. The `Sidebar` is hidden on small screens; main content becomes full-width and sections collapse into a single column on mobile.

If you want a mobile navigation (hamburger) instead of the hidden sidebar, I can add it.

## Building for production

```powershell
npm run build
```

The production build will be output to the `build/` folder.

## Deployment

You can deploy the `build/` folder to any static hosting provider (GitHub Pages, Netlify, Vercel, Azure Static Web Apps, etc.). If you'd like, I can prepare a deployment guide for your preferred host.

## Contributing / Tips

- Keep personal data in `src/data/portfolioData.js`. Avoid committing secrets.
- Use `public/` for images and binary assets (PDFs, favicons).
- If you change Tailwind config, re-run the dev server.

## Need changes?

Tell me what text, image, or layout you'd like changed and I can apply it and preview it locally. If you'd like a polished README section for hosting or SEO metadata, I can add that too.
### `npm run build` fails to minify
