// https://nuxt.com/docs/api/configuration/nuxt-config
import en from "primelocale/en.json";
import ru from "primelocale/ru.json";
import viteSVGLoader from "vite-svg-loader";

const isDev = process.env.NODE_ENV !== "production";

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    }
  },

  compatibilityDate: "2024-07-08",

  css: [
    "@fontsource-variable/onest",
    "@unocss/reset/tailwind.css",
  ],

  devtools: { enabled: true },

  experimental: {
    watcher: "parcel",
  },

  future: {
    compatibilityVersion: 4,
    typescriptBundlerResolution: true
  },

  modules: [
    "@nuxt/eslint",
    "@primevue/nuxt-module",
    "@unocss/nuxt",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt"
  ],

  nitro: {
    preset: "bun",
  },

  primevue: {
    importTheme: { from: "@/primevue.theme.js" },
    options: {
      locale: {
        // некоторые строки отсутствуют в русском переводе, заполняем их английским языком
        ...en.en,
        ...ru.ru
      },
      ripple: false,
      unstyled: false,
    }
  },

  routeRules: {
    "/api/*": { cache: isDev ? false : { maxAge: 15 * 60 }, cors: true },
  },

  vite: {
    build: {
      cssMinify: "lightningcss",
    },
    plugins: [
      viteSVGLoader()
    ],
  },
})