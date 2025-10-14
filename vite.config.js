// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'

// 👉 Set this:
// - Project page (https://<user>.github.io/<repo>/): base = '/<repo>/'
// - Custom domain or user/org page repo (<user>.github.io): base = '/'
const base = '/' // ← change to '/' if you use a custom domain

export default defineConfig(({ mode }) => ({
  appType: 'spa',
  base,
  plugins: [
    tailwind(),
    react(),

    // Brotli compression for better compression ratios
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Only compress files > 10KB
      algorithm: 'brotliCompress',
      ext: '.br',
      deleteOriginFile: false,
    }),

    // Gzip compression as fallback for older browsers
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),

    // Image optimization
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80, // 80% quality is a good balance
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),

    // Bundle analyzer (only in analyze mode)
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),

  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },

  define: {
    'process.env': {},
    global: {},
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,

    // Better chunk splitting for optimal caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
        },

        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || ''
          const ext = name.split('.').pop()
          if (ext === 'css') return 'assets/styles/[name]-[hash][extname]'
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(name)) return 'assets/images/[name]-[hash][extname]'
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) return 'assets/fonts/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,

    sourcemap: false,
    minify: 'esbuild', // esbuild is faster than terser and good enough

    // Enable CSS minification
    cssMinify: true,

    // Optimize assets inlining
    assetsInlineLimit: 4096, // Inline assets < 4KB
  },

  // Optimize dependencies during dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
}))