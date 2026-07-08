# Divya Photo Studio — Full Website + Booking System + Admin Panel

A premium, Pinterest-inspired photography portfolio and booking website for
**Divya Photo Studio** (Sharad Gulabrao Deore), Dhule, Maharashtra.

This project is a **monorepo** with two apps:

```
divya-photo-studio/
├── frontend/   → Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion
└── backend/    → Express + Prisma + SQLite/PostgreSQL + JWT auth
```

---

## 1. What's included

- Cinematic homepage: hero slideshow, animated stats, about, services, Pinterest
  masonry gallery with filters + lightbox, pricing packages, live booking form,
  testimonials, why-choose-us, process timeline, Instagram grid, FAQ, contact, footer
- Booking system with **real-time date availability checking**, a "Booking Not
  Available" popup, and suggested alternative dates
- Admin panel (`/admin`) — login, view/approve/reject bookings, manage booked
  dates, export bookings to CSV
- Dark/light mode, floating WhatsApp/Call/Directions/Book buttons, scroll
  progress bar, back-to-top button, page loader, image lightbox
- SEO metadata targeting Dhule-area photography searches

---

## 2. Prerequisites

- [Node.js](https://nodejs.org) v18.18 or newer (v20 recommended)
- npm (comes with Node)
- Optional for production: a PostgreSQL database (e.g. from Railway, Neon, or Supabase)

---

## 3. Backend setup (`/backend`)

```bash
cd backend
npm install
cp .env.example .env
```

### Get a PostgreSQL database

This project uses PostgreSQL. The easiest free option that also works for
local development:

1. Go to [neon.tech](https://neon.tech) (or use a free Render Postgres
   instance — see section 7) and create a free database.
2. Copy its connection string.
3. Paste it into `backend/.env` as `DATABASE_URL`.

You don't need Postgres installed on your computer — the free hosted
database works from your laptop too.

Also set in `.env`:

```
JWT_SECRET="a-long-random-string"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="choose-a-strong-password"
```

### Run migrations & create the database tables

```bash
npm run prisma:deploy
```

This applies the included migration and creates all tables in your Postgres database.

### Create the admin login

```bash
npm run seed
```

This creates the admin account using `ADMIN_USERNAME` / `ADMIN_PASSWORD` from
your `.env`. Re-run this any time you change the password in `.env`.

### Start the backend (development)

```bash
npm run dev
```

The API runs at `http://localhost:4000`. Visit `http://localhost:4000/api/health`
to confirm it's running.

### Email notifications (optional)

To receive an email every time someone submits a booking inquiry, and to send
the customer a confirmation email:

1. In your Gmail account, create an **App Password** (Google Account →
   Security → 2-Step Verification → App passwords).
2. In `backend/.env`, set:
   ```
   SMTP_USER="divyahdphotostudio@gmail.com"
   SMTP_PASS="the-16-character-app-password"
   NOTIFY_EMAIL="divyahdphotostudio@gmail.com"
   ```
3. Restart the backend. If `SMTP_PASS` is left blank, bookings still save
   normally and appear in the admin dashboard — emails are simply skipped.

### Production build

```bash
npm run build
npm start
```

---

## 4. Frontend setup (`/frontend`)

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

Open `.env.local` and point it at your backend:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Run the frontend (development)

```bash
npm run dev
```

Visit `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

---

## 5. Admin login

1. Make sure the backend is running and you've run `npm run seed` (see step 3).
2. Go to `http://localhost:3000/admin`.
3. Sign in with the username/password you set in `backend/.env`
   (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
4. From the dashboard you can:
   - View, approve, or reject booking inquiries
   - Mark dates as booked or remove them (approving a booking auto-marks its date)
   - Export all bookings to a CSV file

> ⚠️ Change `ADMIN_PASSWORD` and `JWT_SECRET` to strong, unique values before
> deploying live. Never commit your real `.env` file to version control.

---

## 6. Where to add your own content (no code changes needed)

| What you want to change | Exact file / folder |
|---|---|
| **Studio logo** | `frontend/public/brand/` — see the "Logo files" note right after this table before replacing anything. |
| **Portfolio / gallery photos** | Drop image files into `frontend/public/gallery/<category>/` (folders already exist for wedding, pre-wedding, birthday, baby, maternity, events, passport, printing, video, drone, albums). Then add an entry pointing to the new file in `frontend/src/data/gallery.ts`. |
| **Hero slideshow background photos** | Replace the 4 files in `frontend/public/hero/slide-1.jpg` … `slide-4.jpg` with your own wedding photos (keep the same filenames, or update `frontend/src/components/Hero.tsx`). |
| **Owner photo (About section)** | Replace `frontend/public/owner/sharad-deore.jpg`. |
| **Packages / Price List** | Edit `frontend/src/data/packages.ts` — add, remove, or edit any package's name, price, and feature list. Set `highlighted: true` on the one package you want marked "Most Popular". |
| **Services list** | Edit `frontend/src/data/services.ts`. |
| **Testimonials** | Edit `frontend/src/data/testimonials.ts`. |
| **FAQ** | Edit `frontend/src/data/faq.ts`. |
| **Google Map embed** | Open `frontend/src/components/Contact.tsx` and replace the placeholder `<div>` with a Google Maps `<iframe>` embed once you have your map link. |
| **Studio contact details, address, socials** | Search for the studio's phone/email/address in `frontend/src/components/Contact.tsx`, `Footer.tsx`, and `FloatingButtons.tsx` — update as needed. |
| **Colors, fonts** | `frontend/tailwind.config.ts` (colors: `gold`, `charcoal`, `warmwhite`, `beige`) and `frontend/src/app/layout.tsx` (fonts: Playfair Display, Poppins). |

None of the above requires touching any component logic — they're all plain
data files or image folders by design.

### Logo files

Your logo is already wired into the site (navbar, footer, page loader, admin
login, and browser tab icon). It lives in `frontend/public/brand/` as five
pre-processed variants — regenerate them the same way if you ever get a new
logo file:

| File | Used where | Notes |
|---|---|---|
| `logo-mark.png` | Navbar (transparent, over dark hero) · footer | Camera icon only, white + gold on transparent background |
| `logo-mark-dark.png` | Navbar (solid, light background, after scrolling) | Same icon with the white parts recoloured to charcoal so it stays visible on a light navbar |
| `logo-transparent.png` | Page loader · admin login | Full logo incl. "DIVYA / PHOTO STUDIO" text, transparent background, for dark sections |
| `logo-full-dark.png` | Available for any future light-background full-logo placement | Same as above with text recoloured to charcoal |
| `logo-full.png` | Source/reference only | Original logo on its black background |

The browser tab icon (`frontend/src/app/favicon.ico` and `icon.png`) was
generated from `logo-mark.png` — replace those two files directly if you
want a different tab icon later.

---

## 7. Deploy to Render (step-by-step)

This project includes a `render.yaml` Blueprint at the project root — Render
reads it and creates the backend, frontend, and database automatically.

### Step 1 — Push to GitHub

Create a new GitHub repository and push this whole `divya-photo-studio`
folder to it (root of the repo should contain `render.yaml`, `frontend/`,
and `backend/`).

### Step 2 — Create the Blueprint on Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**.
2. Connect the GitHub repository you just created.
3. Render detects `render.yaml` and shows three resources it's about to
   create: `divya-photo-studio-backend`, `divya-photo-studio-frontend`, and
   `divya-photo-studio-db`. Click **Apply**.
4. You'll be prompted for a few secret values before it deploys — enter:
   - `JWT_SECRET` — any long random string
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login
   - `SMTP_PASS` — your Gmail App Password (optional — leave blank to skip email notifications)
   - `FRONTEND_URL` and `NEXT_PUBLIC_API_URL` — leave blank for now, see Step 3

Render will build and deploy both services. The database connects itself
automatically (no manual setup needed).

### Step 3 — Connect the two services to each other

The frontend and backend don't know each other's address until after the
first deploy assigns them URLs. Once both show "Live" in the Render dashboard:

1. Open the **backend** service → copy its URL, e.g.
   `https://divya-photo-studio-backend.onrender.com`
2. Open the **frontend** service → **Environment** tab → set
   `NEXT_PUBLIC_API_URL` to that URL + `/api`, e.g.
   `https://divya-photo-studio-backend.onrender.com/api` → Save (this
   triggers a redeploy of the frontend).
3. Open the **frontend** service → copy its URL, e.g.
   `https://divya-photo-studio-frontend.onrender.com`
4. Open the **backend** service → **Environment** tab → set `FRONTEND_URL`
   to that URL → Save (this triggers a redeploy of the backend, and updates
   CORS to allow the live frontend to call the API).

### Step 4 — Create your admin login on the live database

1. Open the **backend** service on Render → **Shell** tab.
2. Run:
   ```bash
   npm run seed
   ```
3. Visit `https://<your-frontend-url>/admin` and log in with the
   `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in Step 2.

### Notes on Render's free tier

- Free web services "spin down" after inactivity and take ~30–50 seconds to
  wake up on the next visit — normal for the free tier, not a bug.
- Free Postgres databases on Render expire after 90 days unless upgraded —
  keep this in mind for a production launch.
- To use a custom domain (e.g. `www.divyaphotostudio.com`), add it under the
  frontend service's **Settings → Custom Domains** tab and follow Render's
  DNS instructions.

### Redeploying after content changes

Any time you edit `frontend/src/data/*.ts` or add photos to
`frontend/public/gallery/`, commit and push to GitHub — Render redeploys
the frontend automatically.

---

## 8. Alternative: Vercel + Render split deployment

If you'd rather host the frontend on Vercel (also excellent for Next.js) and
only the backend on Render:

- **Frontend** → deploy `frontend/` to [Vercel](https://vercel.com), set
  `NEXT_PUBLIC_API_URL` in Vercel's project environment variables to your
  Render backend URL + `/api`.
- **Backend** → deploy `backend/` to Render following Steps 2–4 above (skip
  the frontend resource in `render.yaml`, or just ignore it), and set
  `FRONTEND_URL` to your Vercel domain.

---

## 9. Project structure reference

```
divya-photo-studio/
  render.yaml                  → Render Blueprint — deploys backend + frontend + database together

frontend/
  src/
    app/
      page.tsx                → homepage (assembles all sections)
      layout.tsx               → fonts, global SEO metadata
      favicon.ico, icon.png    → browser tab icon (generated from the logo)
      admin/page.tsx           → admin login
      admin/dashboard/page.tsx → admin dashboard
      globals.css              → glassmorphism, gold underline, cursor glow, etc.
    components/                → one file per section (Hero, Gallery, Packages, etc.)
    data/                      → EDIT THESE for content: packages.ts, services.ts,
                                  testimonials.ts, gallery.ts, faq.ts
    lib/api.ts                 → all calls to the backend API
  public/
    brand/                      → logo files, see "Logo files" above
    gallery/<category>/        → ADD PHOTOS HERE
    hero/                      → hero collage images
    owner/                     → owner photo

backend/
  prisma/schema.prisma         → database models (Booking, BookedDate, Admin, etc.)
  prisma/migrations/           → SQL migration(s) applied on deploy — do not edit by hand
  prisma/seed.ts                → creates the admin login
  src/
    index.ts                    → Express app entrypoint
    routes/                     → auth, bookings, booked-dates, testimonials, gallery
    middleware/auth.ts          → JWT authentication guard
    lib/prisma.ts, lib/email.ts → database client, email notifications
```

---

## 10. Notes

- The gallery, hero, and owner images shipped in this project are **placeholders**
  generated for layout purposes — replace them with real photography before going live.
- Instagram feed currently shows gallery placeholders with a "Follow on Instagram"
  link; wiring up the live Instagram Graph API is a natural next step once you have
  a Meta developer account, and can be added to `backend/src/routes` as a new
  `/api/instagram` endpoint.
- Cloudinary environment variables are included in `backend/.env.example` for
  when you're ready to add an admin "upload photo" feature — the current gallery
  workflow (folders + `gallery.ts`) requires no backend at all, which is the
  simplest option for a single studio owner managing their own site.
