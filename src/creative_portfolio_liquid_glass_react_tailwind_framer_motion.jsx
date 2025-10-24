// React core imports - essential hooks for state management and side effects
import React, { useEffect, useMemo, useRef, useState } from "react";

// Framer Motion imports - animation library for React components
// motion: animated components, AnimatePresence: exit animations, useScroll/useTransform: scroll-based animations
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Lucide React icons - modern, customizable SVG icons
// These provide consistent, accessible icons throughout the portfolio
import { Github, Linkedin, Mail, ExternalLink, Trophy, Code2, Bot, Brain, Send, ArrowRight, Menu, X, Download, ArrowUpRight, Home, Briefcase, User, MessageCircle } from "lucide-react";

// Three.js React integration - enables 3D graphics in React
// Canvas: 3D scene container, useFrame: animation loop hook
import { Canvas, useFrame } from "@react-three/fiber";

// Three.js helpers and materials for enhanced 3D effects
// Float: floating animation, MeshDistortMaterial: liquid-like distortion, PresentationControls: mouse interaction
import { Float, MeshDistortMaterial, PresentationControls, Environment, Stars } from "@react-three/drei";

// Three.js core - Color class for color manipulation
import { Color } from "three";

// Array of role titles that will be displayed in the typewriter effect
// These rotate through to show different aspects of Neil's professional identity
const roles = ["Software Engineering Student", "Software Developer", "AI Enthusiast", "Problem Solver"];

// Portfolio projects data structure
// Each project contains all necessary information for display in the projects section
const projects = [
  {
    title: "Bridge Platform",
    blurb: "Unified platform consolidating student services into a streamlined hub with AI features.",
    stack: ["React", "Node.js", "PostgreSQL", "AI Integration"],
    links: { repo: "#" },
    cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Collaborative Editor",
    blurb: "POSIX-threaded C server for real-time Markdown edits with atomic commands and versioned broadcasts.",
    stack: ["C", "POSIX Threads", "Linux", "Makefile"],
    links: { repo: "https://github.com/NarNeil/Collaborative-Editor" },
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "COSMA — Social Constellations",
    blurb: "SoftSpark Hackathon 2025 winner - connects people via star-themed interests and events.",
    stack: ["Next.js", "Supabase", "Tailwind", "Framer Motion"],
    links: { repo: "https://github.com/NarNeil/softspark-hack-2025-depecticons" },
    cover: "https://images.unsplash.com/photo-1447430617419-95715602278e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "AI Chatbot Platform",
    blurb: "Multiple chatbot demos with GPT models, UiPath, and Azure services showcasing AI capabilities.",
    stack: ["Python", "GPT", "UiPath", "Azure"],
    links: { repo: "#" },
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Simple AI TalkBot",
    blurb: "Real-time conversational bot for Google Meet using OpenAI API and Selenium automation.",
    stack: ["Python", "Selenium", "OpenAI API"],
    links: { repo: "https://github.com/NarNeil/Simple-AiTalkBot" },
    cover: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "SoundBall",
    blurb: "C library for WAV audio editing with memory-safe operations and position-independent flags.",
    stack: ["C", "GNU Make", "Audio Processing"],
    links: { repo: "https://github.com/NarNeil/SoundBoard" },
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "InkBall Game",
    blurb: "Java puzzle game with physics mechanics, configurable levels, and JUnit testing via Gradle.",
    stack: ["Java", "Processing", "Gradle", "JUnit"],
    links: { repo: "#" },
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Minesweeper Clone",
    blurb: "Java-based Minesweeper with random mine placement, flagging, timers, and explosion animations.",
    stack: ["Java", "Processing", "Gradle"],
    links: { repo: "https://github.com/NarNeil/Minesweeper" },
    cover: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop"
  }
];

// Professional experience timeline data
// Chronologically ordered work experience with key achievements
const experience = [
  { 
    year: "2025", 
    org: "Enactus USYD • Software Developer @ Bridge", 
    desc: "Developing a unified platform consolidating student services. Leading cross-functional team to design and prototype features enhancing usability and accessibility."
  },
  { 
    year: "2024–2025", 
    org: "University of Sydney • Engineering Peer Mentor", 
    desc: "Guided 10+ first-year students academically and socially. Provided tailored tips building confidence and fostering peer connections."
  },
  { 
    year: "2023", 
    org: "Druid AI • Internship", 
    desc: "Developed chatbot demos with GPT models, UiPath, and Azure services. Collaborated with developers to troubleshoot deployment issues and supported sales calls."
  },
  { 
    year: "2023", 
    org: "Bank Muscat • Automation Intern", 
    desc: "Gained exposure to Business Process Management (OmniFlow) and automation software (UiPath). Part of AGILE team for account opening automation."
  },
  { 
    year: "2022", 
    org: "Hewlett-Packard Enterprise • Internship", 
    desc: "Gained comprehensive understanding of various business models. Actively supported assigned projects leveraging Azure and other software applications."
  }
];

