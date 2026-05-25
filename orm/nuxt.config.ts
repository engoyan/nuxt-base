// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    // ...
    "@pinia/nuxt",
    "@pinia-orm/nuxt",
  ],
  imports: {
    dirs: [
      // // Add core services
      // 'core/services',
      // // Add specific files in core composables in subfolders
      // 'core/composables/**/*.{ts,js,mjs,mts}',
      // // Autoload all stores in all layers
      // '**/stores'
      "models",
    ],
  },
});
