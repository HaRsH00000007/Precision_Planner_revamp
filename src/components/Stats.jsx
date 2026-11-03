import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { STATS } from "../data/site.js";

const fmt = (n) => Math.round(n).toLocaleString("en-IN");

export default function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray("[data-stat]", root.current).forEach((el, i) => {
          const num = el.querySelector("[data-num]");
          const target = Number(num.dataset.value);
          const obj = { v: 0 };
          num.textContent = fmt(0);
          const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
          tl.from(el, { y: 60, autoAlpha: 0, duration: 1.1, delay: i * 0.12 }).to(
            obj,
            { v: target, duration: 2.2, ease: "power3.out", onUpdate: () => (num.textContent = fmt(obj.v)) },
            "<0.15",
          );
        });
        gsap.from("[data-stat-line]", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Precision Planners in numbers" className="relative overflow-hidden bg-ink py-24 grain sm:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <h2 className="font-display text-3xl font-light leading-tight sm:text-4xl" data-split>
            A track record measured <br className="hidden sm:block" />
            in <em className="italic text-gold-2">moments delivered.</em>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-ivory/60" data-reveal>
            From boardroom round-tables to multi-day summits, every number below is a brief we turned into an experience.
          </p>
        </div>

        <div data-stat-line className="mt-14 h-px w-full bg-ivory/15" />

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-stat
              className={`flex flex-col gap-3 py-10 pr-4 lg:py-14 ${i % 2 ? "pl-6 lg:pl-10" : "lg:pl-10"} ${i ? "lg:border-l lg:border-ivory/10" : "lg:!pl-0"} ${
                i % 2 ? "border-l border-ivory/10" : ""
              }`}
            >
              <dt className="order-2 text-xs uppercase tracking-[0.2em] text-ivory/55 sm:text-sm">{s.label}</dt>
              <dd className="order-1 font-display font-light leading-none tracking-tight text-[clamp(1.9rem,3.9vw,3.75rem)]">
                <span data-num data-value={s.value} className="tabular-nums">
                  {fmt(s.value)}
                </span>
                <span className="text-gold">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
