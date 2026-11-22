// Edge Cases — Cyber Avatars Vector System
// Coherent, original, stylized cyber character designs with glowing visors & interactive gaze
import React from 'react';

/**
 * Avatar IDs and Metadata
 */
export const AVATAR_PROFILES = {
  dev_kiran: {
    id: 'cyber_ronin',
    name: 'Ronin-01',
    title: 'Precision Blade',
    accentColor: '#00AEBB',
    secondaryColor: '#EBE4D3',
    glowColor: 'rgba(0, 174, 187, 0.5)',
  },
  algo_rythm: {
    id: 'synth_soundwave',
    name: 'Wave-9',
    title: 'Audio Synthesizer',
    accentColor: '#A3E635',
    secondaryColor: '#00AEBB',
    glowColor: 'rgba(163, 230, 53, 0.5)',
  },
  null_pointer: {
    id: 'null_specter',
    name: 'Void-X',
    title: 'Memory Wraith',
    accentColor: '#A78BFA',
    secondaryColor: '#FB7185',
    glowColor: 'rgba(167, 139, 250, 0.5)',
  },
  bit_wizard: {
    id: 'arch_mage',
    name: 'Archon-7',
    title: 'Grandmaster Shaman',
    accentColor: '#00AEBB',
    secondaryColor: '#A3E635',
    glowColor: 'rgba(0, 174, 187, 0.6)',
  },
  edge_hunter: {
    id: 'recon_sniper',
    name: 'Viper-3',
    title: 'Boundary Tracker',
    accentColor: '#F59E0B',
    secondaryColor: '#FB7185',
    glowColor: 'rgba(245, 158, 11, 0.5)',
  },
  syntax_samurai: {
    id: 'steel_blade',
    name: 'Kage-88',
    title: 'Syntax Enforcer',
    accentColor: '#00AEBB',
    secondaryColor: '#A78BFA',
    glowColor: 'rgba(0, 174, 187, 0.5)',
  },
  memory_leak: {
    id: 'glitch_bot',
    name: 'Leak-404',
    title: 'Corrupted Engine',
    accentColor: '#FB7185',
    secondaryColor: '#A78BFA',
    glowColor: 'rgba(251, 113, 133, 0.5)',
  },
  stack_overflow: {
    id: 'reactor_core',
    name: 'Forge-02',
    title: 'Overclocked Unit',
    accentColor: '#F59E0B',
    secondaryColor: '#A3E635',
    glowColor: 'rgba(245, 158, 11, 0.5)',
  },
  zero_day: {
    id: 'stealth_operative',
    name: 'Ghost-00',
    title: 'Infiltration AI',
    accentColor: '#00AEBB',
    secondaryColor: '#EBE4D3',
    glowColor: 'rgba(0, 174, 187, 0.5)',
  },
  byte_storm: {
    id: 'quantum_drone',
    name: 'Pulse-V',
    title: 'Subroutine Spark',
    accentColor: '#A78BFA',
    secondaryColor: '#00AEBB',
    glowColor: 'rgba(167, 139, 250, 0.5)',
  },
};

/**
 * High-quality vector SVG renderer for Cyber Character Avatars
 * Supports gazeOffset { x: -1 to 1, y: -1 to 1 } for responsive eyes
 */
