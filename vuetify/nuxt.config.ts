export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // ssr: false,
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    resolve: {
      dedupe: ["sass-embedded"],
    },
    optimizeDeps: {
      include: ["sass-embedded"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Use scss-embedded's modern compiler API
          api: "modern-compiler",
        },
        sass: {
          // Use sass-embedded's modern compiler API
          api: "modern-compiler",
        },
      },
    },
  },
});
