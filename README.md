# personal-webpage-2

Personal portfolio website for William Norland, built with Astro, React, and TypeScript.
Configured for static site generation and automated deployment to GitHub Pages.

## Tech Stack

- **Framework:** Astro 7 (Static site generation)
- **UI & Islands:** React 19, React Icons
- **Language:** TypeScript 7 (Strict mode)
- **API Integration:** Octokit 5 (GitHub REST & GraphQL API)
- **Styling:** CSS Modules, Modern CSS variables
- **Hosting:** GitHub Pages via GitHub Actions

## Features

- **About:** Personal introduction, background summary, and skill competencies.
- **Projects:** Repository listing with real-time search and school vs. personal filtering.
- **Contributions:** Public contributions on external repositories with PR count and lines.
- **Curriculum Vitae:** Direct release download from `willayy/curriculum-vitae` with fallback.
- **Education & Career:** Chronological education history and employment experience.
- **Contact:** Contact email and communication links.
- **Localization:** Type-safe JSON localization dictionary architecture (`en`, `sv`).

## Getting Started

### Development

Run the local development server:

```shell
npm run dev
```

### Build

Build the static site output to the `./dist` directory:

```shell
npm run build
```

### Preview

Preview the production build locally:

```shell
npm run preview
```

## Deployment

The website is deployed to GitHub Pages via GitHub Actions.
The deployment workflow triggers automatically:
- On pushes to the `main` branch.
- On a daily schedule (03:00 UTC) to refresh GitHub project and contribution stats.
- Manually via workflow dispatch.
