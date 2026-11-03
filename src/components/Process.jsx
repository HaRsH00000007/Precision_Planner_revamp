import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { PROCESS } from "../data/site.js";

export default function Process() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const list = root.current.querySelector("[data-steps]");
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: true } },
        );

        gsap.utils.toArray("[data-step]", root.current).forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 60%",
            end: "bottom 60%",
            toggleClass: { targets: step, className: "is-active" },
          });
          gsap.from(step.querySelectorAll("[data-step-anim]"), {
            y: 50,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 1.1,
            scrollTrigger: { trigger: step, start: "top 80%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="relative bg-ink py-28 grain sm:py-36">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6 text-gold" data-reveal>
              How we work
            </p>
            <h2 className="h-section" data-split>
              From first call to <em className="italic text-gold-2">final applause.</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ivory/65" data-reveal>
              Our name is our method. Four stages, one team, and a single plan that everyone — you, our designers and our crew on the floor
              — works from.
            </p>
          </div>
        </div>

        <ol data-steps className="relative lg:col-span-7">
          <span className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-ivory/10" aria-hidden="true">
            <span data-line-fill className="absolute inset-0 origin-top bg-gradient-to-b from-gold to-gold-2" />
          </span>

          {PROCESS.map((step, i) => (
            <li key={step.title} data-step className="group relative pb-20 pl-14 last:pb-0 sm:pl-20">
              <span
                className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-ivory/20 bg-ink transition-colors duration-500 group-[.is-active]:border-gold"
                aria-hidden="true"
              >
                <span className="h-2 w-2 scale-0 rounded-full bg-gold transition-transform duration-500 group-[.is-active]:scale-100" />
              </span>
              <span
                data-step-anim
                className="block font-display text-[clamp(4rem,10vw,8rem)] font-light leading-[0.8] text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_rgba(247,243,234,0.25)] group-[.is-active]:[-webkit-text-stroke:1px_var(--color-gold)]"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3 data-step-anim className="mt-4 font-display text-4xl sm:text-5xl">
                We {step.title.toLowerCase()}
                <span className="text-gold">.</span>
              </h3>
              <p data-step-anim className="mt-4 max-w-lg text-base leading-relaxed text-ivory/65 sm:text-lg">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
