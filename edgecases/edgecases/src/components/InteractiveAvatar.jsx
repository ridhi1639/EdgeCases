// Edge Cases — Interactive Avatar Component with Cursor-Reactive Tilt & Gaze
import React, { useState, useRef, useCallback } from 'react';
import { CyberAvatarArtwork, getAvatarForUser } from './CyberAvatars';

export default function InteractiveAvatar({
  username = '',
  avatarId,
  size = 'md', // 'xs' (24px) | 'sm' (34px) | 'md' (46px) | 'lg' (64px) | 'xl' (92px) | 'hero' (128px)
  status = null, // 'online' | 'idle' | 'busy' | 'battle' | null
  showHalo = true,
  interactive = true,
  onClick,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [lightOffset, setLightOffset] = useState({ x: 50, y: 50 });

  // Resolve avatar ID from explicit prop or username
  const resolvedAvatarId = avatarId || getAvatarForUser(username);

  // Size map in pixels
  const sizeMap = {
    xs: 26,
    sm: 34,
    md: 46,
    lg: 64,
    xl: 92,
    hero: 128,
  };
  const pixelSize = sizeMap[size] || sizeMap.md;

  // Pointer move handler (uses bounding rect for precise local coordinates)
  const handlePointerMove = useCallback((e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    // Subtle 3D tilt: max ±8 degrees
    setTilt({
      x: -normY * 8,
      y: normX * 8,
    });

    // Eye gaze tracking: offset inside artwork
    setGaze({
      x: normX,
      y: normY,
    });

    // Specular lighting position
    const lightX = ((e.clientX - rect.left) / rect.width) * 100;
    const lightY = ((e.clientY - rect.top) / rect.height) * 100;
    setLightOffset({ x: lightX, y: lightY });
  }, [interactive]);

  const handlePointerEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    // Smoothly return to center resting state
    setTilt({ x: 0, y: 0 });
    setGaze({ x: 0, y: 0 });
    setLightOffset({ x: 50, y: 50 });
  };

  // Touch device fallback: tapping triggers momentary reaction
  const handleTouchStart = () => {
    setIsHovered(true);
    setTilt({ x: -4, y: 4 });
    setGaze({ x: 0.5, y: -0.5 });
    setTimeout(() => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setGaze({ x: 0, y: 0 });
    }, 600);
  };

  const statusClass = status ? `status-dot-${status}` : '';

  return (
    <div
      ref={containerRef}
      className={`interactive-avatar-wrap ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        perspective: '400px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        ...style,
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onClick={onClick}
    >
      {/* Halo / Energy Ring on Hover */}
      {showHalo && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            background: isHovered
              ? 'conic-gradient(from 180deg, var(--accent), var(--color-acid), var(--color-violet), var(--accent))'
              : 'transparent',
            opacity: isHovered ? 0.85 : 0,
            filter: 'blur(3px)',
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* 3D Tilting Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#031211',
          border: `1.5px solid ${isHovered ? 'var(--accent)' : 'var(--border-main)'}`,
          boxShadow: isHovered
            ? '0 0 16px rgba(0, 174, 187, 0.4), inset 0 0 10px rgba(0, 174, 187, 0.2)'
            : '0 4px 10px rgba(0, 0, 0, 0.4)',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered
            ? 'transform 0.1s ease-out, border-color 0.2s, box-shadow 0.2s'
            : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s, box-shadow 0.2s',
          zIndex: 1,
        }}
      >
        {/* Dynamic Specular Glare following cursor */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? `radial-gradient(circle at ${lightOffset.x}% ${lightOffset.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`
              : 'none',
            pointerEvents: 'none',
            zIndex: 3,
            transition: 'opacity 0.15s ease',
          }}
        />

        {/* Vector SVG Cyber Character Artwork with Gaze Tracking */}
        <CyberAvatarArtwork
          avatarId={resolvedAvatarId}
          gazeOffset={gaze}
          isAlert={isHovered}
          className="w-full h-full"
        />
      </div>

      {/* Online / Matchmaking Status Badge */}
      {status && (
        <span
          className={`status-dot ${statusClass}`}
          style={{
            position: 'absolute',
            bottom: size === 'xs' || size === 'sm' ? '-1px' : '1px',
            right: size === 'xs' || size === 'sm' ? '-1px' : '1px',
            border: '2px solid #031211',
            zIndex: 4,
          }}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}
