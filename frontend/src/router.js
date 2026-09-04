import { ref } from "vue";
import { findArticle, defaultArticle } from "./content/index.js";

// Kichik, tashqi kutubxonasiz router.
// /ishtaha ko'rinishidagi yo'llar va #/ishtaha ko'rinishidagi hash yo'llar ishlaydi.
function currentPath() {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash.replace(/^#/, "");
  if (hash && hash.startsWith("/")) return hash;
  return window.location.pathname;
}

export const currentArticle = ref(findArticle(currentPath()) || defaultArticle);

function sync() {
  currentArticle.value = findArticle(currentPath()) || defaultArticle;
  if (typeof document !== "undefined") {
    document.title = currentArticle.value.documentTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", currentArticle.value.metaDescription);
  }
}

export function navigate(path) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", path);
  sync();
  window.scrollTo({ top: 0 });
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", sync);
  window.addEventListener("hashchange", sync);
  sync();
}
