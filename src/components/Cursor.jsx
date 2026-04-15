import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(mx, { stiffness: 800, damping: 40 });
  const dotY = useSpring(my, { stiffness: 800, damping: 40 });

  // Ring follows with a soft lag
  const ringX = useSpring(mx, { stiffness: 200, damping: 28 });
  const ringY = useSpring(my, { stiffness: 200, damping: 28 });

  const isTouch = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const move = (e) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(30, 110, 76, 0.55)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#1e6e4c',
        }}
      />
    </>
  );
}
