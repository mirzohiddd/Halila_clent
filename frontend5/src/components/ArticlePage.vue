<template>
  <article ref="root" class="article">
    <p class="kicker">{{ article.kicker }}</p>
    <h1 class="article-title">{{ article.title }}</h1>
    <p class="dateline">{{ article.dateline }}</p>

    <hr class="rule" />

    <figure v-if="article.hero" class="article-hero">
      <img
        :src="article.hero.src"
        :alt="article.hero.alt"
        width="1400"
        height="787"
        loading="eager"
        decoding="async"
      />
    </figure>

    <hr v-if="article.hero" class="rule" />

    <p class="lead">{{ article.lead }}</p>

    <template v-for="(block, i) in article.blocks" :key="i">
      <h2 v-if="block.type === 'h2'" v-reveal>{{ block.text }}</h2>

      <figure v-else-if="block.type === 'image'" v-reveal class="article-figure">
        <img
          :src="block.src"
          :alt="block.alt"
          width="1400"
          height="787"
          loading="lazy"
          decoding="async"
        />
        <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
      </figure>

      <ul v-else-if="block.type === 'list'" v-reveal class="article-list">
        <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
      </ul>

      <p v-else-if="block.type === 'disclaimer'" v-reveal class="note">
        {{ disclaimer }}
      </p>

      <p v-else v-reveal>{{ block.text }}</p>
    </template>

    <hr class="rule" />

    <LeadForm
      :source="'halila-article-' + article.slug"
      :relations="article.formRelations || null"
      :submit-label="article.formSubmitLabel || null"
      :heading="article.formHeading || null"
      :intro="article.formIntro || null"
    />
  </article>
</template>

<script setup>
import { ref } from "vue";
import LeadForm from "./LeadForm.vue";
import { disclaimer } from "../content/common.js";
import { useReadingProgress } from "../composables/useReadingProgress.js";
import { vReveal } from "../directives/reveal.js";

defineProps({
  article: { type: Object, required: true },
});

const root = ref(null);
useReadingProgress(root);
</script>
