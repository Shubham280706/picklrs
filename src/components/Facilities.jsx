import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Coffee, ShowerHead, Wifi, Shield, BookOpen, Shirt, Lightbulb } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const facilities = [
  { icon: Coffee,     label: 'Members Lounge',   desc: 'Premium lounge with café, seating, and screen zones.' },
  { icon: ShowerHead, label: 'Luxury Changing',  desc: 'Spa-grade lockers, showers, and grooming amenities.' },
  { icon: Wifi,       label: 'High-Speed Wi-Fi', desc: 'Blazing fast internet across the entire complex.' },
  { icon: Shield,     label: '24/7 Security',    desc: 'Round-the-clock CCTV and professional security team.' },
  { icon: BookOpen,   label: 'Pro Shop',         desc: 'Curated selection of paddles, balls, and apparel.' },
  { icon: Shirt,      label: 'Equipment Rental', desc: 'Premium rental kits — paddle, shoes, and attire.' },
  { icon: Lightbulb,  label: 'Halogens',         desc: 'Bright, even court lighting designed for clear play after dark.' },
];

export default function Facilities() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section id="facilities" ref={ref} className="py-24 md:py-36 bg-white dark:bg-green-900 overflow-hidden relative">

      {/* Subtle spinning ball */}
      <motion.div
        className="absolute top-10 right-10 opacity-[0.06] pointer-events-none"
        animate={{ rotate: 360, y: [-10, 10, -10] }}
        transition={{ rotate: { duration: 40, repeat: Infinity, ease: 'linear' }, y: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <Pickleball3D size={180} gold />
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
            initial={{ opacity: 0, width: 0 }}
            animate={inView ? { opacity: 1, width: 'auto' } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">World-Class Amenities</span>
            <div className="gold-divider" />
          </motion.div>
          <motion.h2
            className="section-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            Facilities & Experience
          </motion.h2>
          <motion.p
            className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            Every detail considered — from the first serve to the post-game wind-down.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {facilities.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.10)', transition: { duration: 0.22 } }}
              className="glass-card rounded-2xl p-5 text-center group cursor-default relative overflow-hidden"
            >
              {/* Background shimmer on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-transparent dark:from-green-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-800/60 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors duration-300"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <f.icon size={20} className="text-green-600 dark:text-green-300 group-hover:text-white transition-colors duration-300" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">{f.label}</h3>
                <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                <motion.div
                  className="w-1 h-1 rounded-full bg-gold-500/60 mx-auto mt-3 group-hover:scale-[3] transition-transform duration-400"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-12 rounded-3xl bg-gradient-to-r from-green-600 to-green-700 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          {/* Animated court lines inside banner */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" viewBox="0 0 800 200" fill="none">
            <motion.rect x="50" y="20" width="700" height="160" stroke="white" strokeWidth="2" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }} />
            <motion.line x1="400" y1="20" x2="400" y2="180" stroke="white" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.2 }} />
            <motion.line x1="50" y1="100" x2="750" y2="100" stroke="white" strokeWidth="3" strokeDasharray="12 8"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.5 }} />
          </svg>

          {/* Decorative ball in banner */}
          <motion.div
            className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 hidden md:block pointer-events-none"
            animate={{ rotate: 360, y: [-5, 5, -5] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity } }}
          >
            <Pickleball3D size={120} />
          </motion.div>

          <div className="relative z-10">
            <p className="text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Exclusive Member Perk</p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              Free Trial Session for New Members
            </h3>
            <p className="text-green-100 text-sm max-w-md">
              Book a complimentary one-hour court session and experience Picklrs for yourself.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: '0 8px 28px rgba(212,160,23,0.4)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.querySelector('#membership')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative z-10 bg-gold-500 hover:bg-gold-400 text-white font-semibold px-8 py-3.5 rounded-full text-sm shadow-gold transition-colors flex-shrink-0"
          >
            Claim Free Trial
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
