import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Home, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const courtTypes = [
  {
    type: 'indoor',
    name: '4 Indoor Courts',
    tag: 'All-Weather · Climate Controlled',
    icon: Home,
    color: 'from-green-700 to-green-900',
    accentColor: '#1e6e4c',
    features: [
      'Synthetic hardwood & pro-grade flooring',
      'LED sports lighting with zero glare',
      'Full climate control year-round',
      'Acoustic panels for clear play',
      'HD cameras & video analysis ready',
      'Spectator seating on all courts',
      'Ball machine access',
      'Coach courtside support',
    ],
    courts: ['Diamond', 'Emerald', 'Sapphire', 'Onyx'],
  },
  {
    type: 'outdoor',
    name: '4 Outdoor Courts',
    tag: 'Garden Courts · Flood-Lit',
    icon: Sun,
    color: 'from-gold-600 to-gold-800',
    accentColor: '#d4a017',
    features: [
      'Championship-grade rubberized surface',
      'Anti-slip texture for all conditions',
      'Natural shade canopy & wind-break netting',
      'Flood-lit for evening play',
      'Scenic garden surroundings',
      'Pergola & lounge seating adjacent',
      'Covered walkways between courts',
      'Tournament-ready on all 4 courts',
    ],
    courts: ['Sunrise', 'Horizon', 'Zenith', 'Aurora'],
  },
];

function CourtDrawing({ type }) {
  const isIndoor = type === 'indoor';
  const stroke   = isIndoor ? '#1e6e4c' : '#d4a017';
  const lineProps = {
    stroke,
    strokeWidth: '1.8',
    fill: 'none',
    initial:    { pathLength: 0, opacity: 0 },
    animate:    { pathLength: 1, opacity: 1 },
    transition: { duration: 1.4, ease: 'easeInOut', delay: 0.2 },
  };
  return (
    <svg viewBox="0 0 300 160" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id={`cg-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={isIndoor ? '#1e6e4c' : '#d4a017'} />
          <stop offset="100%" stopColor={isIndoor ? '#0f3d2a' : '#b8860b'} />
        </linearGradient>
      </defs>
      <rect width="300" height="160" fill={`url(#cg-${type})`} />
      <motion.rect x="20" y="15" width="260" height="130" {...lineProps} stroke="white" strokeOpacity="0.3" />
      <motion.line x1="20"  y1="55"  x2="280" y2="55"  {...lineProps} stroke="white" strokeOpacity="0.25" transition={{ ...lineProps.transition, delay: 0.4 }} />
      <motion.line x1="20"  y1="105" x2="280" y2="105" {...lineProps} stroke="white" strokeOpacity="0.25" transition={{ ...lineProps.transition, delay: 0.5 }} />
      <motion.line x1="150" y1="15"  x2="150" y2="145" {...lineProps} stroke="white" strokeOpacity="0.22" transition={{ ...lineProps.transition, delay: 0.6 }} />
      <motion.line x1="20"  y1="80"  x2="280" y2="80"  stroke="white" strokeWidth="3" strokeDasharray="10 6" strokeOpacity="0.45"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.8 }}
      />
      <motion.circle cx="150" cy="80" r="4" fill="white" fillOpacity="0.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.2 }}
      />
    </svg>
  );
}

function CourtTypeCard({ ct, index }) {
  const isIndoor = ct.type === 'indoor';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-3xl overflow-hidden"
    >
      {/* Visual header */}
      <div className="relative h-52 overflow-hidden">
        <CourtDrawing type={ct.type} />

        {/* Court name pills */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          {ct.courts.map(name => (
            <span
              key={name}
              className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20"
            >
              {name}
            </span>
          ))}
        </div>

        {/* Type badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <ct.icon size={11} className="text-white" />
          <span className="text-white text-xs font-semibold tracking-wide">
            {isIndoor ? 'Indoor' : 'Outdoor'}
          </span>
        </div>

        {/* Ball watermark */}
        <motion.div
          className="absolute -bottom-6 -right-6 opacity-20 pointer-events-none"
          animate={{ rotate: isIndoor ? 360 : -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <Pickleball3D size={80} gold={!isIndoor} />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-6 md:p-8">
        <p className="text-[10px] font-semibold text-gold-600 dark:text-gold-400 tracking-[0.18em] uppercase mb-1">
          {ct.tag}
        </p>
        <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-5">
          {ct.name}
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
          {ct.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0" style={{ color: ct.accentColor }} />
              {f}
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: ct.accentColor }}
        >
          Book a court <ChevronRight size={14} />
        </motion.button>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(to right, ${ct.accentColor}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Courts() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section id="courts" ref={ref} className="py-24 md:py-36 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden relative">

      {/* Decorative ball */}
      <motion.div
        className="absolute -bottom-20 -left-20 opacity-[0.06] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        <Pickleball3D size={300} gold />
      </motion.div>

      <div className="max-w-7xl mx-auto section-padding">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">8 Premium Courts</span>
            <div className="gold-divider" />
          </motion.div>

          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            Our Courts
          </motion.h2>

          <motion.p
            className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            Four all-weather indoor courts and four scenic garden outdoor courts —
            each maintained to international pickleball standards.
          </motion.p>
        </motion.div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {courtTypes.map((ct, i) => (
            <CourtTypeCard key={ct.type} ct={ct} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
