// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    ["github:engoyan/nuxt-base/vuetify", { install: true }],
    ["github:engoyan/nuxt-base/orm", { install: true }],
    // ["../vuetify", { install: true }],
    // ["../orm", { install: true }],
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
});
