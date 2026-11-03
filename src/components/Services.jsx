import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mouse } from "lucide-react";
import { gsap, Observer, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap.js";
import { NAVIGATE_EVENT, hasSmoothScroll, holdScroll, isNavigating, jumpTo, releaseScroll } from "../lib/smoothScroll.js";
import { SERVICES } from "../data/site.js";
import FlipStack from "./FlipStack.jsx";

const STEP_DURATION = 0.9; // seconds for one card to slide in
const COOLDOWN = 0.45; // extra quiet time so trackpad momentum can't skip a card
const pad = (n) => String(n).padStart(2, "0");

export default function Services() {
  const root = useRef(null);
  const stepRef = useRef(() => {});
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned, one card per scroll gesture.
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        if (!hasSmoothScroll()) return;

        const pin = root.current.querySelector("[data-pin]");
        const track = root.current.querySelector("[data-track]");
        const panels = gsap.utils.toArray("[data-panel]", root.current);
        const n = panels.length;
        const stepPx = () => Math.round(window.innerHeight * 0.6);
        // Centre panel i in the viewport.
        const xFor = (i) => -(panels[i].offsetLeft + panels[i].offsetWidth / 2 - window.innerWidth / 2);

        let st;
        let index = 0;
        let animating = false;
        let holding = false;
        let internalJump = false;
        let lock;

        // Keep the page scroll position in step with the card (so the scrollbar reflects progress).
        // Stays 1px inside the pinned range: landing exactly on the edge can register as "left the
        // section" through rounding, which would release the hold and re-capture it in a loop.
        const syncScroll = (i) => {
          internalJump = true;
          jumpTo(gsap.utils.clamp(st.start + 1, st.end - 1, st.start + i * stepPx()), { immediate: true });
          internalJump = false;
        };

        const paint = (i, instant = false) => {
          const d = instant ? 0 : STEP_DURATION;
          const ease = "power3.inOut";
          gsap.to(track, { x: xFor(i), duration: d, ease, overwrite: true });
          panels.forEach((p, j) =>
            gsap.to(p, { opacity: j === i ? 1 : 0.28, scale: j === i ? 1 : 0.92, duration: d, ease, overwrite: true }),
          );
          gsap.to("[data-progress]", { scaleX: (i + 1) / n, duration: d, ease, overwrite: true });
          panels.forEach((p, j) => (p.style.cursor = j === i ? "" : "pointer"));
          setCurrent(i);
        };

        const enter = (i, dir) => {
          const p = panels[i];
          gsap.fromTo(
            p.querySelectorAll("[data-panel-copy] > *"),
            { x: 50 * dir, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.8, stagger: 0.05, delay: 0.3, ease: "power3.out", overwrite: true },
          );
          gsap.fromTo(
            p.querySelector("[data-panel-media]"),
            { rotationY: -22 * dir, transformPerspective: 1200 },
            { rotationY: 0, duration: 1.2, ease: "power3.out", overwrite: true },
          );
        };

        const lockFor = (s) => {
          animating = true;
          lock?.kill();
          lock = gsap.delayedCall(s, () => (animating = false));
        };

        const goTo = (i) => {
          const dir = i > index ? 1 : -1;
          index = i;
          paint(i);
          enter(i, dir);
          syncScroll(i);
          lockFor(STEP_DURATION + COOLDOWN);
        };

        const onKey = (e) => {
          if (e.target.closest?.("input, textarea, select")) return;
          const fwd = ["ArrowDown", "PageDown", "ArrowRight"].includes(e.key) || (e.key === " " && !e.shiftKey);
          const back = ["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key) || (e.key === " " && e.shiftKey);
          if (!fwd && !back) return;
          e.preventDefault();
          step(fwd ? 1 : -1);
        };

        // Wheel / trackpad: one card per *gesture*. A trackpad's momentum tail can keep firing
        // wheel events for 1–2s after the fingers lift, so a timer alone isn't enough. A new
        // gesture is recognised by a pause (>200ms) or by a sudden jump in speed (a fresh swipe
        // during a decaying tail); everything else is treated as the same gesture and ignored.
        let lastWheelAt = 0;
        let lastWheelAbs = 0;
        const onWheel = (e) => {
          e.preventDefault();
          const now = performance.now();
          const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          const abs = Math.abs(delta);
          const fresh = now - lastWheelAt > 200 || abs > lastWheelAbs * 1.8 + 6;
          lastWheelAt = now;
          lastWheelAbs = abs;
          if (abs >= 2 && fresh) step(delta > 0 ? 1 : -1);
        };

        // Touch screens: one swipe = one card, decided when the finger lifts.
        const observer = Observer.create({
          target: window,
          type: "touch",
          tolerance: 10,
          preventDefault: true,
          onRelease: (self) => {
            const dy = self.startY - self.y;
            if (Math.abs(dy) > 40) step(dy > 0 ? 1 : -1);
          },
        });
        observer.disable();

        const hold = (i) => {
          if (!st || holding || isNavigating()) return;
          holding = true;
          holdScroll();
          index = i;
          paint(i, true);
          syncScroll(i);
          lockFor(0.5); // absorb the momentum that carried us in
          observer.enable();
          window.addEventListener("wheel", onWheel, { passive: false });
          window.addEventListener("keydown", onKey);
        };

        const release = () => {
          if (!holding) return;
          holding = false;
          observer.disable();
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("keydown", onKey);
          releaseScroll();
        };

        function step(dir) {
          if (!holding || animating) return;
          const next = index + dir;
          if (next >= 0 && next < n) return goTo(next);
          // Past either end: let go and glide on with the page.
          release();
          jumpTo(dir > 0 ? st.end + window.innerHeight * 0.35 : st.start - window.innerHeight * 0.35, { duration: 1.1 });
        }
        stepRef.current = step;

        // Clicking a dimmed neighbour card brings it to the front.
        const onPanelClick = (j) => (e) => {
          if (!holding || j === index) return;
          e.preventDefault();
          e.stopPropagation();
          if (!animating) goTo(j);
        };
        const clickHandlers = panels.map((p, j) => {
          const h = onPanelClick(j);
          p.addEventListener("click", h, true);
          return h;
        });

        st = ScrollTrigger.create({
          trigger: pin,
          pin: true,
          start: "top top",
          end: () => `+=${stepPx() * (n - 1)}`,
          invalidateOnRefresh: true,
          onEnter: () => hold(0),
          onEnterBack: () => hold(n - 1),
          onLeave: () => !internalJump && release(),
          onLeaveBack: () => !internalJump && release(),
          onRefresh: () => paint(index, true),
        });
        paint(0, true);

        window.addEventListener(NAVIGATE_EVENT, release);

        return () => {
          release();
          observer.kill();
          window.removeEventListener(NAVIGATE_EVENT, release);
          panels.forEach((p, j) => {
            p.removeEventListener("click", clickHandlers[j], true);
            p.style.cursor = "";
          });
          stepRef.current = () => {};
        };
      });

      // Mobile / tablet: cards stack vertically with a simple reveal.
      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        gsap.utils
          .toArray("[data-panel]", root.current)
          .forEach((panel) =>
            gsap.from(panel, { y: 80, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: panel, start: "top 85%" } }),
          );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative bg-sand text-ink">
      <div className="container-x pb-14 pt-28 sm:pt-36 lg:pb-4">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-6 text-gold-3" data-reveal>
              What we do
            </p>
            <h2 className="h-section max-w-3xl" data-split>
              Five capabilities. <em className="italic text-gold-3">One</em> accountable team.
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink/65" data-reveal>
            Bring us in for a single service or hand us the whole brief — everything is designed, produced and delivered by Precision
            Planners.
          </p>
        </div>
      </div>

      <div data-pin className="relative lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden">
        <div data-track className="container-x flex flex-col gap-6 pb-28 lg:w-max lg:max-w-none lg:flex-row lg:gap-8 lg:pb-0">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              data-panel
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${SERVICES.length}: ${s.title}`}
              className="grid grid-cols-1 gap-8 rounded-[32px] bg-ivory p-6 shadow-[0_30px_80px_-50px_rgba(7,20,40,0.5)] sm:p-10 lg:h-[66svh] lg:max-h-[620px] lg:w-[min(1080px,78vw)] lg:grid-cols-2 lg:gap-12"
            >
              <div data-panel-copy className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-display text-6xl font-light text-gold-3/90 sm:text-7xl">{pad(i + 1)}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">
                    {pad(i + 1)} / {pad(SERVICES.length)}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-3xl leading-tight sm:text-4xl xl:text-5xl">{s.title}</h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">{s.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-ink/12 px-3.5 py-1.5 text-xs font-semibold text-ink/75">
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-ink">
                  <span className="border-b border-ink/30 pb-0.5 transition-colors group-hover:border-gold-3">
                    Enquire about {s.title.toLowerCase()}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <div data-panel-media className="min-h-[280px] sm:min-h-[360px] lg:min-h-0">
                <FlipStack images={s.images} alt={s.title} className="h-full" interval={3600 + i * 350} />
              </div>
            </article>
          ))}
        </div>

        {/* Desktop controls */}
        <div className="container-x absolute inset-x-0 bottom-6 hidden items-center gap-8 lg:flex">
          <p className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            <Mouse className="h-4 w-4" /> Scroll for next
          </p>
          <div className="h-px flex-1 bg-ink/10" aria-hidden="true">
            <div data-progress className="h-full origin-left scale-x-0 bg-ink" />
          </div>
          <p className="shrink-0 font-display text-lg tabular-nums" aria-live="polite">
            {pad(current + 1)} <span className="text-ink/35">/ {pad(SERVICES.length)}</span>
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => stepRef.current(-1)}
              disabled={current === 0}
              aria-label="Previous service"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => stepRef.current(1)}
              aria-label={current === SERVICES.length - 1 ? "Continue to next section" : "Next service"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
