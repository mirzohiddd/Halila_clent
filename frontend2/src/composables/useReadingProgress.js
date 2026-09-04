import { onMounted, onUnmounted, watch } from "vue";
import { progress } from "../progress.js";

// Faqat maqola kontenti bo'yicha o'qish jarayonini hisoblaydi
// (butun sahifa balandligi bo'yicha emas).
export function useReadingProgress(target) {
  let frame = 0;

  function measure() {
    const el = target.value;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewport = window.innerHeight;
    // Maqola tepasi ekran tepasidan qancha o'tgani
    const scrolled = -rect.top;
    // O'qish uchun bosib o'tiladigan masofa
    const distance = rect.height - viewport;

    if (distance <= 0) {
      progress.value = rect.bottom <= viewport ? 1 : 0;
      return;
    }

    progress.value = Math.min(1, Math.max(0, scrolled / distance));
  }

  function onScroll() {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      measure();
    });
  }

  onMounted(() => {
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  });

  onUnmounted(() => {
    if (frame) window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    progress.value = 0;
  });

  // Maqola almashsa qaytadan o'lchanadi
  watch(target, () => measure());
}
