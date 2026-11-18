// Edge Cases — Pointer-Reactive Spotlight Card with Clipped Dynamic Lighting
import React, { useState, useRef, useCallback } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 90, 31, 0.15)',
  borderColor = 'rgba(255, 90, 31, 0.38)',
  style = {},
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handlePointerEnter = () => {
    setOpacity(1);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-main)',
        borderRadius: 'var(--radius-lg)',
        transition: 'border-color 0.25s ease, transform 0.2s ease',
        ...style,
      }}
      {...props}
    >
      {/* Dynamic Radial Spotlight clipped to card */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          transition: 'opacity 0.25s ease',
          zIndex: 0,
        }}
      />
      {/* Subtle Dynamic Border glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity,
          border: `1px solid ${borderColor}`,
          borderRadius: 'inherit',
          transition: 'opacity 0.25s ease',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
