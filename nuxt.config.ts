// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],
  $development: {
    app: {
      head: {
        title: "Track Anime",
        htmlAttrs: {
          lang: "pt-br",
        },
        meta: [{ name: "description", content: "Track your favorite anime" }],
        link: [
          {
            rel: "icon",
            type: "image/png",
            href:
              process.env.NODE_ENV === "development"
                ? "/favicon-dev.png"
                : "/favicon.ico",
          },
        ],
      },
    },
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
