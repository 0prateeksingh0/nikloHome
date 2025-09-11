import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// Custom plugin to copy flipbook assets
const copyFlipbookAssets = () => {
  return {
    name: 'copy-flipbook-assets',
    writeBundle() {
      const publicDir = join(__dirname, 'public')
      const distDir = join(__dirname, 'dist')
      const flipbookSource = join(publicDir, 'flipbook')
      const flipbookDest = join(distDir, 'flipbook')
      
      if (existsSync(flipbookSource)) {
        console.log('📁 Copying flipbook assets to dist...')
        // This will be handled by the post-build script
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), copyFlipbookAssets()],
  build: {
    // Optimize images during build
    assetsInlineLimit: 4096, // Inline small assets
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.mp3', '**/*.bcmap']
})
