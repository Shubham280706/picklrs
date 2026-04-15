import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 18 + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-green-900"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated pickleball */}
        <motion.div
          className="relative mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-20 h-20 rounded-full border-4 border-green-100 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-4 border-green-600 border-t-gold-500 relative">
              {/* Court lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-0.5 bg-white/40 absolute" />
                <div className="h-full w-0.5 bg-white/40 absolute" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Logo text */}
        <motion.h1
          className="font-display text-4xl font-bold text-green-600 mb-1 tracking-widest"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          PICKLRS
        </motion.h1>
        <motion.p
          className="text-xs tracking-[0.35em] text-gold-600 uppercase mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Vadodara · Est. 2025
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-600 to-gold-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
