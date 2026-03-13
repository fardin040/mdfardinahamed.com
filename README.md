# mdfardinahamed.com

Personal portfolio for Md Fardin Ahamed — built with Next.js (App Router) and Tailwind CSS. Clean, responsive, and optimized for MSc applications, cybersecurity recruiters, and technical research visibility.

Quick setup

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

This starts TinaCMS in local editing mode on top of Next.js, so `/admin` can edit content collections.

If you want the site without Tina's local CMS tooling, run:

```bash
npm run dev:next
```

3. Build for production

```bash
npm run build
npm start
```

Available scripts

- `dev`: Runs TinaCMS local mode with Next.js so `/admin` can edit content.
- `dev:next`: Runs plain Next.js development mode without Tina.
- `build`: Tries `tinacms build` first when Tina Cloud credentials are present, then always builds Next.js. If Tina Cloud schema indexing is behind, the site still deploys and `/admin` falls back until Tina catches up.
- `cms:build`: Generates the Tina admin app and production Tina client files.
- `start`: Runs the production server after build.
- `lint`: (if configured) Runs linting.

Project notes

- Replace the placeholder resume at `public/resume.pdf` with your final PDF.
- Update contact info (email, LinkedIn, GitHub) in `app/page.tsx` and/or `components/ContactForm.tsx`.
- Blog posts live in `content/blog/*.md`.
- Technical writeups live in `content/writeups/*.md`.
- Both collections support frontmatter fields such as `title`, `date`, `description`, `category`, and `tags`.
- Markdown content is rendered server-side through `lib/markdown.ts`.
- TinaCMS can edit `content/page/home.json`, blog posts, and writeups from `/admin`.

Contact form

- The contact form posts to the internal API route at `/api/contact`.
- Set `FORMSPREE_ENDPOINT` if you want the serverless route to forward submissions to Formspree. If it is not set, the payload is logged on the server for testing.

Theme and styling

- Light/dark mode is supported via the theme toggle (`components/ThemeToggle.tsx`) and uses the `class`-based dark mode in Tailwind.
- Tailwind configuration is in `tailwind.config.js`.

SEO & metadata

- Global metadata is defined in `app/layout.tsx`.
- Open Graph preview uses `public/og-preview.svg`.

Deployment (Vercel + Tina)

1. Push the repository to GitHub.
2. Import the repo into Vercel (https://vercel.com/new). Vercel auto-detects Next.js App Router projects.
3. Set environment variables under Project Settings before deploying.

Important environment variables

- `NEXT_PUBLIC_TINA_CLIENT_ID` — Required for Tina editing on Vercel.
- `TINA_TOKEN` — Required for Tina content API access during the Vercel build and runtime.
- `NEXT_PUBLIC_TINA_BRANCH` — Optional if you want to pin the Tina branch explicitly. If unset, preview builds fall back to `main` so Tina Cloud does not reject temporary preview branch names.
- `FORMSPREE_ENDPOINT` — (optional) The Formspree endpoint URL (e.g. `https://formspree.io/f/your-id`). When set, contact form submissions will be forwarded to this endpoint from the serverless function. If not set, submissions will be logged in the server logs for testing.

4. Deploy — Vercel will run `npm run build` automatically.

CMS notes

1. For local editing, use `npm run dev` and open `/admin`.
2. For production Tina editing on Vercel, make sure `NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` are set.
3. The production build tries Tina generation automatically when the Tina env vars are present. If Tina Cloud has not indexed the latest schema yet, the site still deploys, disables Tina runtime bindings for that build, and `/admin` falls back to the placeholder page until indexing catches up.

Notes for reviewers / maintainers

- Replace placeholder `public/resume.pdf` before sharing with recruiters or MSc programs.
- Update any placeholder project repository URLs in `data/projects.ts` if your final GitHub repo names differ.
- Consider adding automated linting and GitHub Actions for CI.

If you want, I can:

- Install dependencies and start the dev server locally.
- Replace the placeholder `public/resume.pdf` with the final resume PDF.
- Add more polished copy for the About/Resume/Projects sections.
