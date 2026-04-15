import React from 'react';
import { motion } from 'framer-motion';

/**
 * Photo-realistic SVG 3D pickleball.
 * Props: size (number), spin (bool), glow (bool), gold (bool), className
 */
export default function Pickleball3D({
  size = 220,
  spin = false,
  glow = false,
  gold = false,
  float = false,
  className = '',
  style = {},
}) {
  const R  = 180;           // sphere radius in viewBox
  const cx = 200;
  const cy = 200;

  // Brand colours — green or gold variant
  const col = gold
    ? { mid: '#c8920e', dark: '#7a5506', edge: '#2d1a00', light: '#f0c040', rim: '#e0aa20' }
    : { mid: '#2d8f63', dark: '#0f3d2a', edge: '#061a10', light: '#7dcba7', rim: '#1e6e4c' };

  /* ── Hole positions (approximated sphere projection) ───────────── */
  const holes = [
    // row y=90  (near top, foreshortened small)
    { x: 148, y:  92, r: 6.5 }, { x: 200, y:  83, r: 6 }, { x: 252, y:  92, r: 6.5 },

    // row y=125
    { x: 112, y: 122, r: 7.5 }, { x: 155, y: 115, r: 7.5 }, { x: 200, y: 112, r: 7 },
    { x: 245, y: 115, r: 7.5 }, { x: 288, y: 122, r: 7.5 },

    // row y=158
    { x:  88, y: 156, r: 8.5 }, { x: 128, y: 148, r: 8.5 }, { x: 170, y: 144, r: 8 },
    { x: 213, y: 143, r: 8 },   { x: 255, y: 148, r: 8.5 }, { x: 296, y: 157, r: 8.5 },

    // row y=193  (near equator, full size)
    { x:  80, y: 192, r: 9 },   { x: 119, y: 185, r: 9 },   { x: 161, y: 181, r: 8.5 },
    { x: 200, y: 180, r: 8.5 }, { x: 239, y: 181, r: 8.5 }, { x: 281, y: 185, r: 9 },
    { x: 320, y: 192, r: 9 },

    // row y=228
    { x:  84, y: 228, r: 8.5 }, { x: 124, y: 221, r: 8.5 }, { x: 165, y: 218, r: 8 },
    { x: 200, y: 217, r: 8 },   { x: 235, y: 218, r: 8 },   { x: 276, y: 221, r: 8.5 },
    { x: 316, y: 228, r: 8.5 },

    // row y=262
    { x:  92, y: 262, r: 7.5 }, { x: 132, y: 255, r: 8 },   { x: 174, y: 252, r: 7.5 },
    { x: 213, y: 252, r: 7.5 }, { x: 255, y: 255, r: 8 },   { x: 295, y: 263, r: 7.5 },

    // row y=295
    { x: 113, y: 294, r: 6.5 }, { x: 154, y: 289, r: 7 },   { x: 200, y: 288, r: 6.5 },
    { x: 246, y: 289, r: 7 },   { x: 287, y: 294, r: 6.5 },

    // row y=320 (near bottom)
    { x: 152, y: 318, r: 5.5 }, { x: 200, y: 316, r: 5 },   { x: 248, y: 318, r: 5.5 },
  ];

  /* ── Seam path (sinusoidal band around equator) ─────────────────── */
  const seamPoints = [];
  for (let i = 0; i <= 72; i++) {
    const t   = (i / 72) * Math.PI * 2;
    const ang = (i / 72) * Math.PI;         // 0→π for the front hemisphere
    const xv  = cx - R * Math.cos(ang);
    // Sine wave offset
    const yv  = cy + 22 * Math.sin(t * 2 + 0.5);
    seamPoints.push(`${i === 0 ? 'M' : 'L'}${xv.toFixed(1)},${yv.toFixed(1)}`);
  }
  const seamD = seamPoints.join(' ');

  // Second seam (90° offset)
  const seam2Points = [];
  for (let i = 0; i <= 72; i++) {
    const ang = (i / 72) * Math.PI;
    const xv  = cx - R * Math.cos(ang);
    const yv  = cy + 22 * Math.sin((i / 72) * Math.PI * 2 + Math.PI + 0.5);
    seam2Points.push(`${i === 0 ? 'M' : 'L'}${xv.toFixed(1)},${yv.toFixed(1)}`);
  }
  const seam2D = seam2Points.join(' ');

  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size, ...style }}
      animate={
        spin  ? { rotate: 360 }                          :
        float ? { y: [-14, 14, -14] }                    :
        {}
      }
      transition={
        spin  ? { duration: 14, repeat: Infinity, ease: 'linear' }                :
        float ? { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' } :
        {}
      }
    >
      <svg
        viewBox="0 0 400 420"
        width={size}
        height={size * (420 / 400)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Main sphere gradient: light top-left → dark bottom-right */}
          <radialGradient id={`sphere-${size}`} cx="34%" cy="28%" r="70%">
            <stop offset="0%"   stopColor={col.light} />
            <stop offset="30%"  stopColor={col.mid}   />
            <stop offset="70%"  stopColor={col.dark}  />
            <stop offset="100%" stopColor={col.edge}  />
          </radialGradient>

          {/* ── Rim highlight band */}
          <radialGradient id={`rim-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="82%" stopColor="transparent" />
            <stop offset="95%" stopColor={col.rim} stopOpacity="0.35" />
            <stop offset="100%" stopColor="black" stopOpacity="0.55" />
          </radialGradient>

          {/* ── Specular highlight (bright spot top-left) */}
          <radialGradient id={`spec-${size}`} cx="30%" cy="22%" r="28%">
            <stop offset="0%"   stopColor="white"  stopOpacity="0.75" />
            <stop offset="60%"  stopColor="white"  stopOpacity="0.15" />
            <stop offset="100%" stopColor="white"  stopOpacity="0"    />
          </radialGradient>

          {/* ── Secondary soft fill for depth */}
          <radialGradient id={`fill2-${size}`} cx="65%" cy="70%" r="40%">
            <stop offset="0%"   stopColor={col.light} stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* ── Hole inner gradient for depth */}
          <radialGradient id={`hole-${size}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#1a3a28" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000"    stopOpacity="0.9" />
          </radialGradient>

          {/* ── Glow filter */}
          {glow && (
            <filter id={`glow-${size}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          )}

          {/* ── Clip to sphere shape */}
          <clipPath id={`clip-${size}`}>
            <circle cx={cx} cy={cy} r={R} />
          </clipPath>

          {/* ── Shadow gradient */}
          <radialGradient id={`shadow-${size}`} cx="50%" cy="30%" r="50%">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.55)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)"    />
          </radialGradient>
        </defs>

        {/* ── Ground shadow */}
        <ellipse
          cx={cx} cy={400} rx={R * 0.72} ry={R * 0.1}
          fill="rgba(0,0,0,0.18)"
          style={{ filter: 'blur(8px)' }}
        />

        {/* ── Sphere base */}
        <circle
          cx={cx} cy={cy} r={R}
          fill={`url(#sphere-${size})`}
          filter={glow ? `url(#glow-${size})` : undefined}
        />

        {/* ── Secondary fill for depth illusion */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#fill2-${size})`} />

        {/* ── Holes (clipped inside sphere) */}
        <g clipPath={`url(#clip-${size})`}>
          {holes.map((h, i) => (
            <g key={i}>
              {/* Hole shadow ring */}
              <circle
                cx={h.x + 1.2} cy={h.y + 1.5}
                r={h.r + 1.5}
                fill="rgba(0,0,0,0.25)"
              />
              {/* Hole opening */}
              <circle
                cx={h.x} cy={h.y}
                r={h.r}
                fill={`url(#hole-${size})`}
              />
              {/* Tiny inner highlight */}
              <circle
                cx={h.x - h.r * 0.35} cy={h.y - h.r * 0.35}
                r={h.r * 0.28}
                fill="rgba(255,255,255,0.08)"
              />
            </g>
          ))}

          {/* ── Seam lines */}
          <path d={seamD}  stroke="rgba(255,255,255,0.14)" strokeWidth="2.5" fill="none" />
          <path d={seam2D} stroke="rgba(255,255,255,0.10)" strokeWidth="2"   fill="none" />
        </g>

        {/* ── Rim darkening */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#rim-${size})`} />

        {/* ── Specular highlight */}
        <circle cx={cx} cy={cy} r={R} fill={`url(#spec-${size})`} />

        {/* ── Surface gloss streak */}
        <ellipse
          cx={cx - 42} cy={cy - 58}
          rx={32} ry={14}
          fill="white" fillOpacity="0.12"
          transform={`rotate(-28,${cx - 42},${cy - 58})`}
          clipPath={`url(#clip-${size})`}
        />
      </svg>
    </motion.div>
  );
}
