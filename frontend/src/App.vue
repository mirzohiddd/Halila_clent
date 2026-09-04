<template>
  <main>
    <ReadingProgress />

    <div class="theme-bar">
      <button
        type="button"
        class="theme-toggle"
        :aria-pressed="String(theme === 'dark')"
        @click="toggleTheme"
      >
        <span>{{ ui.toggleLabel }}</span>
        <span class="switch" aria-hidden="true"></span>
      </button>
    </div>

    <ArticlePage :article="currentArticle" :key="currentArticle.slug" />

    <footer class="site-footer">
      <p>{{ footer.note }}</p>
      <p>{{ footer.rights }}</p>
    </footer>
  </main>
</template>

<script setup>
import ArticlePage from "./components/ArticlePage.vue";
import ReadingProgress from "./components/ReadingProgress.vue";
import { currentArticle } from "./router.js";
import { footer, ui } from "./content/common.js";
import { theme, toggleTheme } from "./theme.js";
</script>
