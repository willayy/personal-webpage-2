# Copilot Instructions for personal-webpage-2

## Project Overview

This is a personal portfolio website built with Astro, TypeScript, and React. The site is
deployed as static pages on GitHub Pages and showcases projects, contributions, curriculum vitae,
education, career experience, and contact details.

**Key Technologies:**
- Astro 7 with static output
- TypeScript (strict mode enabled)
- React 19 (for interactive client islands)
- CSS Modules and CSS variables for styling
- Octokit 5 for GitHub REST & GraphQL API data fetching
- GitHub Pages for hosting

## Project Structure

```
src/
├── pages/         # Astro route pages (index, projects, contributions, cv, etc.)
├── layouts/       # Shared Astro page layouts (Layout.astro)
├── components/    # Astro components and React islands (ProjectsFilter, etc.)
├── locales/       # Localization JSON dictionaries (en.json, sv.json)
├── data/          # Structured JSON data (education, employments, skills)
├── api/           # API utilities (GitHub API fetching)
├── utils/         # Helper functions (localization, date formatting)
└── styles/        # Global CSS stylesheets
```

## Coding Standards

### TypeScript

- Strict mode is enabled. Follow all type safety rules.
- Use explicit types for function parameters and return values.
- Avoid `any` types. Use proper TypeScript types or `unknown`.
- Use type imports with `import type` when importing types.
- Path aliases: Use `@/*` for imports from `src/` directory.

### Astro & React Components

- Use Astro components (`.astro`) for static content and page layouts.
- Use React components (`.tsx`) exclusively for interactive islands (`client:load`).
- Follow MVVM architecture for React components:
  - Model: Domain data and API structures.
  - View-Model: UI state and filtering logic declared as a custom hook in the same file.
  - View: Visual rendering only, receiving the View-Model via dependency injection.
- Do not use default function arguments.
- Avoid nested function calls; store call return values in variables before passing.
- Limit nesting depth to 1 level from the root of a function, file, or class.
- All user-facing strings must use localization dictionaries via `translateByKey`.

### Styling

- Use CSS Modules (`*.module.css`) for component-specific styles.
- Use global CSS variables defined in `src/styles/globals.css` for themes, fonts, and colors.
- Ensure all layouts are mobile responsive with media queries.

### Formatting & Commit Conventions

- Enforce line limits: No line of code or text may exceed 100 characters.
- Follow conventional commits format: `<type>(scope): <description>`.
- Exactly one commit per individual software object change.
- Imperative verbs for commit description: add, allow, enforce, extract, move, prevent,
  remove, rename, swap, update.
