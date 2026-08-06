import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureScrollTrigger() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    // A barra de endereço do navegador mobile aparecendo/sumindo muda
    // innerHeight e dispararia um recalculo (às vezes incorreto) do pin.
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }
  return ScrollTrigger;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
