import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap.js";
import { CONTACT, FAQS } from "../data/site.js";

export default function Faq() {
  const root = useRef(null);
  const [open, setOpen] = useState(0);
  const mounted = useRef(false);

  // Animate panel heights whenever the open item changes.
  useGSAP(
    () => {
      const panels = gsap.utils.toArray("[data-faq-panel]", root.current);
      const d = !mounted.current || prefersReducedMotion() ? 0 : 0.6;
      panels.forEach((p, i) => {
        gsap.to(p, {
          height: i === open ? "auto" : 0,
          duration: d,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: i === open && d ? () => ScrollTrigger.refresh() : undefined,
        });
      });
      mounted.current = true;
    },
    { scope: root, dependencies: [open] },
  );

  return (
    <section ref={root} id="faq" className="relative bg-sand py-28 text-ink sm:py-36">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6 text-gold-3" data-reveal>
              FAQ
            </p>
            <h2 className="h-section" data-split>
              Good <em className="italic text-gold-3">questions.</em>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink/65" data-reveal>
              Can't find what you're looking for? Write to{" "}
              <a href={`mailto:${CONTACT.email}`} className="border-b border-ink/30 font-semibold text-ink hover:border-gold-3">
                our team
              </a>{" "}
              or call {CONTACT.phoneDisplay}.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6" data-reveal>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-gold-3 sm:text-2xl">{f.q}</span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen ? "rotate-45 border-ink bg-ink text-ivory" : "border-ink/20"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  data-faq-panel
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="overflow-hidden"
                  style={{ height: i === 0 ? "auto" : 0 }}
                >
                  <p className="max-w-2xl pb-8 pr-14 text-base leading-relaxed text-ink/70">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
