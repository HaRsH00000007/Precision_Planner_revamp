import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap.js";
import { startScroll, stopScroll } from "../lib/smoothScroll.js";
import { CONTACT, NAV_LINKS } from "../data/site.js";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const header = useRef(null);
  const menu = useRef(null);
  const menuTl = useRef(null);
  const [open, setOpen] = useState(false);

  // Hide on scroll down, reveal on scroll up; gain a backdrop once past the hero top.
  useGSAP(() => {
    const show = gsap.quickTo(header.current, "yPercent", { duration: 0.45, ease: "power3.out" });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        header.current.dataset.scrolled = y > 40 ? "true" : "false";
        if (y < 120) show(0);
        else show(self.direction === 1 ? -110 : 0);
      },
    });
  });

  // Full-screen mobile menu timeline.
  useGSAP(
    () => {
      menuTl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(menu.current, { autoAlpha: 1 })
        .fromTo(menu.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8 })
        .from("[data-menu-link]", { yPercent: 110, duration: 0.7, stagger: 0.05, ease: "power4.out" }, "-=0.35")
        .from("[data-menu-foot]", { autoAlpha: 0, y: 20, duration: 0.5 }, "-=0.4");
    },
    { scope: menu },
  );

  useEffect(() => {
    if (!menuTl.current) return;
    if (open) {
      stopScroll();
      menuTl.current.timeScale(1).play();
    } else {
      startScroll();
      menuTl.current.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header ref={header} data-scrolled="false" className="group/nav fixed inset-x-0 top-0 z-50">
        <div className="container-x pt-4">
          <div className="relative z-10 flex items-center justify-between rounded-full border border-transparent px-4 py-3 transition-[background-color,border-color,backdrop-filter] duration-500 group-data-[scrolled=true]/nav:border-ivory/10 group-data-[scrolled=true]/nav:bg-ink/75 group-data-[scrolled=true]/nav:backdrop-blur-xl sm:px-6">
            <a href="#home" className="shrink-0" aria-label="Precision Planners — home" onClick={() => setOpen(false)}>
              <Logo />
            </a>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group relative text-sm font-medium text-ivory/80 transition-colors hover:text-ivory"
                >
                  {l.name}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a href="#contact" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
                Get a quote <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-ivory/20 lg:hidden"
              >
                <span className={`h-px w-5 bg-ivory transition-transform duration-500 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
                <span className={`h-px w-5 bg-ivory transition-transform duration-500 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — kept outside <header> because the header is transformed (which would trap a fixed child). */}
      <div
        ref={menu}
        id="mobile-menu"
        className="invisible fixed inset-0 z-40 bg-ink grain lg:hidden"
        aria-hidden={!open}
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div className="container-x flex h-full flex-col justify-between pb-10 pt-32">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <a
                  data-menu-link
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 font-display text-5xl text-ivory transition-colors hover:text-gold-2 sm:text-6xl"
                >
                  <span className="font-sans text-xs text-gold">0{i + 1}</span>
                  {l.name}
                </a>
              </div>
            ))}
          </nav>
          <div data-menu-foot className="space-y-2 text-sm text-ivory/60">
            <a href={`mailto:${CONTACT.email}`} tabIndex={open ? 0 : -1} className="block hover:text-gold-2">
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} tabIndex={open ? 0 : -1} className="block hover:text-gold-2">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
