<template>
  <div class="reading-progress" role="presentation" aria-hidden="true">
    <div class="reading-progress__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<script setup>
import { progress } from "../progress.js";
</script>
