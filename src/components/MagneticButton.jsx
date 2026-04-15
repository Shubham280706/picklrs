import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — wraps any element and makes it physically pull toward cursor.
 *
 * Props:
 *   strength   – how far (0–1) the element travels toward cursor (default 0.38)
 *   springOpts – Framer spring config (default: fast, slightly bouncy)
 *   as         – element type: 'button' | 'a' | 'div' (default 'button')
 *   children   – content
 *   className  – tailwind classes (applied to the moving element)
 *   innerClass – classes on the inner wrapper (useful for bg/border styles)
 *   all other props forwarded to the motion element
 */
export default function MagneticButton({
  strength    = 0.38,
  springOpts  = { stiffness: 320, damping: 18, mass: 0.7 },
  as          = 'button',
  children,
  className   = '',
  innerClass  = '',
  onClick,
  ...rest
}) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, springOpts);
  const y    = useSpring(rawY, springOpts);

  /* Inner text slight counter-movement for parallax depth */
  const innerX = useSpring(useMotionValue(0), { ...springOpts, stiffness: 280, damping: 22 });
  const innerY = useSpring(useMotionValue(0), { ...springOpts, stiffness: 280, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    rawX.set(dx);
    rawY.set(dy);
    /* Inner moves opposite direction slightly — depth illusion */
    innerX.set(-dx * 0.25);
    innerY.set(-dy * 0.25);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    innerX.set(0);
    innerY.set(0);
  };

  const MotionEl = motion[as] ?? motion.button;

  return (
    <MotionEl
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...rest}
    >
      <motion.span
        style={{ x: innerX, y: innerY }}
        className={`inline-flex items-center justify-center w-full h-full ${innerClass}`}
      >
        {children}
      </motion.span>
    </MotionEl>
  );
}
