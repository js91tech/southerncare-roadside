# SouthernCare Roadside

A mobile-first Progressive Web App for **SouthernCare Roadside** — 24/7 mobile tire and roadside service in **Marietta, GA**.

## Features

### Public (customer-facing)
- Installable PWA with offline support
- Home, Services, Book, Emergency SOS, Contact pages
- GPS location detection on Book & SOS forms
- Click-to-call
- Marietta / North Metro Atlanta service area
- Email + SMS notifications on bookings and SOS requests

### Admin
- Secure login (Supabase Auth)
- Create, edit, and manage invoices
- Line items with quick-add presets
- Print / save as PDF
- Send invoices via email (Resend)
- Mark invoices as sent / paid
- Dashboard with revenue stats

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **PWA:** vite-plugin-pwa (service worker + manifest)
- **Auth & DB:** Supabase (PostgreSQL + Row Level Security)
- **Hosting:** Netlify (static site + serverless functions)
- **Email:** Resend
- **SMS:** Twilio

## Quick Start (local)

### 1. Install dependencies

```bash
cd Projects/southerncare-roadside
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Authentication → Users** and create your admin user (email + password)
4. Copy your project URL and keys from **Settings → API**

### 3. Configure environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

### 4. Run locally

```bash
npm run dev
```

- Public site: http://localhost:5173
- Admin login: http://localhost:5173/admin/login

> **Note:** Netlify Functions (email/SMS) only work when deployed to Netlify or with `netlify dev`. Bookings still save to Supabase from the client when configured.

## Deploy to Netlify

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial SouthernCare Roadside PWA"
git remote add origin https://github.com/YOUR_USER/southerncare-roadside.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from Git
2. Build command: `npm run build`
3. Publish directory: `dist`

### 3. Set environment variables (Netlify dashboard → Site settings → Environment variables)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_URL` | Same Supabase URL (for functions) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only!) |
| `RESEND_API_KEY` | From [resend.com](https://resend.com) |
| `TWILIO_ACCOUNT_SID` | From [twilio.com](https://twilio.com) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number |
| `NOTIFY_EMAIL` | Your email for booking/SOS alerts |
| `NOTIFY_PHONE` | Your cell for SMS alerts |
| `FROM_EMAIL` | Sender email (must be verified in Resend) |

### 4. Redeploy after adding env vars

Netlify will rebuild automatically. Your site will be live at `https://your-site.netlify.app`.

## Project Structure

```
southerncare-roadside/
├── src/
│   ├── pages/           # Public + admin pages
│   ├── components/      # UI components
│   ├── lib/             # Supabase, API, constants
│   ├── context/         # Auth provider
│   └── hooks/           # PWA install, geolocation
├── netlify/functions/   # Serverless email/SMS handlers
├── supabase/schema.sql  # Database setup
├── public/              # Icons, static assets
└── netlify.toml         # Deploy config
```

## Customizing Placeholders

Edit `src/lib/constants.ts` to update:
- Phone number
- Email address
- Service areas
- Service list and pricing
- Default tax rate

## Admin Usage

1. Go to `/admin/login`
2. Sign in with your Supabase admin credentials
3. Click **+ New Invoice**
4. Fill in customer details and line items
5. **Save** → **Send via Email** → **Mark as Paid** when received
6. Use **Print / PDF** for a local copy

## License

Private — SouthernCare Roadside
