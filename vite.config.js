// Import the defineConfig function from Vite for type-safe configuration
import { defineConfig } from 'vite'

// Import the React plugin for Vite to enable React support
import react from '@vitejs/plugin-react'

// 
// Vite Configuration File:
// This file configures the Vite build tool, which provides fast development server
// and optimized production builds for modern web applications.
// 
// defineConfig() provides TypeScript intellisense and type checking for the config object.
// It's not required but recommended for better developer experience.
//
// https://vitejs.dev/config/
export default defineConfig({

  // plugins array contains all the plugins that extend Vite's functionality
  plugins: [
    // The React plugin enables:
    // - Fast Refresh (hot module replacement for React components)
    // - JSX transformation
    // - React-specific optimizations
    react()
  ],
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: ['.loca.lt'] // allow LocalTunnel domains
  }
})
