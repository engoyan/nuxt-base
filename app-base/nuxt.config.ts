// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    "../vuetify",
    "../orm",
    "../pb",
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
});
