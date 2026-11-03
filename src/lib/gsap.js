import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, Observer, useGSAP);
gsap.defaults({ ease: "power3.out", duration: 1 });

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText, Flip, Observer, useGSAP };
