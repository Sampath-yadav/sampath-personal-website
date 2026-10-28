# Sampath Yadav Gundaram: Portfolio

A personal portfolio built with the **T3 Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS 4 and tRPC 11, with Framer Motion for animation, Lucide icons, and React Hook Form + Zod for the contact form. There is no database and no authentication, because a portfolio doesn't need either.

## Prerequisites

- **Node.js 20 or newer** (22 recommended). Download the LTS installer from <https://nodejs.org>.
- npm (installed with Node).

Check on Windows (PowerShell or Command Prompt):

```powershell
node -v
npm -v
```

## Run it locally on Windows

1. Extract the ZIP, for example to `C:\Projects\sampath-portfolio`.
2. Open a terminal in that folder (in File Explorer: click the address bar, type `cmd`, press Enter).
3. Install dependencies:
   ```powershell
   npm install
   ```
4. (Optional) create your environment file. The site runs fine without it:
   ```powershell
   copy .env.example .env
   ```
5. Start the dev server:
   ```powershell
   npm run dev
   ```
6. Open <http://localhost:3000>.

## Scripts

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Development server with hot reload              |
| `npm run build`     | Production build                                |
| `npm run start`     | Serve the production build (run `build` first)  |
| `npm run preview`   | Build, then serve                               |
| `npm run check`     | ESLint and the TypeScript compiler              |
| `npm run typecheck` | TypeScript only                                 |
| `npm run format:write` | Format code with Prettier                    |

## Edit your content

All content lives in `src/data/`, so you rarely touch components.

| File                     | What's in it                                                |
| ------------------------ | ----------------------------------------------------------- |
| `src/data/site.ts`       | Name, role, email, status line, About text, social URLs     |
| `src/data/projects.ts`   | Projects, tags, highlights, tech stacks                     |
| `src/data/skills.ts`     | Skill groups                                                |
| `src/data/experience.ts` | Internship, education, certifications                       |

### Do these first

1. **Add your profile links.** Your resume only links to the generic linkedin.com and github.com home pages, so nothing was invented. In `src/data/site.ts` set `linkedin` and `github` to your real URLs. Links left empty stay hidden.
2. **Add real project screenshots (optional).** The project covers are illustrations. Put a screenshot in `public/images/projects/` and set `image: "/images/projects/your-file.webp"` on the project. You can also add `github` and `live` URLs per project, which adds buttons to its page.
3. **Update your resume.** Replace `public/Sampath_Yadav_Resume.pdf` with a newer file of the same name.
4. **Check the status wording.** "Open to new roles" appears in the header, hero and contact section. It is set in `src/data/site.ts` (`status`).
5. **Use a sharper photo if you have one.** Replace `public/images/portrait.webp` and `avatar.webp`. The current cut-out was made from a 400×400 photo. Transparent PNG/WebP, shoulders cropped at the bottom, works best.

## Contact form

The form posts to a tRPC procedure (`src/server/api/routers/contact.ts`) that sends mail through [Resend](https://resend.com). Without configuration the form tells visitors it isn't connected yet and offers a `mailto:` link, so it never fails silently.

To enable it, set these in `.env` (and in your hosting dashboard):

```
RESEND_API_KEY="re_..."
CONTACT_TO_EMAIL="you@example.com"
CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
```

`onboarding@resend.dev` works for testing. For production, verify your own domain in Resend and use an address on it. The form includes a honeypot field and a small in-memory rate limit (per server instance, so treat it as a speed bump).

Never commit `.env`. It is already in `.gitignore`.

## Deploy to Vercel

1. Push the project to a GitHub repository (do not commit `.env`).
2. Go to <https://vercel.com/new>, import the repository. Vercel detects Next.js automatically.
3. Under **Environment Variables** add:
   - `NEXT_PUBLIC_SITE_URL`: your final URL, e.g. `https://sampath.vercel.app` (used for Open Graph, sitemap and canonical links).
   - The three contact variables above, if you want the form to send mail.
4. Click **Deploy**. Every push to `main` redeploys.

Netlify and other Node hosts work too: build command `npm run build`, output handled by the Next.js adapter/runtime.

## Project structure

```
public/                 Static files: resume, images, OG image
src/
  app/                  Routes: home, /work/[slug], 404, error, sitemap, robots
  components/           Sections and UI pieces (hero, work, skills, ...)
  data/                 All editable content
  fonts/                Self-hosted Manrope (no Google Fonts request)
  hooks/                Small client hooks
  lib/                  Shared helpers and the contact Zod schema
  server/api/           tRPC router (contact form)
  styles/globals.css    Design tokens and shared component classes
  trpc/                 tRPC client/server setup (from create-t3-app)
```

## Design notes

Layout and interaction patterns follow the supplied reference: framed panels over a sky backdrop, an outlined-and-solid name, an accordion list, a dark experience panel with a cursor-following preview, and per-project pages. All code, illustrations, the cloud backdrop and the OG image are original; nothing from the reference site's assets is used. Typography is Manrope (SIL Open Font License). Motion respects `prefers-reduced-motion`.

## Accessibility and performance

Semantic landmarks, a skip link, visible focus rings, labelled form fields with error messages, and keyboard-operable accordion and filters. Pages are statically generated, fonts are self-hosted, and the hero portrait is preloaded.
