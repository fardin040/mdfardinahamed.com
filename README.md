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

3. Build for production

```bash
npm run build
npm start
```

Available scripts

- `dev`: Runs Next.js in development mode.
- `build`: Builds production assets.
- `start`: Runs the production server after build.
- `lint`: (if configured) Runs linting.

Project notes

- Replace the placeholder resume at `public/resume.pdf` with your final PDF.
- Update contact info (email, LinkedIn, GitHub) in `app/page.tsx` and/or `components/ContactForm.tsx`.
- Blog posts live in `content/blog/*.md`.
- Technical writeups live in `content/writeups/*.md`.
- Both collections support frontmatter fields such as `title`, `date`, `description`, `category`, and `tags`.
- Markdown content is rendered server-side through `lib/markdown.ts`.

Contact form

- The contact form posts to the internal API route at `/api/contact`.
- Set `FORMSPREE_ENDPOINT` if you want the serverless route to forward submissions to Formspree. If it is not set, the payload is logged on the server for testing.

Theme and styling

- Light/dark mode is supported via the theme toggle (`components/ThemeToggle.tsx`) and uses the `class`-based dark mode in Tailwind.
- Tailwind configuration is in `tailwind.config.js`.

SEO & metadata

- Global metadata is defined in `app/layout.tsx`.
- Open Graph preview uses `public/og-preview.svg`.

Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the repo into Vercel (<https://vercel.com/new>). Vercel auto-detects Next.js App Router projects.
3. Set environment variables under Project Settings if you use third-party services.

Important environment variables

- `FORMSPREE_ENDPOINT` — (optional) The Formspree endpoint URL (e.g. `https://formspree.io/f/your-id`). When set, contact form submissions will be forwarded to this endpoint from the serverless function. If not set, submissions will be logged in the server logs for testing.

4. Deploy — Vercel will run `npm run build` automatically.

Notes for reviewers / maintainers

- Replace placeholder `public/resume.pdf` before sharing with recruiters or MSc programs.
- Update any placeholder project repository URLs in `data/projects.ts` if your final GitHub repo names differ.
- Consider adding automated linting and GitHub Actions for CI.

If you want, I can:

- Install dependencies and start the dev server locally.
- Replace the placeholder `public/resume.pdf` with the final resume PDF.
- Add more polished copy for the About/Resume/Projects sections.
