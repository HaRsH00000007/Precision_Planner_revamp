import { useRef, useState } from "react";
import { ArrowUpRight, Download, MapPin, RotateCw } from "lucide-react";
import { gsap, Flip, ScrollTrigger, useGSAP, MOTION_OK, prefersReducedMotion } from "../lib/gsap.js";
import { CONTACT, WORKS, WORK_FILTERS } from "../data/site.js";

const CATEGORY_LABEL = Object.fromEntries(WORK_FILTERS.map((f) => [f.id, f.label]));
const countFor = (id) => (id === "all" ? WORKS.length : WORKS.filter((w) => w.category === id).length);

function WorkCard({ work }) {
  const inner = useRef(null);
  const flipped = useRef(false);

  const turn = (to) => {
    if (flipped.current === to) return;
    flipped.current = to;
    gsap.to(inner.current, { rotationY: to ? 180 : 0, duration: prefersReducedMotion() ? 0 : 0.9, ease: "power3.inOut" });
  };
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  return (
    <div data-work-item data-cat={work.category} className="flip-scene aspect-[4/3]">
      <button
        ref={inner}
        type="button"
        className="flip-inner block cursor-pointer text-left"
        onPointerEnter={() => canHover() && turn(true)}
        onPointerLeave={() => canHover() && turn(false)}
        onClick={() => !canHover() && turn(!flipped.current)}
        onFocus={() => canHover() && turn(true)}
        onBlur={() => canHover() && turn(false)}
        aria-label={[work.title, work.venue, work.city].filter(Boolean).join(", ")}
      >
        {/* Front */}
        <div className="flip-face rounded-[22px] bg-navy">
          <img
            src={work.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ objectPosition: work.pos ?? "50% 50%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
            {CATEGORY_LABEL[work.category]}
          </span>
          <span
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ink/60 text-ivory backdrop-blur"
            aria-hidden="true"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </span>
          <div className="absolute inset-x-5 bottom-5 text-ivory">
            <h3 className="font-display text-2xl leading-tight lg:text-xl">{work.title}</h3>
            {work.city && (
              <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-ivory/70">
                <MapPin className="h-3.5 w-3.5" /> {work.city}
              </p>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="flip-face flip-back rounded-[22px] bg-ink">
          <img src={work.imageBack} alt="" loading="lazy" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-ivory">
            <img src="/images/monogram-gold.png" alt="" className="h-8 w-auto self-start" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-2">{work.venue ? "Venue" : "What we delivered"}</p>
              <p className="mt-1 font-display text-2xl leading-tight lg:text-xl">{work.venue ?? work.scope}</p>
              {work.city && <p className="mt-1 text-sm text-ivory/70">{work.city}</p>}
              <div className="mt-4 h-px w-full bg-ivory/15" />
              <p className="mt-3 text-sm font-semibold">{work.title}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Work() {
  const root = useRef(null);
  const [filter, setFilter] = useState("all");

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray("[data-work-item]", root.current);
        gsap.set(items, { y: 70, autoAlpha: 0 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.09, overwrite: true }),
        });
      });
    },
    { scope: root },
  );

  const applyFilter = contextSafe((id) => {
    if (id === filter) return;
    setFilter(id);
    const items = gsap.utils.toArray("[data-work-item]", root.current);
    const state = Flip.getState(items);
    items.forEach((el) => (el.style.display = id === "all" || el.dataset.cat === id ? "" : "none"));

    if (prefersReducedMotion()) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      ScrollTrigger.refresh();
      return;
    }
    Flip.from(state, {
      duration: 0.75,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.85, y: 0 }, { autoAlpha: 1, scale: 1, duration: 0.6, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.85, duration: 0.45 }),
      onComplete: () => {
        gsap.set(items, { y: 0 });
        ScrollTrigger.refresh();
      },
    });
  });

  return (
    <section ref={root} id="work" className="relative bg-ivory py-28 text-ink sm:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-6 text-gold-3" data-reveal>
              Featured work
            </p>
            <h2 className="h-section max-w-3xl" data-split>
              Stages we've <em className="italic text-gold-3">set.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/65" data-reveal>
            A selection of summits, award nights and brand activations we've produced. Hover — or tap — a card to flip it.
          </p>
        </div>

        <div role="toolbar" aria-label="Filter work" className="mt-12 flex flex-wrap gap-2" data-reveal>
          {WORK_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => applyFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                filter === f.id ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {f.label}
              <span className={`text-xs ${filter === f.id ? "text-gold-2" : "text-ink/40"}`}>{countFor(f.id)}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {WORKS.map((w) => (
            <WorkCard key={w.slug} work={w} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-5 text-center" data-reveal>
          <p className="font-display text-2xl italic text-ink/80">…and 800+ more projects.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={CONTACT.brochure} download className="btn-ink">
              <Download className="h-4 w-4" /> Download company profile
            </a>
            <a href="#contact" className="btn border border-ink/20 text-ink hover:border-ink">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
