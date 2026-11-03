import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "../lib/gsap.js";

/**
 * Infinite ticker. Speeds up with scroll velocity and flips direction with scroll direction.
 * `reverse` makes it run the other way (for stacked rows).
 */
export default function Marquee({ items, reverse = false, speed = 40, className = "", itemClassName = "", separator = "✦" }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current.querySelector("[data-track]");
        const tween = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
        );
        // Start deep into the repeats so running it backwards never hits time 0 and stalls.
        tween.totalTime(speed * 1000);

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const dir = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
            gsap.to(tween, {
              timeScale: dir * boost,
              duration: 0.25,
              overwrite: true,
              onComplete: () => gsap.to(tween, { timeScale: dir, duration: 1.2, ease: "power2.out" }),
            });
          },
        });
      });
    },
    { scope: root },
  );

  const row = (copy) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
      {items.map((item) => (
        <span key={`${copy}-${item}`} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {item}
          <span className="mx-[0.6em] text-[0.45em] opacity-60">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
