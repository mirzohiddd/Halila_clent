import { ref, watch } from "vue";

const STORAGE_KEY = "halila-theme";

function initial() {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  // Birinchi tashrifda doim kunduzgi (yashil) rejim ochiladi.
  return "light";
}

export const theme = ref(initial());

function apply(value) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", value);
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (e) {
    /* localStorage mavjud bo'lmasa e'tiborsiz qoldiriladi */
  }
}

apply(theme.value);
watch(theme, apply);

export function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
}