// Technical skills section data organized by category
const technicalSkills = {
  languages: {
    title: "Languages",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["Python", "Java", "JavaScript", "C", "SQL", "R", "HTML5", "CSS3"]
  },
  dataScience: {
    title: "Data Science & AI",
    icon: <Brain className="h-6 w-6" />,
    skills: ["Scikit-learn", "PyTorch", "Pandas", "TensorFlow", "Data Visualization"]
  },
  qaAndTesting: {
    title: "QA & Testing",
    icon: <Bot className="h-6 w-6" />,
    skills: ["PyTest", "Selenium", "Coverage Analytics", "JaCoCo"]
  },
  devOps: {
    title: "Dev Ops",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["Git", "Git Actions", "REST API Integration"]
  },
  databases: {
    title: "Databases",
    icon: <Code2 className="h-6 w-6" />,
    skills: ["PostgreSQL/SQL", "Schema Design", "Supabase"]
  }
};

/**
 * Custom Hook: useTypewriter
 * Creates a typewriter effect that cycles through an array of words
 * 
 * How it works:
 * 1. Types out each word character by character
 * 2. Pauses briefly when word is complete
 * 3. Deletes the word character by character
 * 4. Moves to the next word and repeats
 * 
 * @param {string[]} words - Array of words to cycle through
 * @param {number} speed - Typing speed in milliseconds (default: 90ms)
 * @param {number} delay - Pause duration after completing a word (default: 1400ms)
 * @returns {string} - Current displayed text with blinking cursor
 */
function useTypewriter(words, speed = 90, delay = 1400) {
  // State management for typewriter effect
  const [index, setIndex] = useState(0);        // Current word index in the array
  const [subIndex, setSubIndex] = useState(0);  // Current character position within the word
  const [deleting, setDeleting] = useState(false); // Whether we're currently deleting characters
  
  // Main typing/deleting logic
  useEffect(() => {
    const currentWord = words[index % words.length]; // Get current word (with wraparound)
    
    const timeout = setTimeout(() => {
      if (!deleting) {
        // Typing phase: add characters one by one
        setSubIndex((p) => p + 1);
        if (subIndex === currentWord.length) setDeleting(true); // Switch to deleting when word is complete
      } else {
        // Deleting phase: remove characters one by one
        setSubIndex((p) => p - 1);
        if (subIndex === 0) {
          // When word is fully deleted, move to next word
          setDeleting(false);
          setIndex((p) => (p + 1) % words.length);
        }
      }
    }, !deleting ? speed : Math.max(45, speed / 1.6)); // Faster deletion than typing
    
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [subIndex, deleting, index, words, speed]);
  
  // Handle pause after completing a word
  useEffect(() => {
    if (!deleting && subIndex === words[index % words.length].length) {
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
  }, [deleting, subIndex, index, words, delay]);
  
  // Return current text with blinking cursor (thin space + regular space alternating)
  return words[index % words.length].substring(0, subIndex) + (subIndex % 2 === 0 ? "\u200A" : "");
}

/**
 * GlassCard Component
 * Reusable glassmorphism card component with consistent styling
 * 
 * Glassmorphism effect achieved through:
 * - Semi-transparent background (bg-white/10)
 * - Backdrop blur for frosted glass effect
 * - Subtle border and ring for depth
 * - Rounded corners for modern appearance
 * 
 * @param {string} className - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to render inside the card
 */
const GlassCard = ({ className, children }) => (
  <div className={`relative rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg ${className || ""}`}>
    {/* Subtle inner ring for enhanced glass effect */}
    <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
    {children}
  </div>
);

/**
 * SectionTitle Component
 * Consistent section header with optional eyebrow text
 * 
 * Features:
 * - Responsive typography using clamp() for fluid scaling
 * - Optional eyebrow text for section categorization
 * - Consistent spacing and typography hierarchy
 * 
 * @param {string} eyebrow - Optional small text above the main title
 * @param {string} title - Main section title
 */
const SectionTitle = ({ eyebrow, title }) => (
  <div className="mb-6 md:mb-8">
    {/* Eyebrow text - small, uppercase, with letter spacing */}
    {eyebrow && <p className="text-xs md:text-sm tracking-widest text-white/60 uppercase">{eyebrow}</p>}
    {/* Main title with responsive font sizing */}
    <h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.25rem)] md:text-4xl font-semibold tracking-tight">{title}</h2>
  </div>
);

/**
 * Custom Hamburger Menu Component
 * Animated hamburger menu that transitions into an X when opened
 * 
 * Features:
 * - Two lines that smoothly transition into an X
 * - Lines move to center and rotate to form X
 * - Smooth morphing animations with proper timing
 * - Custom styling for better visual appeal
 */
const HamburgerMenu = ({ isOpen, onClick }) => (
  <button 
    className="md:hidden p-2 relative w-8 h-8 flex flex-col justify-center items-center" 
    aria-label="Toggle menu" 
    onClick={onClick}
  >
    {/* First line - transitions to top part of X */}
    <motion.div
      className="w-6 h-0.5 bg-white absolute"
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -6,
        opacity: isOpen ? 1 : 1,
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1],
        rotate: { delay: isOpen ? 0.1 : 0 },
        y: { delay: isOpen ? 0 : 0.1 }
      }}
    />
    {/* Second line - transitions to bottom part of X */}
    <motion.div
      className="w-6 h-0.5 bg-white absolute"
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 6,
        opacity: isOpen ? 1 : 1,
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.4, 0, 0.2, 1],
        rotate: { delay: isOpen ? 0.1 : 0 },
        y: { delay: isOpen ? 0 : 0.1 }
      }}
    />
  </button>
);

