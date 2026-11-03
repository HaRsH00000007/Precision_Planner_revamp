import { CITIES, VENUES } from "../data/site.js";
import Marquee from "./Marquee.jsx";

export default function Venues() {
  return (
    <section aria-label="Venues we have delivered at" className="relative overflow-hidden bg-ink py-20 grain sm:py-28">
      <div className="container-x mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <h2 className="font-display text-3xl font-light leading-tight sm:text-4xl" data-split>
          Trusted at India's <em className="italic text-gold-2">finest venues.</em>
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-ivory/50" data-reveal>
          {CITIES.length} cities · {VENUES.length}+ venues
        </p>
      </div>

      <Marquee
        items={VENUES}
        speed={55}
        className="border-y border-ivory/10 py-6"
        itemClassName="font-display text-[clamp(2rem,5vw,4rem)] font-light text-ivory/90"
      />
      <Marquee
        items={CITIES}
        reverse
        speed={35}
        className="py-6"
        separator="●"
        itemClassName="text-sm font-semibold uppercase tracking-[0.35em] text-gold-2"
      />
    </section>
  );
}
