export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  extends: [
    ["github:engoyan/nuxt-base/app-base", { install: true }],
  ],
  imports: {
    dirs: ["models"],
  },
});
