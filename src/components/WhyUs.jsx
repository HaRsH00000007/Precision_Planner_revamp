import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { REASONS } from "../data/site.js";

export default function WhyUs() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Image grows from a card into a wide frame as it scrolls through.
        gsap.fromTo(
          "[data-why-frame]",
          { clipPath: "inset(12% 18% 12% 18% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            ease: "none",
            scrollTrigger: { trigger: "[data-why-frame]", start: "top 90%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-why-img]",
          { scale: 1.35 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: "[data-why-frame]", start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.utils.toArray("[data-reason]", root.current).forEach((el) => {
          gsap.from(el.querySelector("[data-reason-line]"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
          gsap.from(el.querySelectorAll("[data-reason-anim]"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1,
            delay: 0.2,
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why-us" className="relative bg-ivory py-28 text-ink sm:py-36">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6 text-gold-3" data-reveal>
              Why Precision
            </p>
            <h2 className="h-section" data-split>
              The difference is in <em className="italic text-gold-3">who builds it.</em>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/65 lg:col-span-4 lg:col-start-9" data-reveal>
            Most agencies coordinate vendors. We own the chain — design, inventory, fabrication and the crew on the day.
          </p>
        </div>

        <div data-why-frame className="relative mt-16 aspect-[16/9] overflow-hidden rounded-[28px] bg-navy sm:aspect-[21/9]">
          <img
            data-why-img
            src="/images/work/cfo-engage-bengaluru.webp"
            alt="CFO Engage at The Leela Palace, Bengaluru, produced by Precision Planners"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
          <p className="absolute bottom-6 left-6 max-w-md font-display text-2xl italic leading-snug text-ivory sm:bottom-10 sm:left-10 sm:text-4xl">
            From stage build to show call — run by our own crew.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
          {REASONS.map((r, i) => (
            <div key={r.title} data-reason>
              <div data-reason-line className="h-px w-full bg-ink/15" />
              <div className="mt-8 flex gap-6">
                <span data-reason-anim className="font-display text-xl text-gold-3">
                  0{i + 1}
                </span>
                <div>
                  <h3 data-reason-anim className="font-display text-2xl leading-tight sm:text-3xl">
                    {r.title}
                  </h3>
                  <p data-reason-anim className="mt-3 text-base leading-relaxed text-ink/65">
                    {r.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
