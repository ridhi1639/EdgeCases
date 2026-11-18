// Edge Cases — "Byte-Zero" The Cybernetic Robotic Debugger Mascot
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Sparkles, X, MessageSquareCode } from 'lucide-react';

const MASCOT_QUIPS = [
  "one edge case away from glory.",
  "your opponent is suspiciously fast.",
  "compile first. panic later.",
  "queue up. coward.",
  "the test cases are plotting against you.",
  "boundary condition detected: [null, undefined, 42].",
  "O(1) in theory, O(n!) at 3 AM.",
  "ready to out-hack the leaderboard?",
];

export default function Mascot({
  isCtaHovered = false,
  className = '',
  onMascotClick,
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [visorEmotion, setVisorEmotion] = useState('idle'); // 'idle' | 'happy' | 'alert' | 'spin' | 'combat'
  const [quipIndex, setQuipIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleKey, setBubbleKey] = useState(0);

  // Sync combat emotion when CTA is hovered
  useEffect(() => {
    if (isCtaHovered) {
      setVisorEmotion('combat');
      setQuipIndex(3); // "queue up. coward."
      setShowBubble(true);
      setBubbleKey((k) => k + 1);
    } else if (!isHovered && !isSpinning) {
      setVisorEmotion('idle');
    }
  }, [isCtaHovered, isHovered, isSpinning]);

  // Pointer movement tracking
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 3)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 3)));

    setRotation({
      x: -normY * 10,
      y: normX * 12,
    });

    setEyeOffset({
      x: normX * 4,
      y: normY * 3,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  // Trigger playful spin and next quip
  const handleMascotClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setVisorEmotion('happy');

    // Cycle quip
    setQuipIndex((prev) => (prev + 1) % MASCOT_QUIPS.length);
    setShowBubble(true);
    setBubbleKey((k) => k + 1);

    if (onMascotClick) onMascotClick();

    setTimeout(() => {
      setIsSpinning(false);
      setVisorEmotion(isHovered ? 'happy' : 'idle');
    }, 650);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    if (!isCtaHovered && !isSpinning) {
      setVisorEmotion('happy');
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!isCtaHovered && !isSpinning) {
      setVisorEmotion('idle');
      setRotation({ x: 0, y: 0 });
      setEyeOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`mascot-stage ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '600px',
        userSelect: 'none',
      }}
    >
      {/* Contextual Floating Speech Bubble */}
      {showBubble && (
        <div
          key={bubbleKey}
          className="mascot-speech-bubble"
          style={{
            position: 'absolute',
            top: '-58px',
            background: 'rgba(7, 26, 24, 0.92)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid var(--accent)',
            boxShadow: '0 8px 24px -4px rgba(0, 174, 187, 0.35)',
            borderRadius: '10px',
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '280px',
            zIndex: 10,
            animation: 'bubble-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformOrigin: 'bottom center',
          }}
        >
          <span style={{ color: 'var(--accent)', display: 'inline-flex', flexShrink: 0 }}>
            <MessageSquareCode size={13} />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            {MASCOT_QUIPS[quipIndex]}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              lineHeight: 1,
            }}
            title="Dismiss"
          >
            <X size={11} />
          </button>
          {/* Bubble Tail */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid var(--accent)',
            }}
          />
        </div>
      )}

      {/* Main Mascot Visual Body Container */}
      <div
        className="mascot-body-wrapper"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleMascotClick}
        style={{
          width: '200px',
          height: '220px',
          cursor: 'pointer',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
            isSpinning ? 'rotate(360deg)' : ''
          }`,
          transition: isSpinning
            ? 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 0.18s ease-out',
        }}
        title="Byte-Zero: Click to talk to your debugger companion"
      >
        {/* Floating Ambient Code Glyphs */}
        <span
          style={{
            position: 'absolute',
            top: '20px',
            left: '-15px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent)',
            opacity: 0.65,
            animation: 'float-slow 3s ease-in-out infinite',
          }}
        >
          {'{ }'}
        </span>
        <span
          style={{
            position: 'absolute',
            top: '80px',
            right: '-20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-acid)',
            opacity: 0.7,
            animation: 'float-slow 3.6s ease-in-out infinite 0.5s',
          }}
        >
          {'null!'}
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '-10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--color-violet)',
            opacity: 0.6,
            animation: 'float-slow 4s ease-in-out infinite 1s',
          }}
        >
          {'O(1)'}
        </span>

        {/* Orbiting Diagnostic Drone */}
        <div
          style={{
            position: 'absolute',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FF5A1F 20%, #12121A 80%)',
            border: '1.5px solid var(--accent)',
            boxShadow: '0 0 14px rgba(255, 90, 31, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '30px',
            right: '10px',
            animation: 'orbit-drone 5s linear infinite',
            zIndex: 3,
          }}
          title="Diagnostic Sub-orb"
        >
          <span style={{ fontSize: '8px', fontFamily: 'monospace', color: '#FFFFFF', fontWeight: 'bold' }}>
            DBG
          </span>
        </div>

        {/* Atmospheric Glow Aura beneath */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '24px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0, 174, 187, 0.45) 0%, transparent 70%)',
            filter: 'blur(8px)',
            animation: 'thruster-glow 2s ease-in-out infinite alternate',
          }}
        />

        {/* Scalable High-Impact Vector SVG Mascot Artwork */}
        <svg
          viewBox="0 0 200 220"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.65))' }}
        >
          {/* Antenna with Electric Spark */}
          <path d="M100 48 L100 24" stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="20" r="4.5" fill="#FF5A1F" />
          <circle
            cx="100"
            cy="20"
            r={isHovered ? '8' : '6'}
            fill="none"
            stroke="#FF5A1F"
            strokeWidth="1.5"
            opacity="0.75"
          >
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Mechanical Floating Body / Head Core */}
          <g style={{ animation: 'bobbing 3s ease-in-out infinite' }}>
            {/* Outer Armor Chassis */}
            <path
              d="M52 74 C52 54 70 46 100 46 C130 46 148 54 148 74 L146 130 C146 146 128 156 100 156 C72 156 54 146 54 130 Z"
              fill="#12121A"
              stroke="#262638"
              strokeWidth="2.5"
            />

            {/* Chamfered Accent Trim Plates */}
            <path
              d="M62 62 L98 54 L136 62 L132 82 L66 82 Z"
              fill="#181824"
              stroke="#FF5A1F"
              strokeWidth="1.5"
            />

            {/* Side Ear Appendages / Audio Ports */}
            <rect x="42" y="86" width="10" height="26" rx="4" fill="#14141E" stroke="#FF5A1F" strokeWidth="1.5" />
            <rect x="148" y="86" width="10" height="26" rx="4" fill="#14141E" stroke="#FF5A1F" strokeWidth="1.5" />

            {/* Glowing Main Visor Screen */}
            <rect
              x="60"
              y="82"
              width="80"
              height="38"
              rx="8"
              fill="#08080C"
              stroke="#FF5A1F"
              strokeWidth="2"
            />

            {/* Interactive Visor Eyes / Emoticons based on Emotion */}
            <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
              {visorEmotion === 'combat' ? (
                // Combat / Competitive visor (> <)
                <g stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M72 96 L82 101 L72 106" />
                  <path d="M128 96 L118 101 L128 106" />
                </g>
              ) : visorEmotion === 'happy' ? (
                // Happy / Excited visor (^ ^)
                <g stroke="#FF5A1F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M70 104 L80 95 L90 104" />
                  <path d="M110 104 L120 95 L130 104" />
                </g>
              ) : (
                // Idle / Looking visor (Curious glowing rectangles with pupils)
                <>
                  <rect x="70" y="93" width="18" height="15" rx="4" fill="#FF5A1F" />
                  <circle cx="78" cy="100.5" r="3" fill="#FFFFFF" />
                  <rect x="112" y="93" width="18" height="15" rx="4" fill="#FF5A1F" />
                  <circle cx="120" cy="100.5" r="3" fill="#FFFFFF" />
                  {/* Subtle scanline line in visor */}
                  <line x1="62" y1="101" x2="138" y2="101" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" />
                </>
              )}
            </g>

            {/* Chest Badge / Power Core (Edge Cases Crest) */}
            <circle cx="100" cy="138" r="8" fill="#08080C" stroke="#FF5A1F" strokeWidth="1.5" />
            <polygon points="100,133 105,142 95,142" fill="#FF5A1F" />

            {/* Mechanical Thruster Exhaust Ring */}
            <ellipse cx="100" cy="162" rx="28" ry="8" fill="#181824" stroke="#FF5A1F" strokeWidth="1.5" />
            {/* Plasma Flame */}
            <path
              d="M84 165 Q100 195 116 165 Z"
              fill="url(#plasmaGradient)"
              opacity="0.9"
            >
              <animate
                attributeName="d"
                values="M84 165 Q100 195 116 165 Z; M86 165 Q100 205 114 165 Z; M84 165 Q100 195 116 165 Z"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="plasmaGradient" x1="100" y1="165" x2="100" y2="205" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5A1F" />
              <stop offset="0.6" stopColor="#FF9E2C" />
              <stop offset="1" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mascot Label Tag */}
      <div
        style={{
          marginTop: '6px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '3px 10px',
          background: 'rgba(7, 26, 24, 0.7)',
          border: '1px solid var(--border-main)',
          borderRadius: '999px',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
        }}
      >
        <span className="status-dot status-dot-online" />
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>BYTE-ZERO</span>
        <span style={{ color: 'var(--text-muted)' }}>// AI DEBUGGER</span>
      </div>

      {/* Embedded CSS animations */}
      <style>{`
        @keyframes bobbing {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(4deg); }
        }
        @keyframes orbit-drone {
          0% { transform: rotate(0deg) translateX(36px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(36px) rotate(-360deg); }
        }
        @keyframes thruster-glow {
          0% { opacity: 0.4; transform: translateX(-50%) scale(0.9); }
          100% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }
        @keyframes bubble-pop {
          0% { opacity: 0; transform: scale(0.7) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
