import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "./lib/gsap.js";
import { startScroll, stopScroll } from "./lib/smoothScroll.js";
import { SERVICES } from "./data/site.js";

import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Stats from "./components/Stats.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Work from "./components/Work.jsx";
import Venues from "./components/Venues.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const main = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Smooth scrolling is started in main.jsx (before any section sets up its triggers);
  // here we just lock it while the preloader runs.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    stopScroll();
  }, []);

  const onDone = () => {
    setLoading(false);
    startScroll();
    ScrollTrigger.refresh();
  };

  // Shared scroll reveals used across sections:
  //   [data-reveal] → fade up    [data-split] → headline lines rise out of a mask
  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils
          .toArray("[data-reveal]", main.current)
          .forEach((el) => gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.1, scrollTrigger: { trigger: el, start: "top 88%" } }));
        document.fonts.ready.then(
          contextSafe(() => {
            gsap.utils.toArray("[data-split]", main.current).forEach((el) =>
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                linesClass: "split-line",
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "expo.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                  }),
              }),
            );
            ScrollTrigger.refresh();
          }),
        );
      });
    },
    { scope: main },
  );

  return (
    <>
      {loading && <Preloader onReveal={() => setRevealed(true)} onDone={onDone} />}
      <Navbar />
      <main ref={main}>
        <Hero ready={revealed} />
        <div className="relative z-10 bg-gold py-5 text-ink">
          <Marquee items={SERVICES.map((s) => s.title)} speed={30} itemClassName="font-display text-2xl sm:text-3xl italic" />
        </div>
        <About />
        <Stats />
        <Services />
        <Process />
        <Work />
        <Venues />
        <WhyUs />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
