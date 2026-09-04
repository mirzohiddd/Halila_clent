<template>
  <section class="lead-form">
    <h2>{{ heading }}</h2>

    <div v-if="status === 'success'">
      <p><strong>{{ t.successHeading }}</strong></p>
      <p>{{ t.successText }}</p>
    </div>

    <div v-else>
      <p>{{ intro }}</p>

      <form @submit.prevent="submitForm" novalidate>
        <div class="field">
          <label :for="nameId">{{ t.nameLabel }}</label>
          <input
            :id="nameId"
            v-model.trim="form.name"
            type="text"
            autocomplete="name"
            :placeholder="t.namePlaceholder"
          />
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>

        <fieldset class="field relation-field">
          <legend>{{ t.relationLabel }}</legend>
          <div class="relation-options">
            <label
              v-for="option in relationOptions"
              :key="option.key"
              class="relation-option"
              :class="{ 'is-selected': form.relation === option.key }"
            >
              <input
                type="radio"
                :name="relationName"
                :value="option.key"
                v-model="form.relation"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>
          <p v-if="errors.relation" class="error">{{ errors.relation }}</p>
        </fieldset>

        <div class="field">
          <label :for="phoneId">{{ t.phoneLabel }}</label>
          <input
            :id="phoneId"
            v-model.trim="form.phone"
            type="tel"
            autocomplete="tel"
            :placeholder="t.phonePlaceholder"
          />
          <p v-if="errors.phone" class="error">{{ errors.phone }}</p>
        </div>

        <p v-if="status === 'error'" class="error">{{ errorMessage }}</p>

        <button type="submit" :disabled="status === 'loading'">
          {{ status === "loading" ? t.submitting : submitText }}
        </button>
      </form>

      <p class="small">{{ t.privacy }}</p>
      <p class="small">
        {{ t.callNote }}
        <a :href="site.phoneHref">{{ site.phone }}</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { form as t, site } from "../content/common.js";

const props = defineProps({
  source: { type: String, default: "halila-article" },
  // Ixtiyoriy: sahifaga xos "kim uchun" variantlari va tugma matni.
  // Berilmasa, common.js dagi umumiy qiymatlar ishlatiladi — boshqa
  // sahifalar (masalan, umumiy/ishtaha landing) hech qanday o'zgarishni sezmaydi.
  relations: { type: Array, default: null },
  submitLabel: { type: String, default: null },
  heading: { type: String, default: null },
  intro: { type: String, default: null },
});

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://halila-clent.onrender.com";

const nameId = `name-${props.source}`;
const phoneId = `phone-${props.source}`;
const relationName = `relation-${props.source}`;

const relationOptions = props.relations || t.relations;
const submitText = props.submitLabel || t.submit;
const heading = props.heading || t.heading;
const intro = props.intro || t.intro;

const form = reactive({ name: "", phone: "", relation: "" });
const errors = reactive({ name: "", phone: "", relation: "" });
const status = ref("idle"); 
const errorMessage = ref("");

function validate() {
  errors.name = "";
  errors.phone = "";
  errors.relation = "";
  let ok = true;

  if (!form.name || form.name.length < 2) {
    errors.name = t.nameError;
    ok = false;
  }
  if (form.phone.replace(/\D/g, "").length < 9) {
    errors.phone = t.phoneError;
    ok = false;
  }
  if (!form.relation) {
    errors.relation = t.relationError;
    ok = false;
  }
  return ok;
}

async function submitForm() {
  if (!validate()) return;
  status.value = "loading";
  errorMessage.value = "";

  try {
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        relation: form.relation,
        source: props.source,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || t.serverError);
    }

    status.value = "success";
  } catch (err) {
    status.value = "error";
    errorMessage.value =
      err.message === "Failed to fetch" ? t.networkError : err.message;
  }
}
</script>
