import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap.js";

/**
 * Intro curtain: monogram + counter, then two panels lift away.
 * Calls onReveal() as the curtain starts lifting so the hero can animate in underneath.
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onReveal();
        onDone();
        return;
      }
      const counter = { v: 0 };
      const num = root.current.querySelector("[data-count]");

      gsap
        .timeline({ defaults: { ease: "power3.inOut" }, onComplete: onDone })
        .from("[data-mono]", { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: "power3.out" })
        .from("[data-tag]", { yPercent: 100, duration: 0.7 }, "-=0.4")
        .to(counter, { v: 100, duration: 1.3, ease: "power2.inOut", onUpdate: () => (num.textContent = Math.round(counter.v)) }, 0.1)
        .to("[data-bar]", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.1)
        .to("[data-content]", { autoAlpha: 0, y: -30, duration: 0.5 }, "+=0.15")
        .add(onReveal)
        .to("[data-panel]", { yPercent: -100, duration: 1, stagger: 0.08, ease: "expo.inOut" }, "<0.1");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="fixed inset-0 z-[100] pointer-events-none" aria-hidden="true">
      <div data-panel className="absolute inset-0 bg-gold" />
      <div data-panel className="absolute inset-0 bg-ink grain flex items-center justify-center">
        <div data-content className="flex flex-col items-center gap-6">
          <img data-mono src="/images/monogram-white.png" alt="" className="h-20 w-auto" />
          <div className="overflow-hidden">
            <p data-tag className="font-display italic text-lg text-ivory/80">
              From vision to precision
            </p>
          </div>
          <div className="mt-2 flex w-56 items-center gap-4">
            <div className="h-px flex-1 bg-ivory/15">
              <div data-bar className="h-full origin-left scale-x-0 bg-gold" />
            </div>
            <span data-count className="w-8 text-right text-xs tabular-nums text-ivory/60">
              0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