export function CyberAvatarArtwork({
  avatarId = 'cyber_ronin',
  gazeOffset = { x: 0, y: 0 },
  isAlert = false,
  className = '',
}) {
  const gx = (gazeOffset.x || 0) * 4;
  const gy = (gazeOffset.y || 0) * 3;

  switch (avatarId) {
    case 'algo_rythm':
    case 'synth_soundwave':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#041B18" stroke="#123B36" strokeWidth="2" />
          <path d="M26 36 L50 20 L74 36 L70 78 L50 86 L30 78 Z" fill="#072924" stroke="#174E47" strokeWidth="1.5" />
          {/* Headphones */}
          <rect x="18" y="42" width="8" height="20" rx="3" fill="#0C3B34" stroke="#A3E635" strokeWidth="1.2" />
          <rect x="74" y="42" width="8" height="20" rx="3" fill="#0C3B34" stroke="#A3E635" strokeWidth="1.2" />
          <path d="M22 42 C22 24 78 24 78 42" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />
          {/* Waveform Visor */}
          <rect x="30" y="42" width="40" height="16" rx="4" fill="#031614" stroke="#A3E635" strokeWidth="1.5" />
          <g transform={`translate(${gx}, ${gy})`}>
            <path d="M34 50 L38 46 L42 54 L46 44 L50 56 L54 47 L58 53 L62 48 L66 50" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Chin vent */}
          <line x1="44" y1="68" x2="56" y2="68" stroke="#174E47" strokeWidth="2" strokeLinecap="round" />
          <line x1="46" y1="72" x2="54" y2="72" stroke="#174E47" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'null_pointer':
    case 'null_specter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#090E1F" stroke="#1E2746" strokeWidth="2" />
          {/* Hood */}
          <path d="M50 14 C30 14 20 34 22 76 L50 86 L78 76 C80 34 70 14 50 14 Z" fill="#11172E" stroke="#2D3A63" strokeWidth="1.5" />
          {/* Inner void shadow */}
          <path d="M50 28 C36 28 30 42 32 68 L50 74 L68 68 C70 42 64 28 50 28 Z" fill="#040714" />
          {/* Glowing Single Cyber Monocle / Scanner Eye */}
          <g transform={`translate(${gx * 1.2}, ${gy * 1.2})`}>
            <ellipse cx="50" cy="48" rx="10" ry="10" fill="rgba(167, 139, 250, 0.2)" />
            <circle cx="50" cy="48" r="6" fill="#A78BFA" />
            <circle cx="50" cy="48" r="2.5" fill="#FFFFFF" />
            <line x1="36" y1="48" x2="64" y2="48" stroke="#A78BFA" strokeWidth="0.75" strokeDasharray="2 2" />
          </g>
          {/* Tech Sigils */}
          <path d="M46 62 L50 66 L54 62" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'bit_wizard':
    case 'arch_mage':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#031615" stroke="#0C3E3A" strokeWidth="2" />
          {/* Circlet / Crown */}
          <path d="M26 40 L38 22 L50 32 L62 22 L74 40 L70 76 L50 86 L30 76 Z" fill="#082A26" stroke="#00AEBB" strokeWidth="1.5" />
          <polygon points="50,18 53,24 59,25 54,29 56,35 50,32 44,35 46,29 41,25 47,24" fill="#00AEBB" />
          {/* Dual Visor Eyes */}
          <g transform={`translate(${gx}, ${gy})`}>
            <rect x="34" y="46" width="12" height="6" rx="2" fill="#00AEBB" />
            <circle cx="40" cy="49" r="1.5" fill="#FFFFFF" />
            <rect x="54" y="46" width="12" height="6" rx="2" fill="#00AEBB" />
            <circle cx="60" cy="49" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Energy core in forehead */}
          <circle cx="50" cy="36" r="3" fill="#A3E635" />
          {/* Binary beard lines */}
          <line x1="42" y1="62" x2="42" y2="70" stroke="#00AEBB" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="50" y1="62" x2="50" y2="74" stroke="#A3E635" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="58" y1="62" x2="58" y2="70" stroke="#00AEBB" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'edge_hunter':
    case 'recon_sniper':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#1C1304" stroke="#422E0D" strokeWidth="2" />
          {/* Tactical Helmet */}
          <path d="M28 32 L50 18 L72 32 L74 74 L50 84 L26 74 Z" fill="#2E1F09" stroke="#F59E0B" strokeWidth="1.5" />
          {/* Targeting Scope / Eye */}
          <rect x="32" y="42" width="36" height="16" rx="3" fill="#140D04" stroke="#784E0C" strokeWidth="1.2" />
          <g transform={`translate(${gx * 1.4}, ${gy * 1.4})`}>
            <circle cx="45" cy="50" r="6" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="45" y1="41" x2="45" y2="59" stroke="#F59E0B" strokeWidth="1" />
            <line x1="36" y1="50" x2="54" y2="50" stroke="#F59E0B" strokeWidth="1" />
            <circle cx="45" cy="50" r="2" fill="#FB7185" />
            <rect x="56" y="47" width="8" height="6" rx="1" fill="#F59E0B" opacity="0.8" />
          </g>
          {/* Filter respirator */}
          <circle cx="50" cy="70" r="7" fill="#1A1206" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="50" cy="70" r="3" fill="#F59E0B" />
        </svg>
      );

    case 'syntax_samurai':
    case 'steel_blade':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#051717" stroke="#0E3634" strokeWidth="2" />
          {/* Kabuto Crest */}
          <path d="M50 12 L56 26 L44 26 Z" fill="#00AEBB" />
          <path d="M24 38 L50 24 L76 38 L72 78 L50 86 L28 78 Z" fill="#0B2B29" stroke="#16514D" strokeWidth="1.5" />
          {/* Face Armor Plate */}
          <path d="M34 44 L50 38 L66 44 L64 64 L50 72 L36 64 Z" fill="#041817" stroke="#00AEBB" strokeWidth="1.2" />
          {/* Slit Visor */}
          <g transform={`translate(${gx}, ${gy})`}>
            <line x1="38" y1="52" x2="48" y2="52" stroke="#00AEBB" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="52" y1="52" x2="62" y2="52" stroke="#00AEBB" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Neck Guard */}
          <path d="M32 76 L50 82 L68 76" stroke="#00AEBB" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'memory_leak':
    case 'glitch_bot':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#1F080F" stroke="#481423" strokeWidth="2" />
          {/* Distorted Chassis */}
          <path d="M26 34 L48 20 L74 30 L72 74 L52 86 L30 76 Z" fill="#2E0C17" stroke="#FB7185" strokeWidth="1.5" />
          {/* Glitch shift artifact */}
          <rect x="22" y="44" width="14" height="4" fill="#A78BFA" opacity="0.6" />
          <rect x="66" y="56" width="14" height="4" fill="#00AEBB" opacity="0.6" />
          {/* Broken Asymmetrical Eyes */}
          <g transform={`translate(${gx}, ${gy})`}>
            <polygon points="36,46 44,44 42,54 34,52" fill="#FB7185" />
            <circle cx="60" cy="50" r="5" fill="#A78BFA" />
            <circle cx="60" cy="50" r="2" fill="#FFFFFF" />
          </g>
          {/* Error matrix text */}
          <text x="35" y="72" fill="#FB7185" fontSize="7" fontFamily="monospace" fontWeight="bold">0x404</text>
        </svg>
      );

    case 'stack_overflow':
    case 'reactor_core':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#1C1504" stroke="#45330B" strokeWidth="2" />
          {/* Heavy Blocky Mech Head */}
          <rect x="26" y="24" width="48" height="54" rx="8" fill="#2C2108" stroke="#F59E0B" strokeWidth="1.8" />
          {/* Top vents */}
          <rect x="34" y="18" width="8" height="6" rx="2" fill="#F59E0B" />
          <rect x="58" y="18" width="8" height="6" rx="2" fill="#F59E0B" />
          {/* Main Glow Visor */}
          <rect x="32" y="38" width="36" height="14" rx="4" fill="#120E03" stroke="#F59E0B" strokeWidth="1.2" />
          <g transform={`translate(${gx}, ${gy})`}>
            <circle cx="42" cy="45" r="4" fill="#F59E0B" />
            <circle cx="42" cy="45" r="1.5" fill="#FFFFFF" />
            <circle cx="58" cy="45" r="4" fill="#F59E0B" />
            <circle cx="58" cy="45" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Radiation / Steam Grille */}
          <line x1="36" y1="62" x2="64" y2="62" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="68" x2="60" y2="68" stroke="#A3E635" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'zero_day':
    case 'stealth_operative':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#041514" stroke="#0F3836" strokeWidth="2" />
          <path d="M30 30 L50 20 L70 30 L68 74 L50 84 L32 74 Z" fill="#082220" stroke="#00AEBB" strokeWidth="1.5" />
          {/* Cyber Goggles with Quad Sensors */}
          <rect x="30" y="40" width="40" height="18" rx="4" fill="#02100F" stroke="#164A47" strokeWidth="1.5" />
          <g transform={`translate(${gx * 1.2}, ${gy * 1.2})`}>
            <circle cx="38" cy="49" r="4" fill="#00AEBB" />
            <circle cx="38" cy="49" r="1.5" fill="#FFFFFF" />
            <circle cx="50" cy="46" r="2.5" fill="#A3E635" />
            <circle cx="62" cy="49" r="4" fill="#00AEBB" />
            <circle cx="62" cy="49" r="1.5" fill="#FFFFFF" />
          </g>
          {/* Tactical audio filter */}
          <path d="M42 68 L50 72 L58 68" stroke="#00AEBB" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'byte_storm':
    case 'quantum_drone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#0C0D24" stroke="#212457" strokeWidth="2" />
          {/* Halo Ring */}
          <ellipse cx="50" cy="24" rx="22" ry="7" stroke="#A78BFA" strokeWidth="1.5" fill="none" />
          {/* Diamond Chassis */}
          <polygon points="50,22 74,48 50,82 26,48" fill="#15173B" stroke="#A78BFA" strokeWidth="1.5" />
          {/* Core Eye */}
          <g transform={`translate(${gx * 1.5}, ${gy * 1.5})`}>
            <polygon points="50,40 60,48 50,56 40,48" fill="#00AEBB" />
            <circle cx="50" cy="48" r="3" fill="#FFFFFF" />
          </g>
          {/* Orbiting Quantum Bits */}
          <circle cx="32" cy="62" r="2" fill="#A78BFA" />
          <circle cx="68" cy="62" r="2" fill="#00AEBB" />
        </svg>
      );

    case 'cyber_ronin':
    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ambient background */}
          <circle cx="50" cy="50" r="46" fill="#051B19" stroke="#0E423E" strokeWidth="2" />
          {/* Antenna / Crest */}
          <path d="M50 12 L50 24" stroke="#00AEBB" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="11" r="2.5" fill="#00AEBB" />
          {/* Head Armor Helmet */}
          <path d="M28 36 L50 22 L72 36 L70 76 L50 86 L30 76 Z" fill="#092E2A" stroke="#165B54" strokeWidth="1.5" />
          {/* Visor Area */}
          <path d="M32 42 L50 36 L68 42 L66 60 L50 66 L34 60 Z" fill="#031615" stroke="#00AEBB" strokeWidth="1.5" />
          {/* Glowing Visor Eye Trackers */}
          <g transform={`translate(${gx}, ${gy})`}>
            {isAlert ? (
              // Excited/Alert visor
              <path d="M38 51 L44 46 L48 51 M52 51 L56 46 L62 51" stroke="#00AEBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <rect x="36" y="47" width="11" height="7" rx="2" fill="#00AEBB" />
                <circle cx="41.5" cy="50.5" r="1.5" fill="#EBE4D3" />
                <rect x="53" y="47" width="11" height="7" rx="2" fill="#00AEBB" />
                <circle cx="58.5" cy="50.5" r="1.5" fill="#EBE4D3" />
              </>
            )}
          </g>
          {/* Mouth Guard / Tech Grille */}
          <line x1="43" y1="72" x2="57" y2="72" stroke="#00AEBB" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="45" y1="76" x2="55" y2="76" stroke="#165B54" strokeWidth="1.8" strokeLinecap="round" />
          {/* Cheek Decals */}
          <path d="M28 54 L32 58" stroke="#00AEBB" strokeWidth="1.2" />
          <path d="M72 54 L68 58" stroke="#00AEBB" strokeWidth="1.2" />
        </svg>
      );
  }
}

/**
 * Helper to get avatar ID for any username or player object
 */
export function getAvatarForUser(username) {
  if (!username) return 'cyber_ronin';
  const clean = username.toLowerCase().replace('@', '');
  if (AVATAR_PROFILES[clean]) return AVATAR_PROFILES[clean].id;
  // Deterministic hash assignment for any unknown username
  const avatars = [
    'cyber_ronin',
    'synth_soundwave',
    'null_specter',
    'arch_mage',
    'recon_sniper',
    'steel_blade',
    'glitch_bot',
    'reactor_core',
    'stealth_operative',
    'quantum_drone',
  ];
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  return avatars[Math.abs(hash) % avatars.length];
}
