import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import MagneticButton from './MagneticButton';

const links = [
  { label: 'About',       href: '#about'      },
  { label: 'Courts',      href: '#courts'     },
  { label: 'Facilities',  href: '#facilities' },
  { label: 'Membership',  href: '#membership' },
  { label: 'Events',      href: '#events'     },
  { label: 'Gallery',     href: '#gallery'    },
  { label: 'Contact',     href: '#contact'    },
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = href => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-green-900/90 backdrop-blur-md shadow-card border-b border-gray-100 dark:border-green-800/40'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            {/* Pickleball icon */}
            <div className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-200">
              <div className="w-4 h-4 rounded-full border-2 border-green-600 group-hover:border-gold-500 transition-colors duration-200" />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-green-700 dark:text-green-300 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-200">
              PICKLRS
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-gold-400 transition-colors duration-200 tracking-wide relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <MagneticButton
              strength={0.35}
              onClick={() => scrollTo('#booking')}
              className="btn-primary text-xs px-5 py-2.5 rounded-full font-semibold"
            >
              Book a Court
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setOpen(o => !o)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800 transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white dark:bg-green-900 border-b border-gray-100 dark:border-green-800 shadow-premium px-6 py-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-1">
                {links.map(l => (
                  <button
                    key={l.label}
                    onClick={() => scrollTo(l.href)}
                    className="text-left py-3 px-2 text-gray-700 dark:text-gray-200 font-medium text-base hover:text-green-600 dark:hover:text-gold-400 border-b border-gray-50 dark:border-green-800/60 last:border-0 transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo('#booking')}
                  className="mt-4 btn-primary text-center"
                >
                  Book a Court
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
