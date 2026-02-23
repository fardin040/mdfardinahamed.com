```markdown
# mdfardinahamed.com

Personal portfolio for Md Fardin Ahamed — built with Next.js (App Router) and Tailwind CSS. Clean, responsive, and optimized for MSc applications and cybersecurity recruiters.

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
- Blog posts live in `content/blog/*.md` — add new Markdown files with frontmatter (title, date, description).
- The blog uses server-side Markdown rendering via `lib/markdown.ts`.

Contact form

- The shipped `components/ContactForm.tsx` is configured to post to Formspree (placeholder). Replace the `action` URL with your Formspree endpoint or wire a serverless function.

Theme and styling

- Light/dark mode is supported via the theme toggle (`components/ThemeToggle.tsx`) and uses the `class`-based dark mode in Tailwind.
- Tailwind configuration is in `tailwind.config.js`.

SEO & metadata

- Global `app/head.tsx` contains default meta tags and Open Graph placeholders — update these as needed for applications.

Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the repo into Vercel (https://vercel.com/new). Vercel auto-detects Next.js App Router projects.
3. Set environment variables under Project Settings if you use third-party services.
   
	Important environment variables
   
	- `FORMSPREE_ENDPOINT` — (optional) The Formspree endpoint URL (e.g. `https://formspree.io/f/your-id`). When set, contact form submissions will be forwarded to this endpoint from the serverless function. If not set, submissions will be logged in the server logs for testing.

4. Deploy — Vercel will run `npm run build` automatically.

Notes for reviewers / maintainers

- Replace placeholder `public/resume.pdf` before sharing with recruiters or MSc programs.
- Replace `fardin@example.com` in `app/page.tsx` with the professional email.
- Consider adding automated linting and GitHub Actions for CI.

If you want, I can:

- Install dependencies and start the dev server locally.
- Replace the contact form with a serverless API route.
- Add more polished copy for the About/Resume/Projects sections.

```
