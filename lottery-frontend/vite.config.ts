import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodeResolve({
      extensions: ['.js', '.ts', '.json', '.node']
    })
  ],
  optimizeDeps: { exclude: ["fsevents"] },
  
})

/*
define: {
    'process.env': {},
    'process': 'process/browser',
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
*/