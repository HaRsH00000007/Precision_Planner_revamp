import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { PILLARS } from "../data/site.js";

export default function About() {
  const root = useRef(null);
  const panel = useRef(null);
  const [active, setActive] = useState(0);
  const firstRender = useRef(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Statement lights up word by word as you scroll.
        SplitText.create("[data-statement]", {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.14 },
              {
                opacity: 1,
                stagger: 0.08,
                ease: "none",
                scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 50%", scrub: true },
              },
            ),
        });

        // Image: curtain reveal, then slow parallax inside the frame.
        gsap.fromTo(
          "[data-about-frame]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.inOut",
            scrollTrigger: { trigger: "[data-about-frame]", start: "top 80%" },
          },
        );
        gsap.fromTo(
          "[data-about-img]",
          { scale: 1.3, yPercent: -8 },
          {
            scale: 1.05,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: "[data-about-frame]", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        gsap.from("[data-about-chip]", {
          y: 40,
          autoAlpha: 0,
          rotation: -6,
          duration: 1.2,
          delay: 0.6,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: "[data-about-frame]", start: "top 70%" },
        });
      });
    },
    { scope: root },
  );

  // Tab content swap.
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      gsap.fromTo(panel.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 });
    },
    { dependencies: [active] },
  );

  return (
    <section ref={root} id="about" className="relative bg-ivory py-28 text-ink sm:py-36">
      <div className="container-x">
        <p className="eyebrow mb-10 text-gold-3" data-reveal>
          About us
        </p>
        <p data-statement className="max-w-6xl font-display text-[clamp(1.9rem,4.2vw,3.9rem)] font-light leading-[1.12] tracking-[-0.02em]">
          Precision Planners is a team of planners, designers and fabricators who turn briefs into flawless experiences — from intimate
          round-tables to large-scale summits and exhibitions across India.
        </p>

        <div className="mt-20 grid grid-cols-1 items-center gap-14 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-6">
            <div data-about-frame className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-navy">
              <img
                data-about-img
                src="/images/photo2.webp"
                alt="A Precision Planners conference in progress"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div
              data-about-chip
              className="absolute -bottom-8 right-4 flex items-center gap-4 rounded-2xl bg-ink px-5 py-4 text-ivory shadow-2xl sm:-right-6"
            >
              <img src="/images/monogram-gold.png" alt="" className="h-10 w-auto" />
              <div>
                <p className="font-display text-lg italic leading-none">From vision</p>
                <p className="font-display text-lg italic leading-none text-gold-2">to precision.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="h-section" data-split>
              Built on <em className="italic text-gold-3">detail</em>.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/70" data-reveal>
              We plan, we design, we create and we execute — in-house. That single chain of ownership is why clients trust us with their
              most visible moments, from award nights to IPO celebrations.
            </p>

            <div className="mt-10" data-reveal>
              <div role="tablist" aria-label="Our foundations" className="flex flex-wrap gap-2">
                {PILLARS.map((p, i) => (
                  <button
                    key={p.key}
                    role="tab"
                    type="button"
                    aria-selected={active === i}
                    aria-controls="pillar-panel"
                    onClick={() => setActive(i)}
                    className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                      active === i ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
                    }`}
                  >
                    {p.key}
                  </button>
                ))}
              </div>
              <div ref={panel} id="pillar-panel" role="tabpanel" className="mt-6 min-h-[7.5rem] border-l-2 border-gold pl-6">
                <p className="font-display text-xl leading-snug text-ink/85 sm:text-2xl">{PILLARS[active].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
