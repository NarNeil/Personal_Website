/** 
 * Tailwind CSS Configuration File:
 * This file configures Tailwind CSS, a utility-first CSS framework.
 * It defines which files Tailwind should scan for classes and allows customization
 * of the design system (colors, fonts, spacing, etc.).
 * 
 * @type {import('tailwindcss').Config} - TypeScript type annotation for better IDE support
 */
export default {
  // content array tells Tailwind which files to scan for CSS classes
  // This is crucial for purging unused styles in production builds
  content: [
    "./index.html",                    // Scan the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}",     // Scan all JS/TS/JSX/TSX files in src directory
    "./*.{js,ts,jsx,tsx}",           // Scan JS/TS/JSX/TSX files in root directory
  ],
  
  // theme object allows customization of Tailwind's default design system
  theme: {
    // extend object adds new values to existing Tailwind defaults
    // without overriding the entire default theme
    extend: {
      // Currently no custom extensions, but this is where you would add:
      // - Custom colors: colors: { brand: '#123456' }
      // - Custom fonts: fontFamily: { sans: ['Inter', 'sans-serif'] }
      // - Custom spacing: spacing: { '18': '4.5rem' }
      // - Custom breakpoints, animations, etc.
    },
  },
  
  // plugins array allows adding third-party Tailwind plugins
  // Common plugins include forms, typography, aspect-ratio, etc.
  plugins: [],
}
