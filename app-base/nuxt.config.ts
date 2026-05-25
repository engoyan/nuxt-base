// https://nuxt.com/docs/api/configuration/nuxt-config

const isLocal = process.env.NUXT_BASE_LOCAL === "1";
const layer = (subpath: string) =>
  isLocal ? `../${subpath}` : `github:engoyan/nuxt-base/${subpath}`;

export default defineNuxtConfig({
  extends: [
    layer("vuetify"),
    layer("orm"),
    layer("pb"),
  ],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
});