/**
 * Desktop Card Navbar Component
 * Card-based navigation system for desktop with expanding animation
 * 
 * Features:
 * - Card-based navigation with smooth expansion
 * - Dynamic color-changing download button
 * - Hamburger menu that transforms to X
 * - Staggered card animations
 * - Responsive design for desktop only
 * - Scroll-based background opacity changes
 * - Glassmorphism effect with reduced transparency when open
 */
const DesktopCardNavbar = ({ activeSection, isOpen, onToggle }) => {
  // Track scroll position for dynamic background effects
  const { scrollY } = useScroll();
  
  // Transform scroll position into background opacity values
  // Creates smooth fade-in effect as user scrolls
  const bgOpacity = useTransform(scrollY, [0, 200], [0.1, 0.3]);
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 0.1]);
  
  // Color mapping for each section (same as particles)
  const colorMap = {
    home: "#8b5cf6",      // Purple
    projects: "#22d3ee",  // Cyan
    experience: "#a3e635", // Green
    build: "#f472b6",     // Pink
    education: "#fbbf24", // Amber
    contact: "#60a5fa",   // Blue
  };
  
  const currentColor = colorMap[activeSection] || "#8b5cf6";
  
  // Navigation items with section-specific colors and icons
  const navItems = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5" />,
      bgColor: "#0D0716",
      textColor: "#fff",
      href: "#home",
      opacity: 0.9
    },
    {
      label: "Experience",
      icon: <Briefcase className="h-5 w-5" />,
      bgColor: "#170D27",
      textColor: "#fff",
      href: "#experience",
      opacity: 0.85
    },
    {
      label: "Projects", 
      icon: <Code2 className="h-5 w-5" />,
      bgColor: "#271E37",
      textColor: "#fff",
      href: "#projects",
      opacity: 0.8
    },
    {
      label: "Skills",
      icon: <Brain className="h-5 w-5" />,
      bgColor: "#0D0716",
      textColor: "#fff",
      href: "#build",
      opacity: 0.9
    },
    {
      label: "Education",
      icon: <Trophy className="h-5 w-5" />,
      bgColor: "#271E37",
      textColor: "#fff",
      href: "#education",
      opacity: 0.8
    },
    {
      label: "Contact",
      icon: <MessageCircle className="h-5 w-5" />,
      bgColor: "#170D27",
      textColor: "#fff",
      href: "#contact",
      opacity: 0.85
    }
  ];

  return (
    <div className="hidden md:block fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[60] top-[2em]">
      <motion.nav
        className="block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height] backdrop-blur-xl border border-white/10"
        style={{
          backgroundColor: isOpen ? `rgba(16,16,24,${bgOpacity.get() + 0.2})` : `rgba(16,16,24,${bgOpacity.get()})`,
          borderColor: `rgba(255,255,255,${borderOpacity.get()})`
        }}
        animate={{ 
          height: isOpen ? 160 : 60,
          backgroundColor: isOpen ? `rgba(16,16,24,0.4)` : `rgba(16,16,24,${bgOpacity.get()})`
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {/* Top bar with hamburger, logo, and download button */}
        <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          {/* Hamburger menu */}
          <div
            className="group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px]"
            onClick={onToggle}
            role="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: '#fff' }}
          >
            <motion.div
              className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 4 : 0,
              }}
            />
            <motion.div
              className="hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0,
              }}
            />
          </div>

          {/* Logo - centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-lg font-semibold text-white">Neil Narnoli</div>
          </div>

          {/* Download CV Button */}
          <motion.button
            className="border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: `${currentColor}20`,
              borderColor: currentColor,
              color: currentColor,
            }}
            whileHover={{ 
              backgroundColor: `${currentColor}30`,
            }}
            animate={{
              filter: [
                "brightness(1)",
                "brightness(1.1)",
                "brightness(1)",
                "brightness(1.05)",
                "brightness(1)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => {
              console.log("Download CV clicked");
            }}
          >
            Download CV
          </motion.button>
        </div>

        {/* Card content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-row items-end gap-[20px] z-[1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.div
                    key={`${item.label}-${idx}`}
                    className={`nav-card select-none relative flex flex-col items-center justify-center rounded-[10px] min-w-0 flex-[1_1_0%] h-[80px] min-h-0 cursor-pointer transition-all duration-300 backdrop-blur-sm group ${
                      isActive ? 'border-b-2 border-[#a95cff]' : ''
                    }`}
                    style={{ 
                      backgroundColor: isActive ? `${currentColor}15` : item.bgColor, 
                      color: isActive ? currentColor : item.textColor,
                      padding: '1.2em',
                      opacity: isActive ? 1 : item.opacity,
                      borderColor: isActive ? `${currentColor}30` : 'transparent',
                      borderWidth: isActive ? '1px' : '0px'
                    }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: item.opacity }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: idx * 0.08,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 6px 12px rgba(150, 100, 255, 0.3)",
                      background: "linear-gradient(145deg, #1a092a, #2b0e4b)",
                      opacity: 1
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={() => {
                      window.location.href = item.href;
                      onToggle();
                    }}
                  >
                    {/* Icon */}
                    <div className="nav-card-icon mb-1 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    
                    {/* Label */}
                    <div className="nav-card-label font-normal tracking-[-0.5px] text-[14px] text-center">
                      {item.label}
                    </div>
                    
                    {/* Tooltip */}
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Go to {item.label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

/**
 * Mobile Sidebar Component
 * Full-screen mobile sidebar that expands from the navbar
 * 
 * Features:
 * - Expands from navbar position (not overlay)
 * - Keeps navbar elements in same position
 * - Centered navigation links in large fonts
 * - Less transparent glassy background
 * - Download CV button with section-based color changes
 * - Smooth expansion animation from navbar
 */
const MobileSidebar = ({ isOpen, onClose, activeSection }) => {
  // Color mapping for each section (same as particles)
  const colorMap = {
    home: "#8b5cf6",      // Purple
    projects: "#22d3ee",  // Cyan
    experience: "#a3e635", // Green
    build: "#f472b6",     // Pink
    education: "#fbbf24", // Amber
    contact: "#60a5fa",   // Blue
  };
  
  const currentColor = colorMap[activeSection] || "#8b5cf6";
  
  return (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
        
        {/* Expanding sidebar from navbar */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100vh" }}
          exit={{ height: 0 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 200,
            duration: 0.6 
          }}
          className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl overflow-hidden"
        >
          <div className="flex flex-col h-full">
            {/* Spacer to maintain navbar height */}
            <div className="h-[60px]" />
            
            {/* Navigation links */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-8 px-6">
              {[
                ["Experience", "#experience"],
                ["Projects", "#projects"],
                ["Skills", "#build"],
                ["Education", "#education"],
                ["Contact", "#contact"],
              ].map(([label, href], index) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={onClose}
                  className="text-3xl md:text-4xl font-bold text-white hover:text-white/70 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    delay: 0.3 + (index * 0.1),
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
            
            {/* Download CV Button */}
            <div className="p-6 pb-12 flex justify-center">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                style={{
                  backgroundColor: `${currentColor}20`,
                  borderColor: currentColor,
                  color: currentColor,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  filter: [
                    "brightness(1)",
                    "brightness(1.1)",
                    "brightness(1)",
                    "brightness(1.05)",
                    "brightness(1)"
                  ]
                }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  delay: 0.8,
                  duration: 0.4,
                  ease: "easeOut",
                  filter: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: `${currentColor}30`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Placeholder for CV download functionality
                  console.log("Download CV clicked");
                }}
              >
                <Download className="h-6 w-6" />
                DOWNLOAD CV
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  );
};

/**
 * Navbar Component
 * Responsive navigation system with desktop card navbar and mobile sidebar
 * 
 * Features:
 * - Desktop: Card-based navigation with expanding animation
 * - Mobile: Full-screen sidebar with glassmorphism design
 * - Dynamic button colors based on active section
 * - Smooth animations using Framer Motion
 * - Responsive design for different screen sizes
 * 
 * Technical implementation:
 * - Desktop uses card-based expansion system
 * - Mobile uses full-screen sidebar expansion
 * - Both systems share active section tracking
 * - Dynamic color changes for download buttons
 */
const Navbar = ({ activeSection }) => {
  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);
  // Desktop menu state
  const [desktopOpen, setDesktopOpen] = useState(false);
  
  return (
    <>
      {/* Desktop Card Navbar */}
      <DesktopCardNavbar 
        activeSection={activeSection} 
        isOpen={desktopOpen} 
        onToggle={() => setDesktopOpen(!desktopOpen)} 
      />
      
      {/* Mobile Navbar */}
      <motion.nav className="md:hidden fixed top-0 left-0 right-0 z-[60] border-b backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Brand/Logo - links to home section */}
          <a href="#home" className="font-semibold tracking-tight text-lg">Neil Narnoli</a>
          
          {/* Custom hamburger menu */}
          <HamburgerMenu isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
      </motion.nav>
      
      {/* Mobile sidebar */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} activeSection={activeSection} />
    </>
  );
};

/**
 * LiquidOrb Component
 * 3D animated orb with liquid-like distortion effects
 * 
 * Technical implementation:
 * - Uses Three.js icosahedron geometry for smooth sphere
 * - MeshDistortMaterial creates liquid-like surface distortion
 * - Float component adds gentle floating animation
 * - Respects user's motion preferences for accessibility
 * 
 * @param {boolean} reducedMotion - Whether to reduce animations for accessibility
 */
function LiquidOrb({ reducedMotion = false }) {
  return (
    <Float 
      speed={reducedMotion ? 0 : 1} 
      rotationIntensity={reducedMotion ? 0 : 0.6} 
      floatIntensity={reducedMotion ? 0 : 1.2}
    >
      <mesh castShadow receiveShadow>
        {/* Icosahedron geometry provides smooth sphere with good performance */}
        <icosahedronGeometry args={[1.4, 32]} />
        {/* MeshDistortMaterial creates the liquid glass effect */}
        <MeshDistortMaterial
          transparent
          opacity={0.8}                    // Semi-transparent for glass effect
          roughness={0.05}                 // Very smooth surface
          metalness={0.2}                  // Slight metallic reflection
          color="#8987f5"                  // Purple color matching theme
          distort={reducedMotion ? 0 : 0.35}  // Liquid distortion amount
          speed={reducedMotion ? 0 : 1.9}     // Animation speed
        />
      </mesh>
    </Float>
  );
}

/**
 * Hero3D Component
 * Main hero section with 3D animated orb and typewriter effect
 * 
 * Features:
 * - Responsive grid layout (single column on mobile, two columns on desktop)
 * - Typewriter effect cycling through professional roles
 * - Interactive 3D orb with mouse controls
 * - Accessibility considerations (respects reduced motion preferences)
 * - Gradient background effects for visual depth
 * 
 * Technical implementation:
 * - Three.js Canvas for 3D rendering
 * - Custom useTypewriter hook for text animation
 * - Responsive design with CSS Grid and clamp() functions
 * - Motion detection for accessibility
 */
const Hero3D = () => {
  // Get typewriter text from custom hook
  const typed = useTypewriter(roles);
  
  // Detect user's motion preferences for accessibility
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 pt-24 md:pt-36 pb-8 md:pb-14">
        {/* Responsive grid layout */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column: Text content */}
          <div>
            {/* Section label */}
            <p className="text-white/60 uppercase tracking-widest text-[10px] md:text-xs">Portfolio</p>
            
            {/* Main headline with responsive typography */}
            <h1 className="mt-2 leading-tight font-semibold text-[clamp(2rem,7vw,3.5rem)]">
              Building intelligent systems
              <span className="block text-white/70">that connect people and automate work.</span>
            </h1>
            
            {/* Description paragraph */}
            <p className="mt-4 md:mt-5 text-white/80 max-w-prose text-[clamp(0.95rem,1.2vw,1.05rem)]">
              Third-year Software Engineering student at the University of Sydney with hands-on experience in AI, data science, and automation. Passionate about collaborating in agile teams to deliver high-impact software.
            </p>
            
            {/* Call-to-action buttons */}
            <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-4 py-2 md:px-5 md:py-2.5 font-medium">
                View Projects <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 md:px-5 md:py-2.5">
                Contact <Send className="h-4 w-4" />
              </a>
            </div>
            
            {/* Social links and achievements */}
            <div className="mt-6 flex items-center gap-4 text-white/80">
              <a className="hover:text-white" href="mailto:narnoli.neil@gmail.com"><Mail className="h-5 w-5" /></a>
              <a className="hover:text-white" href="https://github.com/NarNeil" target="_blank" rel="noreferrer"><Github className="h-5 w-5" /></a>
              <a className="hover:text-white" href="https://linkedin.com/in/nnarnoli" target="_blank" rel="noreferrer"><Linkedin className="h-5 w-5" /></a>
              <span className="inline-flex items-center gap-1 text-[10px] md:text-xs rounded-full border border-white/15 px-2 py-1"><Trophy className="h-3 w-3" /> SoftSpark Hackathon Winner</span>
            </div>
          </div>
          
          {/* Right column: 3D orb */}
          <div className="relative h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
            {/* Gradient background effect */}
            <div className="absolute -top-20 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/25 to-cyan-400/25 blur-3xl" />
            
            {/* Three.js Canvas for 3D rendering */}
            <Canvas 
              dpr={[1, 1.8]} 
              shadows 
              camera={{ position: [0, 0, 4.2], fov: 45 }} 
              gl={{ antialias: true }}
            >
              {/* Starfield background (only if motion is not reduced) */}
              {!reduced && <Stars radius={40} depth={50} count={800} factor={2} fade />}
              
              {/* Lighting setup */}
              <ambientLight intensity={0.6} />
              <directionalLight position={[4, 5, 3]} intensity={0.9} castShadow />
              
              {/* Interactive controls for the orb */}
              <PresentationControls enabled={!reduced} global polar={[0, Math.PI / 8]} azimuth={[-Math.PI / 6, Math.PI / 6]}>
                <LiquidOrb reducedMotion={reduced} />
              </PresentationControls>
              
              {/* Environment lighting */}
              <Environment preset="city" />
            </Canvas>
            
            {/* Typewriter text overlay */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl px-3 py-1 text-xs md:text-sm">
              Currently: <span className="font-medium">{typed}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Projects Component
 * Displays portfolio projects in a responsive grid layout
 * 
 * Features:
 * - Responsive grid (1 column mobile, 2 tablet, 3 desktop)
 * - Staggered animations using Framer Motion
 * - Glassmorphism cards with hover effects
 * - Project images with overlay gradients
 * - Technology stack tags
 * - External links (demo and repository)
 * 
 * Animation strategy:
 * - Each project animates in with a slight delay (i * 0.05)
 * - Creates a cascading effect as projects come into view
 * - Uses whileInView for scroll-triggered animations
 */
const Projects = () => (
  <section id="projects" className="relative">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      {/* Section header */}
      <SectionTitle eyebrow="Work" title="Selected Projects" />
      
      {/* Responsive project grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.div 
            key={p.title} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="group h-full overflow-hidden">
              {/* Project image with hover effect */}
              <div className="relative">
                <img 
                  src={p.cover} 
                  alt={p.title} 
                  className="h-40 sm:h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]" 
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              
              {/* Project content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/75 min-h-[3.5rem]">{p.blurb}</p>
                
                {/* Technology stack tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] sm:text-xs text-white/80">{s}</span>
                  ))}
                </div>
                
                {/* External links */}
                <div className="mt-4 flex items-center gap-3">
                  <a href={p.links.repo} className="inline-flex items-center gap-1 text-sm hover:underline">Code <Github className="h-4 w-4" /></a>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Experience Component
 * Timeline view of professional experience
 * 
 * Features:
 * - Vertical timeline with connecting line
 * - Alternating left/right layout on desktop
 * - Glassmorphism cards for each experience
 * - Staggered animations for visual appeal
 * - Responsive design (stacked on mobile)
 * 
 * Layout strategy:
 * - Desktop: Alternating left/right positioning
 * - Mobile: Single column with timeline line
 * - Uses CSS Grid and Flexbox for responsive behavior
 */
const Experience = () => (
  <section id="experience" className="relative">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <SectionTitle eyebrow="Journey" title="Experience Timeline" />
      
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-ml-px top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/10" />
        
        <div className="space-y-6 md:space-y-8">
          {experience.map((e, i) => (
            <motion.div
              key={e.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative md:flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:items-center`}
            >
              {/* Experience card */}
              <div className="md:w-1/2 md:px-8">
                <GlassCard className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-white/60">{e.year}</p>
                  <h3 className="mt-1 text-lg sm:text-xl font-semibold">{e.org}</h3>
                  <p className="mt-2 text-white/80 text-sm">{e.desc}</p>
                </GlassCard>
              </div>
              
              {/* Spacer for alternating layout */}
              <div className="relative md:w-1/2 md:px-8"><div className="hidden md:block h-0" /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/**
 * Skills Component
 * Displays technical skills organized by category
 * 
 * Features:
 * - Skills organized by category (Languages, Data Science, QA, DevOps, Databases)
 * - Responsive grid layout that adapts to screen size
 * - Skill tags with glassmorphism styling
 * - Staggered animations for visual appeal
 * 
 * Design approach:
 * - Each category card contains icon, title, and skill tags
 * - Icons are contained within glassmorphism containers
 * - Skill tags use rounded pills with subtle backgrounds
 * - Responsive typography and spacing
 */
const Skills = () => (
  <section id="build" className="relative">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <SectionTitle eyebrow="Technical Expertise" title="Skills" />
      
      {/* Responsive grid for skill categories */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(technicalSkills).map(([key, category], i) => (
          <motion.div 
            key={key} 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-5 h-full">
              {/* Icon and title row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                  {category.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{category.title}</h3>
              </div>
              
              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs sm:text-sm text-white/90 hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/**
 * Education Component
 * Academic background and achievements
 * 
 * Features:
 * - University education details
 * - Key subjects and areas of study
 * - Academic achievements and certifications
 * - Glassmorphism styling
 * 
 * Layout strategy:
 * - Two-column grid with institution and details
 * - Responsive design for mobile and desktop
 */
const Education = () => (
  <section id="education" className="relative">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <SectionTitle eyebrow="Academic Background" title="Education" />
      
      <div className="space-y-5">
        {/* University of Sydney */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
        >
          <GlassCard className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold">University of Sydney</h3>
                <p className="mt-1 text-white/80">Bachelor of Software Engineering (Honours)</p>
                <p className="mt-2 text-sm text-white/70">
                  <span className="font-medium">Key Units:</span> Systems Programming, Data Structures & Algorithms, Analysis and Design of Web Info Systems, Object-Oriented Programming, Multi-Disciplinary Engineering
                </p>
              </div>
              <div className="text-sm text-white/60 md:text-right">
                <p>Australia</p>
                <p className="mt-1">Expected 2026</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Cambridge International */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          <GlassCard className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold">Cambridge International A & AS Level (AIPS)</h3>
                <p className="mt-1 text-white/80">Muscat, Oman</p>
                <p className="mt-2 text-sm text-white/70">
                  <span className="font-medium">Subjects:</span> Computer Science, Economics, Maths, English, Physics
                </p>
              </div>
              <div className="text-sm text-white/60 md:text-right">
                <p>Completed</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3">Certifications & Awards</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90"><span className="font-medium">IBM (Coursera):</span> Python for Data Science and Artificial Intelligence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90"><span className="font-medium">University of Michigan (Coursera):</span> Python Functions, Files, and Dictionaries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90"><span className="font-medium">SoftSpark Hackathon 2025:</span> Winner - National Bank of Oman Hackathon</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Trophy className="h-5 w-5 text-white/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/90"><span className="font-medium">Dar Al Atta English Writing Competition:</span> 2nd Runner-up</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  </section>
);

/**
 * Contact Component
 * Contact section with form and social links
 * 
 * Features:
 * - Two-column layout (info + form)
 * - Contact form with validation
 * - Social media links
 * - Glassmorphism styling
 * - Responsive design
 * 
 * Form handling:
 * - Currently prevents default submission (no backend integration)
 * - Includes required fields for name and email
 * - Styled to match the overall design system
 */
const Contact = () => (
  <section id="contact" className="relative">
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <SectionTitle eyebrow="Get in touch" title="Let's collaborate" />
      
      <GlassCard className="p-5 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left column: Contact information */}
          <div>
            <p className="text-white/80 text-sm md:text-base">
              Seeking a software engineering internship or entry-level role. Have an idea, project, or opportunity? I'm keen to chat about collaborating in agile teams to deliver high-impact software.
            </p>
            
            {/* Social media links */}
            <div className="mt-5 flex flex-wrap items-center gap-3 text-white/90">
              <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2" href="mailto:narnoli.neil@gmail.com"><Mail className="h-4 w-4"/> narnoli.neil@gmail.com</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2" href="https://github.com/NarNeil" target="_blank" rel="noreferrer"><Github className="h-4 w-4"/> GitHub</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2" href="https://linkedin.com/in/nnarnoli" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4"/> LinkedIn</a>
            </div>
          </div>
          
          {/* Right column: Contact form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3 md:space-y-4">
            {/* Name and Email fields in a row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <input className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:text-white/50" placeholder="Name" required />
              <input type="email" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:text-white/50" placeholder="Email" required />
            </div>
            {/* Subject field */}
            <input className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:text-white/50" placeholder="Subject" />
            {/* Message textarea */}
            <textarea rows={5} className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 outline-none placeholder:text-white/50" placeholder="Message" />
            {/* Submit button */}
            <button className="rounded-xl bg-white text-slate-900 px-5 py-3 font-medium hover:opacity-90">Send</button>
          </form>
        </div>
      </GlassCard>
    </div>
  </section>
);

/**
 * Footer Component
 * Simple footer with copyright and navigation links
 * 
 * Features:
 * - Responsive layout (stacked on mobile, row on desktop)
 * - Dynamic copyright year
 * - Quick navigation links
 * - Consistent styling with the rest of the site
 */
const Footer = () => (
  <footer className="mx-auto max-w-6xl px-4 py-10 text-xs sm:text-sm text-white/60">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Copyright notice with dynamic year */}
      <p>© {new Date().getFullYear()} Neil Narnoli — Crafted with React, Tailwind, Motion & Three.js</p>
      
      {/* Quick navigation links */}
      <div className="flex items-center gap-4">
        <a className="hover:text-white" href="#home">Home</a>
        <a className="hover:text-white" href="#projects">Projects</a>
        <a className="hover:text-white" href="#contact">Contact</a>
      </div>
    </div>
  </footer>
);

/**
 * BackgroundGrid Component
 * Creates subtle background effects for visual depth
 * 
 * Features:
 * - Fixed positioning to cover entire viewport
 * - Radial gradient from top center
 * - Grid pattern overlay
 * - Low opacity for subtle effect
 * - Pointer events disabled to avoid interaction
 * 
 * Technical implementation:
 * - Uses CSS gradients and background patterns
 * - Fixed positioning with negative z-index
 * - Multiple layered effects for depth
 */
const BackgroundGrid = () => (
  <div className="pointer-events-none fixed inset-0 -z-10">
    {/* Radial gradient emanating from top center */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),_transparent_60%)]" />
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(transparent_0,_transparent_calc(100%-1px),rgba(255,255,255,0.06)_calc(100%-1px)),linear-gradient(90deg,transparent_0,_transparent_calc(100%-1px),rgba(255,255,255,0.06)_calc(100%-1px))] bg-[length:120px_120px] opacity-30" />
  </div>
);

/**
 * Custom Hook: useActiveSection
 * Tracks which section is currently most visible in the viewport
 * 
 * Algorithm:
 * 1. Calculates distance from each section's center to viewport center
 * 2. Calculates visibility percentage of each section
 * 3. Combines these metrics to determine the "best" active section
 * 4. Updates on scroll and resize events
 * 
 * @param {string[]} ids - Array of section IDs to track
 * @returns {string} - Currently active section ID
 */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || "home");
  
  useEffect(() => {
    function onScroll() {
      let bestId = ids[0] || "home";
      let bestScore = -Infinity;
      
      // Evaluate each section
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        
        // Distance from section center to viewport center
        const distanceToCenter = Math.abs(center - window.innerHeight / 2);
        
        // How much of the section is visible
        const visibility = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
        
        // Combined score (closer to center + more visible = better)
        const score = -distanceToCenter + visibility * 0.1;
        
        if (score > bestScore) {
          bestScore = score;
          bestId = id;
        }
      }
      setActive(bestId);
    }
    
    // Initial calculation
    onScroll();
    
    // Event listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  
  return active;
}

/**
 * ParticlesOverlay Component
 * Animated particle system that changes color based on active section
 * 
 * Features:
 * - 600 animated particles in 3D space
 * - Color changes based on active section
 * - Burst effect when section changes
 * - Continuous floating animation
 * - Performance optimized with useMemo
 * 
 * Technical implementation:
 * - Uses Three.js Points for efficient particle rendering
 * - Custom animation loop with throttling
 * - Color interpolation for smooth transitions
 * - Boundary wrapping for infinite movement
 */
function ParticlesOverlay({ active }) {
  // Color mapping for each section
  const colorMap = {
    home: "#8b5cf6",      // Purple
    projects: "#22d3ee",  // Cyan
    experience: "#a3e635", // Green
    build: "#f472b6",     // Pink
    education: "#fbbf24", // Amber
    contact: "#60a5fa",   // Blue
  };
  
  const targetColor = colorMap[active] || "#8b5cf6";
  const [burst, setBurst] = useState(0);
  const lastActive = useRef(active);
  
  // Trigger burst effect when section changes
  useEffect(() => {
    if (lastActive.current !== active) {
      lastActive.current = active;
      setBurst(1);
      const t = setTimeout(() => setBurst(0), 1000);
      return () => clearTimeout(t);
    }
  }, [active]);
  
  // Particle configuration
  const count = 600;
  
  // Generate initial particle positions (memoized for performance)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 18; // X position
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y position
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;  // Z position
    }
    return arr;
  }, [count]);
  
  // Generate particle velocities (memoized for performance)
  const velocities = useMemo(() => {
    const v = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      v[i * 3 + 0] = (Math.random() - 0.5) * 0.008; // X velocity (reduced from 0.02)
      v[i * 3 + 1] = 0.008 + Math.random() * 0.012;  // Y velocity (reduced from 0.02 + 0.03)
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.008; // Z velocity (reduced from 0.02)
    }
    return v;
  }, [count]);
  
  const pointsRef = useRef(null);
  const target = useMemo(() => new Color(targetColor), [targetColor]);
  
  // Animation loop function
  const tick = (state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    
    const pos = pts.geometry.attributes.position.array;
    const w = 18, h = 10, d = 8; // Boundary dimensions
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      
      // Apply velocity (constant speed, no boost)
      pos[ix + 0] += velocities[ix + 0];
      pos[ix + 1] += velocities[ix + 1];
      pos[ix + 2] += velocities[ix + 2];
      
      // Boundary wrapping (infinite movement)
      if (pos[ix + 0] > w / 2) pos[ix + 0] = -w / 2;
      if (pos[ix + 0] < -w / 2) pos[ix + 0] = w / 2;
      if (pos[ix + 1] > h / 2) pos[ix + 1] = -h / 2;
      if (pos[ix + 1] < -h / 2) pos[ix + 1] = h / 2;
      if (pos[ix + 2] > d / 2) pos[ix + 2] = -d / 2;
      if (pos[ix + 2] < -d / 2) pos[ix + 2] = d / 2;
    }
    
    // Update geometry and material
    pts.geometry.attributes.position.needsUpdate = true;
    pts.material.size = 0.42; // Constant particle size
    pts.material.color.lerp(target, 0.08); // Smooth color transition
  };
  
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.42} transparent opacity={0.7} depthWrite={false} color={targetColor} />
        </points>
        <FrameUpdater onFrame={tick} />
      </Canvas>
    </div>
  );
}

/**
 * FrameUpdater Component
 * Throttles animation updates to improve performance
 * 
 * Purpose:
 * - Limits animation updates to 50 FPS maximum
 * - Prevents excessive re-renders
 * - Improves performance on lower-end devices
 * 
 * @param {function} onFrame - Animation function to call
 */
function FrameUpdater({ onFrame }) {
  const ref = useRef(0);
  
  useFrame((state, delta) => {
    ref.current += delta;
    
    // Only update every 1/50th of a second (50 FPS)
    if (ref.current > 1 / 50) {
      onFrame(state, ref.current);
      ref.current = 0;
    }
  });
  
  return null; // This component doesn't render anything
}

/**
 * PortfolioSite - Main Application Component
 * 
 * This is the root component that orchestrates the entire portfolio application.
 * It combines all sections, effects, and interactive elements into a cohesive experience.
 * 
 * Architecture:
 * - Uses custom hooks for state management and effects
 * - Integrates 3D graphics with React components
 * - Implements scroll-based animations and interactions
 * - Provides responsive design across all devices
 * 
 * Key Features:
 * - Dynamic particle system that responds to scroll position
 * - Smooth section transitions and animations
 * - Interactive 3D elements with accessibility considerations
 * - Glassmorphism design system throughout
 * - Performance optimizations for smooth 60fps animations
 * 
 * Component Hierarchy:
 * - BackgroundGrid: Subtle background effects
 * - Navbar: Fixed navigation with scroll effects
 * - ParticlesOverlay: Dynamic particle system
 * - Main content sections: Hero, Projects, Experience, Skills, Contact
 * - Footer: Simple footer with links
 */
export default function PortfolioSite() {
  // Track which section is currently active for particle color changes
  const active = useActiveSection(["home", "projects", "experience", "build", "education", "contact"]);
  
  return (
    <div className="min-h-screen bg-[#0f0f16] text-white selection:bg-indigo-500/40">
      {/* Background effects layer */}
      <BackgroundGrid />
      
      {/* Fixed navigation bar */}
      <Navbar activeSection={active} />
      
      {/* Dynamic particle system */}
      <ParticlesOverlay active={active} />
      
      {/* Main content sections */}
      <main>
        <Hero3D />        {/* Hero section with 3D orb and typewriter */}
        <Projects />      {/* Portfolio projects grid */}
        <Experience />    {/* Professional experience timeline */}
        <Skills />        {/* Technical skills organized by category */}
        <Education />     {/* Education and certifications */}
        <Contact />       {/* Contact form and information */}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
