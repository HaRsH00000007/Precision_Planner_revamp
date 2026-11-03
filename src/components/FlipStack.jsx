import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap.js";

/**
 * A photo that flips over in 3D to reveal the next one.
 * Auto-advances while on screen; click/tap (or Enter) flips immediately.
 */
export default function FlipStack({ images, alt, interval = 3800, className = "" }) {
  const card = useRef(null);
  const busy = useRef(false);
  const index = useRef(0);
  const [shown, setShown] = useState(0);

  const flip = () => {
    if (busy.current || images.length < 2) return;
    busy.current = true;
    const next = (index.current + 1) % images.length;
    const imgs = card.current.querySelectorAll("img");
    const swap = () => {
      imgs.forEach((im, i) => gsap.set(im, { autoAlpha: i === next ? 1 : 0 }));
      index.current = next;
      setShown(next);
    };

    if (prefersReducedMotion()) {
      swap();
      busy.current = false;
      return;
    }
    gsap
      .timeline({ onComplete: () => (busy.current = false) })
      .to(card.current, { rotationY: 90, scale: 0.94, duration: 0.38, ease: "power2.in" })
      .add(swap)
      .set(card.current, { rotationY: -90 })
      .to(card.current, { rotationY: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" });
  };

  // Auto-flip only while visible.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let timer;
    const io = new IntersectionObserver(([entry]) => {
      clearInterval(timer);
      if (entry.isIntersecting) timer = setInterval(flip, interval);
    });
    io.observe(card.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="relative flex-1" style={{ perspective: "1400px" }}>
        <button
          ref={card}
          type="button"
          onClick={flip}
          aria-label={`Show next photo of ${alt}`}
          className="group absolute inset-0 cursor-pointer overflow-hidden rounded-[22px] bg-navy shadow-[0_30px_60px_-30px_rgba(7,20,40,0.6)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === shown ? alt : ""}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
            />
          ))}
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ivory backdrop-blur">
            Tap to flip
          </span>
        </button>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        {images.map((src, i) => (
          <span key={src} className={`h-1 rounded-full transition-all duration-500 ${i === shown ? "w-10 bg-gold" : "w-4 bg-ink/15"}`} />
        ))}
      </div>
    </div>
  );
}
