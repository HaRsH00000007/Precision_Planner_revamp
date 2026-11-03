# Precision Planners — website

Revamped site for [precisionplanners.co.in](https://www.precisionplanners.co.in/): events, conferences, exhibitions, corporate gifting, printing and creative.

Built with React 19, Vite, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText, Flip, Observer) and Lenis smooth scrolling.

## Run locally

```bash
npm install
npm run dev       # development server
npm run build     # production build → dist/
npm run preview   # serve the production build
```

Deploy by uploading the contents of `dist/` to any static host.

## Where things live

| Path | What |
| --- | --- |
| `src/data/site.js` | All copy and data: contact details, stats, services, featured work, venues, FAQs |
| `src/components/` | One file per section (Hero, About, Services, Process, Work, …) |
| `src/lib/gsap.js` | GSAP plugin registration |
| `src/lib/smoothScroll.js` | Lenis setup, scroll lock/hold helpers, in-page link handling |
| `src/index.css` | Design tokens (colours, fonts) and shared utilities |
| `public/images/` | Optimised WebP photos (from the company profile) and logo assets |

The contact form posts to `https://api.precisionplanners.co.in/api/contact` and downloads the company profile PDF on success.
