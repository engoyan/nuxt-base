// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [],
  runtimeConfig: {
    pocketbase: {
      adminEmail: process.env.NUXT_POCKETBASE_ADMIN_EMAIL || "",
      adminPassword: process.env.NUXT_POCKETBASE_ADMIN_PASSWORD || "",
    },
    public: {
      pocketbase: {
        port: process.env.NUXT_PUBLIC_POCKETBASE_PORT || "",
        host: process.env.NUXT_PUBLIC_POCKETBASE_HOST || "",
      },
    },
  },
});
