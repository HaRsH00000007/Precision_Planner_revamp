import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "../lib/gsap.js";

const DECK = [
  { src: "/images/hero/conference-stage.webp", title: "Stage & AV production", meta: "Conference ballroom", pos: "50% 50%" },
  { src: "/images/hero/blue-heaven-arch.webp", title: "Blue Heaven Makeup Party", meta: "Brand activation", pos: "50% 45%" },
  { src: "/images/hero/iha-2026-cube.webp", title: "India Hospitality Awards", meta: "New Delhi · 2026", pos: "50% 40%" },
  { src: "/images/hero/blush-pod.webp", title: "Experiential installs", meta: "Built in-house", pos: "50% 55%" },
];

const ROTATIONS = [0, -6, 5, -3];
const depth = (d) => ({
  y: d * -18,
  x: d * 14,
  scale: 1 - d * 0.07,
  rotation: ROTATIONS[d],
  zIndex: DECK.length - d,
  filter: `brightness(${1 - d * 0.18})`,
});

function SpinningBadge() {
  return (
    <div data-badge className="absolute -left-10 -top-12 z-20 hidden h-32 w-32 sm:block">
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="var(--color-gold)" />
        <g data-badge-text style={{ transformOrigin: "60px 60px" }}>
          <text fill="var(--color-ink)" fontSize="10.5" fontWeight="700">
            <textPath href="#badge-circle" textLength="286" lengthAdjust="spacing">
              FROM VISION TO PRECISION • PRECISION PLANNERS •
            </textPath>
          </text>
        </g>
      </svg>
      <img
        src="/images/monogram-white.png"
        alt=""
        className="absolute left-1/2 top-1/2 h-9 w-auto -translate-x-1/2 -translate-y-1/2 brightness-0"
      />
    </div>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);

  useGSAP(
    (_, contextSafe) => {
      if (!ready) return;
      const cards = gsap.utils.toArray("[data-card]", root.current);
      const mm = gsap.matchMedia();

      // Static layout for everyone (reduced motion included).
      cards.forEach((c, i) => gsap.set(c, depth(i)));

      mm.add(MOTION_OK, () => {
        let order = cards.map((_, i) => i);
        let loop;

        document.fonts.ready.then(
          contextSafe(() => {
            const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines", linesClass: "split-line" });

            const intro = gsap
              .timeline({ defaults: { ease: "expo.out" } })
              .from(split.lines, { yPercent: 110, duration: 1.4, stagger: 0.12 })
              .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 20, duration: 1 }, 0.1)
              .from("[data-hero-sub]", { autoAlpha: 0, y: 30, duration: 1.2 }, 0.5)
              .from("[data-hero-cta] > *", { autoAlpha: 0, y: 30, duration: 1, stagger: 0.1 }, 0.65)
              .from(
                cards,
                { y: 260, rotation: (i) => (i % 2 ? -25 : 25), autoAlpha: 0, duration: 1.5, stagger: { each: 0.12, from: "end" } },
                0.2,
              )
              .from("[data-badge]", { scale: 0, rotation: -180, duration: 1.2, ease: "back.out(1.6)" }, 0.9)
              .from("[data-hero-foot] > *", { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.08 }, 0.9);

            // Shuffle the deck: top card slides out, drops to the back, the rest step forward.
            const shuffle = () => {
              const top = cards[order[0]];
              order = [...order.slice(1), order[0]];
              gsap
                .timeline()
                .to(top, { xPercent: 70, x: 0, y: -30, rotation: 16, duration: 0.55, ease: "power2.in" })
                .set(top, { zIndex: 0 })
                .add(() =>
                  order.forEach(
                    (idx, d) => d < order.length - 1 && gsap.to(cards[idx], { ...depth(d), duration: 0.8, ease: "power3.out" }),
                  ),
                )
                .to(top, { xPercent: 0, ...depth(order.length - 1), duration: 0.8, ease: "power3.out" });
            };
            intro.call(
              () =>
                (loop = gsap.delayedCall(3.2, function repeat() {
                  shuffle();
                  loop = gsap.delayedCall(3.4, repeat);
                })),
            );
          }),
        );

        // Spinning badge text.
        gsap.to("[data-badge-text]", { rotation: 360, duration: 18, repeat: -1, ease: "none" });

        // Gentle 3D tilt of the deck following the pointer.
        const deck = root.current.querySelector("[data-deck]");
        const rx = gsap.quickTo(deck, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(deck, "rotationY", { duration: 0.8, ease: "power3.out" });
        const onMove = (e) => {
          ry((e.clientX / window.innerWidth - 0.5) * 14);
          rx((e.clientY / window.innerHeight - 0.5) * -10);
        };
        window.addEventListener("pointermove", onMove);

        // Parallax out on scroll.
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-copy]", { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: st });
        gsap.to("[data-deck-wrap]", { yPercent: 12, ease: "none", scrollTrigger: st });

        return () => {
          window.removeEventListener("pointermove", onMove);
          loop?.kill();
        };
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} id="home" className="relative isolate overflow-hidden bg-ink grain">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -right-40 top-1/4 h-[620px] w-[620px] rounded-full bg-navy-2/60 blur-[140px]" />
        <div className="absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="container-x absolute inset-0 hidden justify-between lg:flex">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-full w-px bg-ivory/[0.04]" />
          ))}
        </div>
      </div>

      <div className="container-x grid min-h-svh grid-cols-1 items-center gap-16 pb-28 pt-36 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-32">
        <div data-hero-copy className="lg:col-span-7">
          <p data-hero-eyebrow className="eyebrow mb-8 text-gold">
            Events · Conferences · Exhibitions · Creatives
          </p>
          <h1 data-hero-title className="font-display font-light leading-[0.95] tracking-[-0.035em] text-[clamp(3rem,7.4vw,7rem)]">
            We plan, we design, we create, <em className="font-normal italic text-gold-2">we execute.</em>
          </h1>
          <p data-hero-sub className="mt-8 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">
            Precision Planners is a full-service partner for events, exhibitions, corporate gifting and print — with 800+ projects delivered
            at India's finest venues, built by our own in-house production team.
          </p>
          <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-gold group">
              Plan your event
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#work" className="btn-ghost-light">
              See our work
            </a>
          </div>
        </div>

        <div
          data-deck-wrap
          className="relative mx-auto w-full max-w-[440px] lg:col-span-5 lg:max-w-none lg:pl-8"
          style={{ perspective: "1200px" }}
        >
          <div data-deck className="relative aspect-[5/6] w-full" style={{ transformStyle: "preserve-3d" }}>
            {DECK.map((card, i) => (
              <figure
                key={card.src}
                data-card
                className="absolute inset-0 overflow-hidden rounded-[28px] border border-ivory/10 bg-navy shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
                style={{ zIndex: DECK.length - i }}
              >
                <img
                  src={card.src}
                  alt={card.title}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: card.pos ?? "50% 50%" }}
                  fetchPriority={i === 0 ? "high" : "auto"}
                />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-ink/70 px-4 py-3 backdrop-blur-md">
                  <span className="font-display text-lg leading-tight">{card.title}</span>
                  <span className="text-right text-[11px] uppercase tracking-widest text-ivory/60">{card.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <SpinningBadge />
        </div>
      </div>

      <div
        data-hero-foot
        className="container-x absolute inset-x-0 bottom-8 hidden items-end justify-between text-xs uppercase tracking-[0.2em] text-ivory/50 md:flex"
      >
        <span>800+ projects</span>
        <span>7 cities across India</span>
        <span>In-house fabrication</span>
        <a href="#about" className="flex items-center gap-2 text-ivory/70 hover:text-gold-2">
          Scroll <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
