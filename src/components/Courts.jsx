import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Home, Sun, CheckCircle2, ChevronRight } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const courts = [
  { id: 1, type: 'indoor',  name: 'Court 1 — Diamond',  tag: 'Indoor · All-Weather',  features: ['Synthetic hardwood', 'LED sports lighting', 'Climate controlled', 'Spectator seating'], available: true  },
  { id: 2, type: 'indoor',  name: 'Court 2 — Emerald',  tag: 'Indoor · All-Weather',  features: ['Pro-grade flooring', 'Acoustic panels',    'Climate controlled', 'Ball machine access'], available: true  },
  { id: 3, type: 'indoor',  name: 'Court 3 — Sapphire', tag: 'Indoor · All-Weather',  features: ['Championship lines',  'HD cameras',         'Climate controlled', 'Coach courtside'],    available: false },
  { id: 4, type: 'indoor',  name: 'Court 4 — Onyx',     tag: 'Indoor · All-Weather',  features: ['Junior layout',       'Padded side walls',  'Climate controlled', 'Beginner friendly'],  available: true  },
  { id: 5, type: 'outdoor', name: 'Court 5 — Sunrise',  tag: 'Outdoor · Garden Court', features: ['Rubberized surface', 'Natural shade canopy','Flood-lit evenings', 'Scenic garden views'], available: true  },
  { id: 6, type: 'outdoor', name: 'Court 6 — Horizon',  tag: 'Outdoor · Garden Court', features: ['Anti-slip texture',  'Open-air breeze',    'Flood-lit evenings', 'Pergola seating'],     available: true  },
  { id: 7, type: 'outdoor', name: 'Court 7 — Zenith',   tag: 'Outdoor · Garden Court', features: ['Championship grade', 'Wind-break netting', 'Flood-lit evenings', 'Tournament ready'],    available: false },
  { id: 8, type: 'outdoor', name: 'Court 8 — Aurora',   tag: 'Outdoor · Garden Court', features: ['Lush green surround','Covered walkways',   'Flood-lit evenings', 'Lounge adjacent'],    available: true  },
];

/* Animated SVG court drawing */
function CourtDrawing({ type }) {
  const isIndoor = type === 'indoor';
  const stroke   = isIndoor ? '#1e6e4c' : '#d4a017';
  const lineProps = {
    stroke,
    strokeWidth: '1.8',
    fill: 'none',
    initial:   { pathLength: 0, opacity: 0 },
    animate:   { pathLength: 1, opacity: 1 },
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
      {/* Court outline */}
      <motion.rect x="20" y="15" width="260" height="130" {...lineProps} stroke="white" strokeOpacity="0.3" />
      {/* Kitchen lines */}
      <motion.line x1="20" y1="55"  x2="280" y2="55"  {...lineProps} stroke="white" strokeOpacity="0.25" transition={{ ...lineProps.transition, delay: 0.4 }} />
      <motion.line x1="20" y1="105" x2="280" y2="105" {...lineProps} stroke="white" strokeOpacity="0.25" transition={{ ...lineProps.transition, delay: 0.5 }} />
      {/* Center */}
      <motion.line x1="150" y1="15" x2="150" y2="145" {...lineProps} stroke="white" strokeOpacity="0.22" transition={{ ...lineProps.transition, delay: 0.6 }} />
      {/* Net */}
      <motion.line x1="20" y1="80" x2="280" y2="80" stroke="white" strokeWidth="3" strokeDasharray="10 6" strokeOpacity="0.45"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.8 }}
      />
      {/* Center dot */}
      <motion.circle cx="150" cy="80" r="4" fill="white" fillOpacity="0.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.4, delay: 1.2 }}
      />
    </svg>
  );
}

function CourtCard({ court, index }) {
  const [hovered, setHovered] = useState(false);
  const isIndoor = court.type === 'indoor';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="relative group rounded-2xl overflow-hidden glass-card cursor-pointer"
    >
      {/* Court visual */}
      <div className="relative h-40 overflow-hidden">
        <CourtDrawing type={court.type} />

        {/* Floating ball on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Pickleball3D size={64} gold={!isIndoor} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Type badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          {isIndoor ? <Home size={10} className="text-white" /> : <Sun size={10} className="text-white" />}
          <span className="text-white text-[10px] font-semibold tracking-wide">{isIndoor ? 'Indoor' : 'Outdoor'}</span>
        </div>

        {/* Availability */}
        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
          court.available ? 'bg-white/90 text-green-700' : 'bg-black/30 text-white/80'
        }`}>
          {court.available ? 'Available' : 'Booked'}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] font-semibold text-gold-600 dark:text-gold-400 tracking-[0.18em] uppercase mb-1">{court.tag}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">{court.name}</h3>

        <ul className="space-y-1.5 mb-4">
          {court.features.map((f, i) => (
            <motion.li
              key={f}
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 + i * 0.06 }}
            >
              <CheckCircle2 size={11} className="text-green-500 flex-shrink-0" />
              {f}
            </motion.li>
          ))}
        </ul>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
        >
          Book this court <ChevronRight size={12} />
        </motion.button>
      </div>

      {/* Bottom gold sweep on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-500 to-transparent rounded-full"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

export default function Courts() {
  const [filter, setFilter] = useState('all');
  const [ref, inView]       = useInView({ threshold: 0.08 });
  const filtered = filter === 'all' ? courts : courts.filter(c => c.type === filter);

  return (
    <section id="courts" ref={ref} className="py-24 md:py-36 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden relative">

      {/* Decorative ball bottom-left */}
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

          {/* Filter tabs */}
          <motion.div
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {[
              { key: 'all',     label: 'All Courts' },
              { key: 'indoor',  label: '4 Indoor'   },
              { key: 'outdoor', label: '4 Outdoor'  },
            ].map(tab => (
              <motion.button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-green-600 text-white shadow-green'
                    : 'bg-white dark:bg-green-800/50 text-gray-600 dark:text-gray-300 hover:bg-green-50 border border-gray-200 dark:border-green-700/50'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((court, i) => (
              <CourtCard key={court.id} court={court} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
