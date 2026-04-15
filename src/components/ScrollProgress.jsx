import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #1e6e4c, #d4a017, #1e6e4c)',
      }}
    />
  );
}
