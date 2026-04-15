import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Pickleball3D from './Pickleball3D';

/**
 * Ambient floating 3D balls for section backgrounds.
 * count: number of balls, maxSize: largest ball px
 */
export default function FloatingOrbs({ count = 4, maxSize = 90, gold = false, className = '' }) {
  const orbs = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size:   maxSize * (0.45 + Math.random() * 0.55),
      x:      5  + Math.random() * 90,        // % from left
      y:      5  + Math.random() * 90,        // % from top
      dur:    5  + Math.random() * 6,
      delay:  Math.random() * 3,
      yAmp:   10 + Math.random() * 20,
      xAmp:   6  + Math.random() * 14,
      rot:    Math.random() * 360,
      spin:   (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
      opacity: 0.10 + Math.random() * 0.14,
      gold:   gold || Math.random() > 0.65,
    })),
  [count, maxSize, gold]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {orbs.map(o => (
        <motion.div
          key={o.id}
          className="absolute"
          style={{
            left:    `${o.x}%`,
            top:     `${o.y}%`,
            opacity: o.opacity,
          }}
          animate={{
            y:      [0, -o.yAmp, 0],
            x:      [0, o.xAmp, 0],
            rotate: [o.rot, o.rot + o.spin],
          }}
          transition={{
            y:      { duration: o.dur,      repeat: Infinity, ease: 'easeInOut',  delay: o.delay },
            x:      { duration: o.dur * 1.3, repeat: Infinity, ease: 'easeInOut', delay: o.delay * 0.5 },
            rotate: { duration: o.dur * 4,  repeat: Infinity, ease: 'linear',    delay: 0 },
          }}
        >
          <Pickleball3D size={o.size} gold={o.gold} />
        </motion.div>
      ))}
    </div>
  );
}
