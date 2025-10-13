// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// 👉 Set this:
// - Project page (https://<user>.github.io/<repo>/): base = '/<repo>/'
// - Custom domain or user/org page repo (<user>.github.io): base = '/'
const base = '/' // ← change to '/' if you use a custom domain

export default defineConfig({
  appType: 'spa',
  base,
  plugins: [
    tailwind(),
    react(),
    // NOTE: GitHub Pages already gzips/brotlis at the CDN.
    // If you still want precompressed assets, keep your compression plugins here.
  ],
  resolve: {
    // ESM-safe alias (no __dirname needed)
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    'process.env': {}, // if some libs read process.env at runtime
    global: {},        // if some libs expect a Node-like global
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // manualChunks: {
        //   react: ['react', 'react-dom', 'react-router-dom', 'react-router'],
        //   vendor: [
        //     'gray-matter',
        //     'remark-gfm',
        //     'rehype-raw',
        //     'rehype-sanitize',
        //     'rehype-stringify',
        //     'remark-rehype',
        //   ],
        //   ui: ['lucide-react'],
        // },
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
    sourcemap: false,
    // If you want terser, ensure `npm i -D terser` first, otherwise leave default (esbuild) which is fast.
    // minify: 'terser',
    // terserOptions: {
    //   compress: { drop_console: true, drop_debugger: true },
    //   mangle: { toplevel: true, safari10: true },
    //   format: { comments: false },
    // },
  },
})
