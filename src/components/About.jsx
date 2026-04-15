import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useAnimatedCounter } from './AnimatedCounter';
import { Trophy, Users, Star, Zap } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const values = [
  { icon: Trophy, title: 'Elite Standard',    desc: 'Every court and facility built to the highest specification.' },
  { icon: Users,  title: 'Vibrant Community', desc: 'Join 500+ passionate players who share a love for the sport.' },
  { icon: Star,   title: 'Premium Experience',desc: 'From coaching to amenities — every detail crafted for excellence.' },
  { icon: Zap,    title: 'Pro Coaching',       desc: 'Certified coaches bring championship-level insight to every session.' },
];

/* Stat card with live counter */
function StatCard({ value, label, delay }) {
  const [ref, count] = useAnimatedCounter(value, 1600);
  const [cardRef, inView] = useInView({ threshold: 0.3 });
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass-card rounded-2xl p-5 text-center"
    >
      <span ref={ref} className="font-display text-4xl font-bold text-green-600 dark:text-green-300 block">
        {count}
      </span>
      <span className="text-[10px] tracking-widest text-gray-400 uppercase mt-1 block">{label}</span>
      <div className="w-4 h-0.5 bg-gold-500/60 mx-auto mt-3 rounded-full" />
    </motion.div>
  );
}

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.12 });

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
  });

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 bg-white dark:bg-green-900 overflow-hidden relative">

      {/* Decorative ball top-right */}
      <motion.div
        className="absolute -top-16 -right-20 opacity-[0.07] dark:opacity-[0.04] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <Pickleball3D size={340} />
      </motion.div>

      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — 3D ball visual */}
          <motion.div
            className="relative flex items-center justify-center order-2 md:order-1 pb-24 md:pb-0"
            initial={{ opacity: 0, x: -50, rotate: -8 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Radial glow behind ball */}
            <div className="absolute w-72 h-72 rounded-full bg-green-100/60 dark:bg-green-700/20 blur-[60px]" />

            {/* Orbiting gold ball */}
            <motion.div
              className="absolute"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ width: 280, height: 280 }}
            >
              <motion.div
                style={{ position: 'absolute', top: -18, left: '50%', marginLeft: -18 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <Pickleball3D size={36} gold />
              </motion.div>
            </motion.div>

            {/* Second orbit */}
            <motion.div
              className="absolute"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ width: 240, height: 240 }}
            >
              <motion.div
                style={{ position: 'absolute', bottom: -16, right: -16 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <Pickleball3D size={28} />
              </motion.div>
            </motion.div>

            {/* Main ball */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Pickleball3D size={220} glow />
            </motion.div>

            {/* Stats below ball */}
            <div className="absolute -bottom-6 left-0 right-0 grid grid-cols-3 gap-3 px-4">
              <StatCard value="8"    label="Courts"  delay={0.1} />
              <StatCard value="4"    label="Coaches" delay={0.2} />
              <StatCard value="500"  label="Members" delay={0.3} />
            </div>
          </motion.div>

          {/* Right — text + value cards */}
          <motion.div
            className="order-1 md:order-2"
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeUp(0)} className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gold-500 rounded-full" />
              <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Our Story</span>
            </motion.div>

            <motion.h2 variants={fadeUp(0.05)} className="section-heading mb-6">
              Born in Vadodara,<br />
              <span className="text-green-600 dark:text-green-300">Built for Champions</span>
            </motion.h2>

            <motion.p variants={fadeUp(0.1)} className="text-gray-500 dark:text-gray-400 leading-relaxed mb-5 text-base">
              Founded in 2025, Picklrs was born from a belief that Vadodara deserved a world-class
              pickleball destination — where sport's electric energy meets luxury hospitality,
              welcoming everyone from first-timers to tournament players.
            </motion.p>

            <motion.p variants={fadeUp(0.15)} className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 text-base">
              Our 8 meticulously maintained courts, state-of-the-art indoor facilities, and
              certified coaching team make Picklrs the benchmark for pickleball excellence in Gujarat.
            </motion.p>

            {/* Value cards */}
            <motion.div
              variants={fadeUp(0.2)}
              className="grid grid-cols-2 gap-3"
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(0,0,0,0.08)' }}
                  className="glass-card rounded-2xl p-5 group cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-800/60 flex items-center justify-center mb-3 group-hover:bg-green-600 transition-colors duration-300">
                    <v.icon size={17} className="text-green-600 dark:text-green-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-xs mb-1.5">{v.title}</h3>
                  <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                  <motion.div
                    className="w-0 h-0.5 bg-gold-500/70 mt-3 rounded-full"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
