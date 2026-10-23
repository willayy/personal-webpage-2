# personal-webpage-2
Small personal webpage built using the Next.js framework, configured to use app-router and TypeScript.
This web app is configure to be deployed as static pages on github pages.

**Note:** This website is semi vibe-coded using GitHub Copilot.

### Usage
To run in development mode use
```shell
npm run dev
```
For deployment just push to the main branch and the github action will take care of the rest.

### Enviroment variables
To run the web app you need to supply an
`.env.*` file with the variables. Optionally you can
supply one for `production`and another one for `development`.

```
NEXT_PUBLIC_GITHUB_IMAGE_URL
NEXT_PUBLIC_LINKEDIN_IMAGE_URL
GITHUB_USER_LINK
GITHUB_USERNAME
PUBLIC_SITE_URL
HOME_PAGE
```

### Deployment
The web app is deployed using GitHub Pages. The deployment is using GitHub Actions to build the web app and push the build to pages. 

The site automatically rebuilds and redeploys:
- When changes are pushed to the `main` branch
- Daily at 3 AM UTC (to pick up new projects from GitHub automatically)
- Manually via the Actions tab (workflow_dispatch)

# Next.js boilerplate documentation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
