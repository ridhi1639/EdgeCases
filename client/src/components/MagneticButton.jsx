// Edge Cases — Tactile Magnetic Button Component with Energy Glow & Pressed Feedback
import React, { useState, useRef, useCallback } from 'react';
import '../styles/buttons.css';

export default function MagneticButton({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'outline-teal' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  iconRight = null,
  hasEnergyBorder = false,
  className = '',
  onClick,
  disabled = false,
  ...props
}) {
  const buttonRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  // Check if touch device
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handlePointerMove = useCallback((e) => {
    if (isTouchDevice || disabled || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Small controlled magnetic pull (max 5px)
    const pullX = (e.clientX - centerX) * 0.12;
    const pullY = (e.clientY - centerY) * 0.12;

    setOffset({
      x: Math.max(-5, Math.min(5, pullX)),
      y: Math.max(-5, Math.min(5, pullY)),
    });
  }, [isTouchDevice, disabled]);

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsPressed(false);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`btn btn-${variant} btn-${size} ${hasEnergyBorder ? 'energy-border' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px) ${isPressed ? 'scale(0.97)' : 'scale(1)'}`,
        transition: isPressed
          ? 'transform 0.08s ease'
          : 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      {...props}
    >
      {icon && <span className="btn-icon-slot">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="btn-icon-slot">{iconRight}</span>}
    </button>
  );
}
