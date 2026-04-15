import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Lottie from 'lottie-react';
import Pickleball3D from './Pickleball3D';
import MagneticButton from './MagneticButton';
import courtLinesData from '../animations/courtLines';
import ballBounceData from '../animations/ballBounce';

/* ── Word-by-word reveal ─────────────────────────────────── */
function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.26em]"
          initial={{ opacity: 0, y: 38, rotateX: -45 }}
          animate={{ opacity: 1, y: 0,  rotateX: 0  }}
          transition={{ duration: 0.7, delay: delay + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Orbiting mini-ball ──────────────────────────────────── */
function OrbitBall({ radius, duration, delay, size, gold, startAngle = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', width: 0, height: 0 }}
      animate={{ rotate: 360 + startAngle }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <motion.div
        style={{ position: 'absolute', left: radius, top: -size / 2, opacity: 0.55 }}
        animate={{ rotate: -360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
      >
        <Pickleball3D size={size} gold={gold} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY         = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const ballY       = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY       = useTransform(scrollYProgress, [0, 0.6], ['0%', '-12%']);

  const scrollDown = () =>
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-green-900"
    >
      {/* ── Gradient blobs ─────────────────────────────── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-green-50 dark:bg-green-800/25 blur-[100px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold-50 dark:bg-gold-900/10 blur-[90px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </motion.div>

      {/* ── Lottie court lines background ──────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY, opacity: 0.09 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.09 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <Lottie
          animationData={courtLinesData}
          loop
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      {/* ── Main content ────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto section-padding"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-24 pb-12 lg:min-h-screen lg:py-28">

          {/* Left — text */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-2.5 bg-green-50 dark:bg-green-800/50 border border-green-200 dark:border-green-700/60 text-green-700 dark:text-green-300 text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full mb-7"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-gold-500"
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Vadodara's Premier Pickleball Club
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.07] mb-5">
              <SplitText text="Elevate Your" className="text-gray-900 dark:text-white block" delay={0.35} />
              <span className="block mt-1">
                <SplitText text="Game at" className="text-green-600 dark:text-green-300" delay={0.6} />
                {' '}
                <SplitText text="Picklrs" className="gold-text" delay={0.85} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed max-w-lg mb-8"
            >
              8 world-class courts, elite coaching, and an exclusive community
              — all in the heart of Vadodara. Est.&nbsp;2025.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="flex gap-8 mb-10 justify-center lg:justify-start"
            >
              {[
                { value: '8', label: 'Courts' },
                { value: '4+', label: 'Coaches' },
                { value: '500+', label: 'Members' },
              ].map(s => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-3xl font-bold text-green-600 dark:text-green-300">{s.value}</span>
                  <span className="text-[10px] text-gray-400 tracking-widest uppercase mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <MagneticButton
                strength={0.4}
                onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary px-8 py-4 text-sm rounded-full font-semibold"
              >
                Book a Court
              </MagneticButton>

              <MagneticButton
                strength={0.4}
                onClick={() => document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline px-8 py-4 text-sm rounded-full font-semibold"
              >
                Join Membership
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — 3D ball + Lottie bouncing ball */}
          <motion.div
            className="hidden lg:flex relative items-center justify-center"
            style={{ y: ballY }}
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow rings */}
            <motion.div
              className="absolute rounded-full border border-green-200/40 dark:border-green-600/20"
              style={{ width: 420, height: 420 }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full border border-gold-400/20"
              style={{ width: 340, height: 340 }}
              animate={{ scale: [1, 1.06, 1], rotate: [0, 360] }}
              transition={{
                scale:  { duration: 3.5, repeat: Infinity, delay: 0.5 },
                rotate: { duration: 22,  repeat: Infinity, ease: 'linear' },
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(30,110,76,0.12) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Orbits */}
            <OrbitBall radius={185} duration={14} delay={0}   size={36} gold={false} startAngle={0}   />
            <OrbitBall radius={155} duration={20} delay={1.5} size={26} gold={true}  startAngle={120} />
            <OrbitBall radius={210} duration={18} delay={3}   size={22} gold={true}  startAngle={240} />

            {/* Main hero ball */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 3, 0, -3, 0] }}
              transition={{
                y:      { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Pickleball3D size={260} glow />
            </motion.div>

            {/* Lottie bouncing ball — floats bottom-right */}
            <motion.div
              className="absolute -bottom-8 -right-2 opacity-90"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.90, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Lottie
                animationData={ballBounceData}
                loop
                style={{ width: 90, height: 120 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
