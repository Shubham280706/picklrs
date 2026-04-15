import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

/* SVG placeholder for gallery panels */
const GalleryImage = ({ label, color1, color2, pattern }) => (
  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id={`g-${label.replace(/\s/g,'-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill={`url(#g-${label.replace(/\s/g,'-')})`} />
    {pattern === 'court' && <>
      <rect x="40" y="30" width="320" height="240" stroke="white" strokeWidth="2" fill="none" opacity="0.28"/>
      <line x1="40"  y1="105" x2="360" y2="105" stroke="white" strokeWidth="1.5" opacity="0.22"/>
      <line x1="40"  y1="195" x2="360" y2="195" stroke="white" strokeWidth="1.5" opacity="0.22"/>
      <line x1="200" y1="30"  x2="200" y2="270" stroke="white" strokeWidth="1.5" opacity="0.22"/>
      <line x1="40"  y1="150" x2="360" y2="150" stroke="white" strokeWidth="3" strokeDasharray="10 6" opacity="0.35"/>
      <circle cx="200" cy="150" r="6" fill="white" opacity="0.4"/>
    </>}
    {pattern === 'action' && <>
      <circle cx="200" cy="150" r="70"  stroke="white" strokeWidth="2" fill="none" opacity="0.18"/>
      <circle cx="200" cy="150" r="35"  fill="white" opacity="0.12"/>
      <line x1="130" y1="80"  x2="270" y2="220" stroke="white" strokeWidth="2" opacity="0.2"/>
      <line x1="270" y1="80"  x2="130" y2="220" stroke="white" strokeWidth="2" opacity="0.2"/>
    </>}
    {pattern === 'social' && [60,110,160,210,260,310].map((x,i) => (
      <React.Fragment key={i}>
        <circle cx={x} cy={80 + (i%3)*40} r="22" fill="white" opacity="0.1"/>
        <circle cx={x+20} cy={180 + (i%2)*30} r="15" fill="white" opacity="0.07"/>
      </React.Fragment>
    ))}
    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
      fill="white" fontSize="15" fontFamily="Playfair Display, serif"
      fontWeight="600" opacity="0.7">{label}</text>
  </svg>
);

const items = [
  { id:1, label:'Indoor Court 1',      color1:'#1e6e4c', color2:'#0f3d2a', pattern:'court',  span:'md:col-span-2 md:row-span-2' },
  { id:2, label:'Evening Match',       color1:'#2d8f63', color2:'#165439', pattern:'action', span:'' },
  { id:3, label:'Garden Court',        color1:'#d4a017', color2:'#b8860b', pattern:'court',  span:'' },
  { id:4, label:'Pro Coaching',        color1:'#165439', color2:'#082718', pattern:'action', span:'' },
  { id:5, label:'Members Lounge',      color1:'#4aad82', color2:'#1e6e4c', pattern:'social', span:'md:col-span-2' },
  { id:6, label:'Tournament Day',      color1:'#b8860b', color2:'#92690a', pattern:'action', span:'' },
  { id:7, label:'Outdoor Sunrise',     color1:'#fbbf24', color2:'#d4a017', pattern:'court',  span:'' },
  { id:8, label:'Championship Court',  color1:'#0f3d2a', color2:'#1e6e4c', pattern:'court',  span:'' },
  { id:9, label:'Club Social',         color1:'#2d8f63', color2:'#4aad82', pattern:'social', span:'' },
];

/* 3D tilt card */
function TiltCard({ item, index, onOpen }) {
  const cardRef  = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: cy * -12, y: cx * 12 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
      style={{ perspective: 900 }}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      animate={{ rotateX: hover ? tilt.x : 0, rotateY: hover ? tilt.y : 0, scale: hover ? 1.03 : 1 }}
      onMouseMove={handleMove}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => { setHover(false); setTilt({ x: 0, y: 0 }); }}
      onClick={() => onOpen(item)}
    >
      <GalleryImage {...item} />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, background: 'rgba(0,0,0,0)' }}
        animate={{ opacity: hover ? 1 : 0, background: hover ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -20 }}
          animate={{ scale: hover ? 1 : 0.5, rotate: hover ? 0 : -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-sm border border-white/50 flex items-center justify-center"
        >
          <ZoomIn size={18} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Label at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: hover ? 0 : 20, opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white text-xs font-semibold">{item.label}</p>
      </motion.div>

      {/* Specular shine sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{ x: hover ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [ref, inView]           = useInView({ threshold: 0.08 });

  const open  = (item) => setLightbox(item);
  const close = () => setLightbox(null);
  const prev  = () => { const i = items.findIndex(x => x.id === lightbox.id); setLightbox(items[(i - 1 + items.length) % items.length]); };
  const next  = () => { const i = items.findIndex(x => x.id === lightbox.id); setLightbox(items[(i + 1) % items.length]); };

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-36 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden relative">

      {/* Decorative spinning ball */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -right-20 opacity-[0.05] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <Pickleball3D size={260} gold />
      </motion.div>

      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Club Life</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading mb-4">Gallery</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            A glimpse into life at Picklrs — the courts, community, and moments that define us.
          </p>
        </motion.div>

        {/* Masonry grid with tilt cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px]">
          {items.map((item, i) => (
            <TiltCard key={item.id} item={item} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={close} />

            <motion.div
              className="relative z-10 max-w-2xl w-full mx-6"
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <motion.button
                onClick={close}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-11 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>

              <div className="rounded-3xl overflow-hidden shadow-premium aspect-[4/3]">
                <GalleryImage {...lightbox} />
              </div>

              <p className="text-center text-white/80 text-sm font-medium mt-4 tracking-wide">{lightbox.label}</p>

              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1, x: -3 }}
                className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-14 w-11 h-11 rounded-full bg-white/25 sm:bg-white/10 hover:bg-white/35 sm:hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1, x: 3 }}
                className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-14 w-11 h-11 rounded-full bg-white/25 sm:bg-white/10 hover:bg-white/35 sm:hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
