/**
 * PostCSS Configuration File:
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 * It's commonly used with Tailwind CSS and Autoprefixer to process CSS.
 * 
 * This configuration tells PostCSS which plugins to use when processing CSS files.
 */
export default {
  // plugins object defines which PostCSS plugins to use
  plugins: {
    // Tailwind CSS plugin:
    // Processes Tailwind directives (@tailwind base, @tailwind components, @tailwind utilities)
    // and generates the final CSS with all Tailwind classes
    tailwindcss: {},
    
    // Autoprefixer plugin:
    // Automatically adds vendor prefixes to CSS properties for better browser compatibility
    // For example: 'display: flex' becomes 'display: -webkit-box; display: -ms-flexbox; display: flex'
    // This ensures CSS works across different browsers without manual prefix management
    autoprefixer: {},
  },
}
