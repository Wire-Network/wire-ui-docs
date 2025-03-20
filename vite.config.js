import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base configuration for Vite
  base: './',
  
  // Configure server options
  server: {
    port: 6006,
    open: false,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  
  // Configure build options
  build: {
    outDir: 'storybook-static',
    emptyOutDir: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  
  // Configure plugins if needed
  plugins: [],
  
  // Resolve aliases
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
}); 