import React from 'react';
import { motion } from 'framer-motion';
import { AtSign, Globe, Share2, Rss, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const navLinks = {
  Club: [
    { label: 'About Us',   href: '#about'      },
    { label: 'Courts',     href: '#courts'     },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Events',     href: '#events'     },
    { label: 'Gallery',    href: '#gallery'    },
  ],
  Membership: [
    { label: 'Starter Plan',   href: '#membership' },
    { label: 'Pro Plan',       href: '#membership' },
    { label: 'Elite Plan',     href: '#membership' },
    { label: 'Corporate',      href: '#contact'    },
  ],
  Support: [
    { label: 'Book a Court',  href: '#booking'  },
    { label: 'Contact Us',    href: '#contact'  },
    { label: 'Coaching',      href: '#about'    },
    { label: 'FAQ',           href: '#contact'  },
  ],
};

const socials = [
  { icon: AtSign, href: '#', label: 'Instagram' },
  { icon: Globe,  href: '#', label: 'Facebook'  },
  { icon: Share2, href: '#', label: 'Twitter'   },
  { icon: Rss,    href: '#', label: 'YouTube'   },
];

export default function Footer() {
  const scroll = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  const top    = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-white dark:bg-green-900 border-t border-gray-100 dark:border-green-800/50">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto section-padding py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <button onClick={top} className="flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 rounded-full border-2 border-green-600 group-hover:border-gold-500 flex items-center justify-center transition-colors duration-200">
                <div className="w-4 h-4 rounded-full border-2 border-green-600 group-hover:border-gold-500 transition-colors duration-200" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-green-700 dark:text-green-300 group-hover:text-gold-600 transition-colors duration-200">
                PICKLRS
              </span>
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
              Vadodara's premier pickleball club. 8 world-class courts, elite coaching,
              and a community that plays at the highest level. Est. 2025.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              {[
                { icon: MapPin, text: 'Alkapuri Road, Vadodara, GJ 390007' },
                { icon: Phone,  text: '+91 98765 43210' },
                { icon: Mail,   text: 'hello@picklrs.in' },
              ].map(c => (
                <div key={c.text} className="flex items-start gap-2.5">
                  <c.icon size={13} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{c.text}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-2.5">
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-green-800/60 hover:bg-green-600 dark:hover:bg-green-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-200"
                  aria-label={s.label}
                >
                  <s.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-4 tracking-wide">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    <button
                      onClick={() => scroll(l.href)}
                      className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 group"
                    >
                      <ChevronRight size={10} className="text-gold-500/0 group-hover:text-gold-500 transition-colors duration-200" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mx-8 md:mx-24" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto section-padding py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Picklrs. All rights reserved. · Vadodara, India.
        </p>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400 dark:text-gray-500">Crafted with</span>
          <span className="text-gold-500 text-xs mx-0.5">♥</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">in Vadodara</span>
        </div>
        <div className="flex gap-4">
          {['Privacy Policy', 'Terms of Service'].map(l => (
            <button key={l} className="text-xs text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
