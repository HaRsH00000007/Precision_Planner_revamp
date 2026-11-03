import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap.js";

let lenis = null;
let navigating = false;
let navTimer;

/** Fired just before an in-page link scroll starts, so step-scrolling sections can let go. */
export const NAVIGATE_EVENT = "pp:navigate";

/** Starts Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};

  lenis = new Lenis({ duration: 1.15 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // In-page links are handled here (not by Lenis' `anchors` option) so we can flag
  // the scroll as navigation — pinned step sections must not capture it on the way past.
  const onClick = (e) => {
    const a = e.target.closest?.('a[href^="#"]');
    const id = a?.getAttribute("href");
    if (!id || id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el);
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

/** Full lock (mobile menu, preloader). */
export const stopScroll = () => {
  document.documentElement.classList.add("scroll-locked");
  lenis?.stop();
};
export const startScroll = () => {
  document.documentElement.classList.remove("scroll-locked");
  lenis?.start();
};

/** Pause wheel scrolling without hiding the scrollbar (stopped Lenis swallows wheel events). */
export const holdScroll = () => lenis?.stop();
export const releaseScroll = () => lenis?.start();
export const hasSmoothScroll = () => Boolean(lenis);
export const isNavigating = () => navigating;

/** Scroll to an absolute Y position, even while held. */
export function jumpTo(y, opts = {}) {
  if (lenis) lenis.scrollTo(y, { force: true, ...opts });
  else window.scrollTo({ top: y, behavior: opts.immediate ? "auto" : "smooth" });
}

/** Smoothly scroll to a selector or element (falls back to native when Lenis is off). */
export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  if (!lenis) return el.scrollIntoView({ behavior: "smooth" });

  navigating = true;
  clearTimeout(navTimer);
  const done = () => {
    navigating = false;
    clearTimeout(navTimer);
  };
  navTimer = setTimeout(done, 4000); // safety net if the scroll gets interrupted
  lenis.start();
  lenis.scrollTo(el, { offset: -80, force: true, onComplete: done });
}
