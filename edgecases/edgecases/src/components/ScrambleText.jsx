// Edge Cases — Cyberpunk ScrambleText Component with Decoding Animation & Viewport Triggers
import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________01ABCDEF';

export default function ScrambleText({
  children,
  text: explicitText,
  duration = 1.0,
  delay = 0,
  scrambleSpeed = 35,
  characterSet = DEFAULT_CHARS,
  triggerOnView = true,
  scrambleOnHover = false,
  as: Component = 'span',
  className = '',
  style = {},
  ...props
}) {
  const targetText = explicitText || (typeof children === 'string' ? children : '');
  const [displayText, setDisplayText] = useState(targetText);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Check for prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runScramble = () => {
    if (prefersReducedMotion || !targetText) {
      setDisplayText(targetText);
      return;
    }

    const length = targetText.length;
    const totalSteps = Math.max(12, Math.floor((duration * 1000) / scrambleSpeed));
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const revealedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (targetText[i] === ' ' || targetText[i] === '\n') {
          result += targetText[i];
        } else if (i < revealedCount) {
          result += targetText[i];
        } else {
          const randomIndex = Math.floor(Math.random() * characterSet.length);
          result += characterSet[randomIndex];
        }
      }

      setDisplayText(result);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDisplayText(targetText);
        setHasAnimated(true);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (!targetText) return;
    if (prefersReducedMotion) {
      setDisplayText(targetText);
      return;
    }

    if (!triggerOnView) {
      const timer = setTimeout(runScramble, delay * 1000);
      return () => clearTimeout(timer);
    }

    // Trigger when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(runScramble, delay * 1000);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetText, delay, triggerOnView, prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      runScramble();
    }
  };

  return (
    <Component
      ref={elementRef}
      className={`scramble-text ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        display: 'inline-block',
        fontFeatureSettings: "'tnum' on",
        ...style,
      }}
      {...props}
    >
      {displayText}
    </Component>
  );
}
