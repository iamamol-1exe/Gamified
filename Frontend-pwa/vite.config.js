import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  define: {
    global: "globalThis",
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ["phaser"],
          "react-vendor": ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    commonjsOptions: {
      include: [/phaser/, /node_modules/],
    },
  },
  optimizeDeps: {
    include: ["phaser", "react", "react-dom", "react-router-dom"],
    exclude: [],
    force: true,
    esbuildOptions: {
      target: "es2020",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Frontend-pwa",
        short_name: "Frontend-pwa",
        description: "Frontend-pwa",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
