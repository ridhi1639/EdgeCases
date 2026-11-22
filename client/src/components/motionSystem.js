// Edge Cases — Reusable Motion Variants & Transitions
export const transitions = {
  springFast: { type: 'spring', stiffness: 400, damping: 28 },
  springSmooth: { type: 'spring', stiffness: 260, damping: 22 },
  springBouncy: { type: 'spring', stiffness: 350, damping: 18 },
  easeFast: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
  easeSmooth: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
};

export const motionVariants = {
  // Fade in and slide up
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.easeSmooth,
    },
  },

  // Stagger container
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  },

  // Modal scale & fade
  modalScale: {
    hidden: { opacity: 0, scale: 0.94, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: transitions.springSmooth,
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: transitions.easeFast,
    },
  },

  // Drawer slide from right
  drawerSlideRight: {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.springSmooth,
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: transitions.easeFast,
    },
  },

  // Card hover lift
  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -3,
      scale: 1.01,
      transition: transitions.springFast,
    },
  },
};
