// nuxt.config.ts
// import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@vite-pwa/nuxt"],
    pwa: {
      /* PWA options */
      manifest: {
        name: 'Focus',
        short_name: 'Focus',
        description: 'Social media platform for photographers',
        theme_color: '#ffffff',
        display: "standalone",
        orientation: "portrait-primary",
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        navigateFallback:  "/"
      },
      devOptions: {
        enabled: true,
        type: "module"
      }
    }
})