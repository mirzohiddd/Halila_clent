// Element ekranga kirganda yumshoq paydo bo'ladi. Bir marta ishlaydi.
const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const SUPPORTED =
  typeof window !== "undefined" && "IntersectionObserver" in window;

let observer = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  return observer;
}

export const vReveal = {
  mounted(el) {
    // Animatsiya o'chirilgan yoki qo'llab-quvvatlanmasa, kontent darhol ko'rinadi.
    if (REDUCED || !SUPPORTED) {
      el.classList.add("is-revealed");
      return;
    }
    el.classList.add("reveal");
    getObserver().observe(el);
  },
  unmounted(el) {
    if (observer) observer.unobserve(el);
  },
};
