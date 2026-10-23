# Copilot Instructions for personal-webpage-2

## Project Overview

This is a personal portfolio website built with Next.js 16, TypeScript, and React. The site is deployed as static pages on GitHub Pages and showcases projects, education, career information, and contact details.

**Key Technologies:**
- Next.js 16 with App Router
- TypeScript (strict mode enabled)
- React 18
- CSS Modules for styling
- Octokit for GitHub API integration
- GitHub Pages for deployment

## Project Structure

```
src/
├── app/               # Next.js app router pages
│   ├── page.tsx      # Home/About page
│   ├── projects/     # Projects page
│   ├── education/    # Education page
│   ├── mycareer/     # Career page
│   ├── contact/      # Contact page
│   └── layout.tsx    # Root layout
├── components/       # Reusable React components
├── api/             # API utilities (GitHub API)
└── utils/           # Helper functions and types
```

## Coding Standards

### TypeScript

- **Strict mode is enabled** - all type safety rules must be followed
- Use explicit types for function parameters and return values
- Avoid `any` types - use proper TypeScript types or `unknown`
- Use type imports with `import type` when importing only types
- Path aliases: Use `@/*` for imports from `src/` directory (e.g., `@/components`, `@/utils`)

### React Components

- **Use functional components** with hooks - no class components
- **Server Components by default** - Next.js App Router defaults to Server Components
  - Only use `'use client'` directive when component needs client-side interactivity (state, effects, event handlers)
  - Server Components can be async and fetch data directly
- Export components as default exports for page components
- Component file structure: `ComponentName.tsx` with optional `ComponentName.module.css`

### Styling

- **Use CSS Modules** for component-specific styles (`.module.css` files)
- Import styles as: `import styles from './ComponentName.module.css'`
- Global styles in `src/app/globals.css`
- Use Roboto font classes: `roboto-thin`, `roboto-light`, `roboto-regular`, `roboto-medium`, `roboto-bold`
- Combine className using template literals: `className={styles.className + " roboto-regular"}`

### Code Formatting

- Use consistent spacing and indentation
- Follow existing patterns in the codebase
- Comments are minimal - use them for complex logic or configuration
- Prefer descriptive variable names over comments

## Environment Variables

Required environment variables (defined in `.env.development` and `.env.production`):

```
NEXT_PUBLIC_GITHUB_IMAGE_URL     # URL for GitHub icon
NEXT_PUBLIC_LINKEDIN_IMAGE_URL   # URL for LinkedIn icon
GITHUB_USER_LINK                 # GitHub profile link
GITHUB_USERNAME                  # GitHub username
PUBLIC_SITE_URL                  # Public URL of the site
HOME_PAGE                        # Homepage URL
ACCESS_TOKEN_GH                  # GitHub API token (build time only)
```

- Prefix with `NEXT_PUBLIC_` for client-side accessible variables
- `ACCESS_TOKEN_GH` is injected during CI/CD build process

## Build and Development

### Development

```bash
npm run dev          # Start development server at localhost:3000
npm run lint         # Run ESLint
npm run build        # Build for production
```

### Configuration

- **next.config.ts**: Configured for static export with GitHub Pages
  - `output: "export"` - generates static HTML
  - `basePath` and `assetPrefix` configured for production
  - Images are unoptimized for static export
- **ESLint**: Uses `next/core-web-vitals` and `next/typescript` configs

### Deployment

- Automatic deployment to GitHub Pages via `.github/workflows/nextjs.yml`
- Triggers: Push to `main`, manual dispatch, or daily at 3 AM UTC
- Build output in `./out` directory
- GitHub token injected as `ACCESS_TOKEN_GH` during build

## API Integration

- **GitHub API**: Uses Octokit to fetch repository data
- Located in `src/api/github-api.ts`
- Fetches user repositories for the Projects page
- Uses GitHub API v3 with version header `'X-GitHub-Api-Version': '2022-11-28'`

## Common Patterns

### Fetching Data in Server Components

```tsx
export default async function Page() {
  const data = await fetchAndParse(baseUrl + '/data/file.json')
  return <div>{/* render data */}</div>
}
```

### Using CSS Modules with Global Classes

```tsx
import styles from './Component.module.css'

export default function Component() {
  return (
    <div className={styles.container + " roboto-regular"}>
      Content
    </div>
  )
}
```

### Type Definitions

- Define types in `src/utils/types.ts` or co-located with components
- Export types for reuse across components

## Testing

- No automated test suite is currently configured
- Manual testing via `npm run dev`
- Verify builds complete successfully with `npm run build`

## Best Practices for AI Assistance

1. **Maintain existing patterns**: Follow the established code structure and naming conventions
2. **Preserve type safety**: Don't weaken TypeScript's strict mode guarantees
3. **Respect Server/Client boundary**: Keep Server Components server-side unless interactivity is needed
4. **CSS Modules over inline styles**: Use CSS Modules for all styling
5. **Environment variables**: Never hardcode URLs or tokens - use environment variables
6. **Static export compatibility**: Ensure all code works with Next.js static export (`output: "export"`)
7. **GitHub Pages deployment**: Remember the site uses a base path in production
8. **Minimal dependencies**: Only add dependencies when absolutely necessary
9. **Accessibility**: Maintain semantic HTML and accessibility attributes

## Known Quirks

- Base path configuration differs between dev and production
- Site automatically rebuilds daily to update with new GitHub projects
- The website is "semi vibe-coded" - meaning it was built with significant Copilot assistance

## Git Workflow

- Main branch: `main`
- CI/CD automatically deploys on push to main
- Keep commits focused and descriptive
