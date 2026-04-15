import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const testimonials = [
  {
    id: 1, name: 'Arjun Mehta',    role: 'Pro Member · 8 months',    rating: 5, initials: 'AM', color: 'from-green-600 to-green-700',
    text: "Picklrs has completely transformed how I play. The courts are immaculate, the coaching is world-class, and the community is incredibly welcoming. Best decision I made in 2025.",
  },
  {
    id: 2, name: 'Priya Desai',    role: 'Elite Member · 10 months',  rating: 5, initials: 'PD', color: 'from-gold-500 to-gold-600',
    text: "As someone who travels internationally for tournaments, I can honestly say Picklrs stands shoulder-to-shoulder with the best clubs I've visited. The indoor courts are outstanding.",
  },
  {
    id: 3, name: 'Rahul Shah',     role: 'Starter Member · 4 months', rating: 5, initials: 'RS', color: 'from-green-500 to-green-600',
    text: "I had never played pickleball before joining. Within three months, thanks to the coaches and community here, I was competing in my first club tournament. Incredible journey.",
  },
  {
    id: 4, name: 'Neha Kapoor',    role: 'Pro Member · 6 months',     rating: 5, initials: 'NK', color: 'from-gold-600 to-gold-700',
    text: "The members lounge, the changing rooms, the pro shop — everything at Picklrs screams premium. It's not just a sports club, it's a lifestyle. I tell every friend who will listen.",
  },
  {
    id: 5, name: 'Vikram Patel',   role: 'Elite Member · 1 year',     rating: 5, initials: 'VP', color: 'from-green-700 to-green-800',
    text: "The video analysis sessions alone are worth the Elite membership. My coach identified weaknesses I never knew existed. My ranking has improved significantly.",
  },
];

const stats = [
  { value: '4.9/5', label: 'Member Rating'     },
  { value: '98%',   label: 'Renewal Rate'       },
  { value: '500+',  label: 'Active Members'     },
  { value: '#1',    label: 'Club in Vadodara'   },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const [ref, inView]         = useInView({ threshold: 0.15 });

  useEffect(() => {
    const id = setInterval(() => { setDir(1); setCurrent(c => (c + 1) % testimonials.length); }, 5500);
    return () => clearInterval(id);
  }, []);

  const go   = (n) => { setDir(n > current ? 1 : -1); setCurrent(n); };
  const prev = () => go((current - 1 + testimonials.length) % testimonials.length);
  const next = () => go((current + 1) % testimonials.length);
  const t    = testimonials[current];

  const slideVariants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.97, transition: { duration: 0.32 } }),
  };

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-36 bg-white dark:bg-green-900 overflow-hidden relative">

      {/* Decorative floating balls */}
      <motion.div
        className="absolute top-10 left-8 opacity-[0.06] pointer-events-none"
        animate={{ y: [-12, 12, -12], rotate: 360 }}
        transition={{ y: { duration: 5, repeat: Infinity }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
      >
        <Pickleball3D size={100} gold />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-8 opacity-[0.06] pointer-events-none"
        animate={{ y: [12, -12, 12], rotate: -360 }}
        transition={{ y: { duration: 6, repeat: Infinity, delay: 1 }, rotate: { duration: 35, repeat: Infinity, ease: 'linear' } }}
      >
        <Pickleball3D size={80} />
      </motion.div>

      <div className="max-w-7xl mx-auto section-padding">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Member Stories</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading">What Members Say</h2>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={t.id}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              {/* Subtle ball watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.06] pointer-events-none">
                <Pickleball3D size={120} gold />
              </div>

              <div className="relative z-10">
                {/* Quote icon */}
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-800/60 flex items-center justify-center">
                    <Quote size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                </motion.div>

                {/* Stars */}
                <motion.div
                  className="flex justify-center gap-1 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.25 + i * 0.06, type: 'spring', stiffness: 300 }}
                    >
                      <Star size={14} className="fill-gold-500 text-gold-500" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Text */}
                <motion.blockquote
                  className="font-display text-xl md:text-2xl font-medium text-gray-800 dark:text-white leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  "{t.text}"
                </motion.blockquote>

                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />

                {/* Author */}
                <motion.div
                  className="flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.28, type: 'spring', stiffness: 250 }}
                  >
                    {t.initials}
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-green-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-600 transition-colors"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => go(i)}
                  animate={{ width: i === current ? 24 : 8 }}
                  className={`h-2 rounded-full transition-colors duration-300 ${
                    i === current ? 'bg-green-600' : 'bg-gray-300 dark:bg-green-700 hover:bg-green-400'
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-green-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-green-500 hover:text-green-600 transition-colors"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-5 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-transparent dark:from-green-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <p className="font-display text-3xl font-bold text-green-600 dark:text-green-300 mb-1 relative z-10">{s.value}</p>
              <p className="text-xs text-gray-400 tracking-widest uppercase relative z-10">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
