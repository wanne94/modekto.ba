# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Pokretanje razvojnog servera
npm run build    # Produkcijski build
npm run start    # Pokretanje produkcijskog servera
```

Nema konfiguracije za linting ni testove.

## Arhitektura

**Modekto.ba** je Next.js 16 (App Router) web shop za prodaju idejnih arhitektonskih rješenja za vikendice u BiH. UI je na bosanskom/hrvatskom jeziku.

### Struktura ruta

- `app/(main)/` — Javni dio sajta (Hero, listing, detalji projekta, kontakt). Layout uključuje Header, Footer i ChatBubbleWrapper.
- `app/admin/` — Admin panel sa zasebnim layoutom i `AdminProvider` contextom. Koristi svjetlu temu (za razliku od tamne navy teme javnog dijela).
- `app/api/chat/route.ts` — Gemini 2.0 Flash AI chatbot; podržava dva moda: `chat` i `quiz`.
- `app/api/kontakt/route.ts` — Slanje emaila putem Resend-a.

### Sloj podataka

Svi podaci su mock/in-memory — nema baze podataka:
- `lib/projects.ts` — 30 mock `HouseDesign` objekata u 4 kategorije (Alpski, Moderni, Mediteranski, Mala Kuća), cijene 50€–100€. Izvozi `getProjectById`, `getSimilarProjects`, `UPSELL_OPTIONS`.
- `lib/admin-context.tsx` — React Context sa CRUD operacijama za projekte, upite i chat sesije (samo u memoriji).
- `lib/admin-mock-data.ts` — Mock podaci za upite i chat sesije.

### Ključne komponente

- `components/AIPreporuka.tsx` — 6-koračni kviz koji poziva `/api/chat` u `quiz` modu; podržava upload slike terena.
- `components/CheckoutSection.tsx` — Dugme za kupovinu; Stripe je instaliran ali **nije implementiran** (koristi `alert()` kao placeholder).
- `lib/email.ts` — Resend emailovi: potvrda kupovine i prosljeđivanje kontakt forme.

### Stil

- Tailwind CSS v4 s `@theme` CSS varijablama u `app/globals.css`.
- Javni sajt: tamna navy tema (`--background: 222 47% 11%`).
- Admin panel: svjetla bijela/siva tema.
- Path alias `@/*` → root projekta.

### Okolišne varijable (`.env.local`)

```
GEMINI_API_KEY=...
RESEND_API_KEY=...
ADMIN_EMAIL=...
# STRIPE_SECRET_KEY=... (zakomentarisano)
```

### Napomene

- `App.tsx` u root-u je ostatak od pre-Next.js verzije — nije u upotrebi u trenutnom routingu.
- `types.ts` sadrži centralne TypeScript tipove: `HouseDesign`, `ArchitectureStyle`.
