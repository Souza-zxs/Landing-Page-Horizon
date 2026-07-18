import { animate } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function smoothScrollToElement(target: Element | null, duration = 1.1) {
  if (!target) return;
  const targetY = target.getBoundingClientRect().top + window.scrollY;

  animate(window.scrollY, targetY, {
    duration,
    ease: EASE,
    onUpdate: (value) => window.scrollTo(0, value),
  });
}

export function smoothScrollLeft(
  container: HTMLElement,
  targetLeft: number,
  duration = 0.9
) {
  // CSS scroll-snap fights programmatic scrollLeft updates, snapping instantly
  // to the nearest card instead of letting the eased animation play out.
  const previousSnap = container.style.scrollSnapType;
  container.style.scrollSnapType = "none";

  const controls = animate(container.scrollLeft, targetLeft, {
    duration,
    ease: EASE,
    onUpdate: (value) => {
      container.scrollLeft = value;
    },
  });

  controls.then(() => {
    container.style.scrollSnapType = previousSnap;
  });
}
