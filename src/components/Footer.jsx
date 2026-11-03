import { useRef } from "react";
import { ArrowUp, Instagram, MessageCircle } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { scrollToTarget } from "../lib/smoothScroll.js";
import { CONTACT, NAV_LINKS, SERVICES } from "../data/site.js";
import Logo from "./Logo.jsx";

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // No per-char mask (it clips the italic overhang); the padded <p> itself clips instead.
        SplitText.create("[data-wordmark]", {
          type: "chars",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 120,
              duration: 1.2,
              stagger: 0.035,
              ease: "expo.out",
              scrollTrigger: { trigger: "[data-wordmark]", start: "top 95%" },
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden border-t border-ivory/10 bg-ink pt-20 grain">
      <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <Logo size="footer" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">
            Events, conferences, exhibitions, corporate gifting, printing and creative — planned, designed, created and executed in-house.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold-2"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-ivory/70 transition-colors hover:border-gold hover:text-gold-2"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav className="md:col-span-2 md:col-start-6" aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ivory">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Services</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a href="#services" className="hover:text-ivory">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Say hello</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-ivory">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-ivory">
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-20">
        <p
          data-wordmark
          aria-hidden="true"
          className="select-none overflow-hidden whitespace-nowrap py-[0.08em] pr-[0.1em] font-display font-light leading-[1] tracking-[-0.05em] text-ivory/90 text-[clamp(2.6rem,11.4vw,10.8rem)]"
        >
          Precision <em className="italic text-gold-2">Planners</em>
        </p>
      </div>

      <div className="container-x flex flex-col items-start justify-between gap-4 border-t border-ivory/10 py-8 text-xs text-ivory/45 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Precision Planners. All rights reserved.</p>
        <p className="font-display text-sm italic text-ivory/60">From vision to precision.</p>
        <button
          type="button"
          onClick={() => scrollToTarget("#home")}
          className="group flex items-center gap-2 font-semibold uppercase tracking-[0.2em] text-ivory/70 hover:text-gold-2"
        >
          Back to top <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
