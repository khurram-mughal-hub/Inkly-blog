// Premium animation variants for Framer Motion
// Inkly Magazine-Quality Animations

// Fade in animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
}

export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

// Scale animations
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

export const scaleUp = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.4, ease: "easeOut" }
}

// Slide animations
export const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

export const slideUp = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

// Stagger container for children animations
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
}

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Stagger item (for children in stagger container)
export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

// Card hover animations
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { scale: 0.98 }
}

export const cardHoverSubtle = {
  rest: { 
    scale: 1,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)"
  },
  hover: { 
    scale: 1.01,
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    transition: { duration: 0.2, ease: "easeOut" }
  }
}

// Image hover zoom
export const imageZoom = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const imageZoomSubtle = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

// Text reveal animation
export const textReveal = {
  initial: { 
    opacity: 0, 
    y: 20,
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

// Character by character reveal
export const letterAnimation = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

// Blur in animation
export const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.6 }
  }
}

// Gradient shift animation
export const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      ease: "linear",
      repeat: Infinity
    }
  }
}

// Floating animation
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
}

// Pulse animation
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
}

// Button hover
export const buttonHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.95 }
}

// Link underline animation
export const linkUnderline = {
  rest: { scaleX: 0, originX: 0 },
  hover: { 
    scaleX: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
}

// Modal/overlay animations
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const modalContent = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
}

// Navbar scroll animation
export const navbarHidden = {
  initial: { y: 0 },
  hidden: { y: "-100%", transition: { duration: 0.3 } },
  visible: { y: 0, transition: { duration: 0.3 } }
}

// Progress bar
export const progressBar = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1 }
}

// Reveal on scroll (for use with whileInView)
export const revealOnScroll = {
  initial: { opacity: 0, y: 75 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  viewport: { once: true, margin: "-100px" }
}

// Spring physics presets
export const springConfig = {
  gentle: { type: "spring", stiffness: 120, damping: 14 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  stiff: { type: "spring", stiffness: 300, damping: 30 },
  slow: { type: "spring", stiffness: 100, damping: 20 }
}

// Utility function to create custom animation
export const createAnimation = (from, to, config = {}) => ({
  initial: from,
  animate: to,
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], ...config }
})

// Counter animation helper
export const useCountUp = (end, duration = 2000) => {
  return {
    initial: { count: 0 },
    animate: { 
      count: end,
      transition: { duration: duration / 1000, ease: "easeOut" }
    }
  }
}

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleUp,
  slideIn,
  slideUp,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  staggerItem,
  cardHover,
  cardHoverSubtle,
  imageZoom,
  imageZoomSubtle,
  textReveal,
  letterAnimation,
  blurIn,
  gradientShift,
  float,
  pulse,
  buttonHover,
  linkUnderline,
  pageTransition,
  modalOverlay,
  modalContent,
  navbarHidden,
  progressBar,
  revealOnScroll,
  springConfig,
  createAnimation
}
