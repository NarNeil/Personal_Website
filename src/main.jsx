// Import React and ReactDOM for creating and rendering the React application
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the main PortfolioSite component that contains all the portfolio content
import PortfolioSite from './creative_portfolio_liquid_glass_react_tailwind_framer_motion.jsx'

// Import the global CSS styles that include Tailwind CSS directives and custom styles
import './index.css'

// 
// This is the entry point of the React application.
// ReactDOM.createRoot() creates a React root that can render React elements.
// We're targeting the 'root' div element from index.html.
// 
// React.StrictMode is a wrapper component that:
// - Helps identify components with unsafe lifecycles
// - Warns about legacy string ref API usage
// - Warns about deprecated findDOMNode usage
// - Detects unexpected side effects
// - Detects legacy context API
// - Ensures reusable state
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortfolioSite />
  </React.StrictMode>,
)
