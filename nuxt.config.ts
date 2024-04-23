// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  $development: {
    nitro: {
      storage: {
        animes: {
          driver: "fs",
          base: "animes",
        },
      },
    },
  },
});
