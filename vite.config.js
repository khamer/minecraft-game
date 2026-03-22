import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitrine from '@imarc/vitrine'
import path from 'path'
import { pathToFileURL } from 'url'

export default defineConfig({
  publicDir: './public',
  build: {
    manifest: true,
    outDir: './public/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        './index.html',
        './resources/styles/index.scss',
        './resources/js/index.js',
        './public/main-icons-sprite.svg',
      ],
    },
  },
  plugins: [
    vue(),
    vitrine({
      /**
       * This shows in the top left of your pattern library sidebar.
       */
      name: 'Example.com',
      version: require('./package.json')?.version,

      outDir: './public',

      basePaths: [

        /**
         * This should be set to the base directory for your front end files.
         */
        'resources',
      ],
      includes: [

        /**
         * These are the entry points to include. These will also need to get
         * included into your project.
         */
        '/resources/styles/index.scss',
        '/resources/js/index.js',
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [{
          findFileUrl(url) {
            if (!url.startsWith('@/')) return null
            return pathToFileURL(path.resolve('./resources/styles', url.slice(2)))
          }
        }]
      }
    }
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    allowedHosts: [
        '.imarc.io',
        '.imarc.host',
    ],
    cors: {
        origin: [
            /* Allow localhost, 127.0.0.1, ::1 */
            /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
            /* Allow imarc.io and imarc.host */
            /^https?:\/\/[^\.]+\.imarc\.(io|host)$/,
        ]
    }
  }
})
