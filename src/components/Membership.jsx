import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { CheckCircle2, Star, Crown } from 'lucide-react';
import Pickleball3D from './Pickleball3D';

const plans = [
  {
    id: 'pro', name: 'Pro', price: '4,000', icon: Star,
    tagline: 'For the dedicated player',
    border: 'border-green-500', badge: 'Most Popular',
    features: ['5,000 credit points / month','1 credit = ₹1','24/7 access','Café discount'],
    cta: 'Join Pro', isGold: false, isPop: true,
  },
  {
    id: 'elite', name: 'Elite', price: '7,000', icon: Crown,
    tagline: 'The ultimate Picklrs experience',
    border: 'border-gold-500', badge: 'Exclusive',
    features: ['8,500 credit points / month','1 credit = ₹1','24/7 access','Court charges ₹700 / hour','Higher booking preference'],
    cta: 'Go Elite', isGold: true, isPop: false,
  },
];

export default function Membership() {
  const [annual, setAnnual] = useState(false);
  const [ref, inView]       = useInView({ threshold: 0.08 });

  return (
    <section id="membership" ref={ref} className="py-24 md:py-36 bg-white dark:bg-green-900 overflow-hidden relative">

      {/* Decorative balls */}
      <motion.div
        className="absolute top-1/4 -left-16 opacity-[0.06] pointer-events-none"
        animate={{ rotate: 360, y: [-15, 15, -15] }}
        transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, y: { duration: 6, repeat: Infinity } }}
      >
        <Pickleball3D size={200} />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 -right-16 opacity-[0.06] pointer-events-none"
        animate={{ rotate: -360, y: [15, -15, 15] }}
        transition={{ rotate: { duration: 45, repeat: Infinity, ease: 'linear' }, y: { duration: 7, repeat: Infinity, delay: 1 } }}
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
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Exclusive Membership</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading mb-4">Choose Your Plan</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base mb-8">
            Flexible tiers for every level of commitment — casual weekender to elite competitor.
          </p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(a => !a)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? 'bg-green-600' : 'bg-gray-200 dark:bg-green-800'}`}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ x: annual ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>Annual</span>
            <AnimatePresence>
              {annual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-semibold bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2.5 py-1 rounded-full"
                >
                  Save 2 months
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => {
            const displayPrice = annual
              ? Math.round(parseInt(plan.price.replace(',', '')) * 10 / 12).toLocaleString('en-IN')
              : plan.price;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`relative glass-card rounded-3xl p-7 border-2 ${plan.border} ${plan.isPop ? 'ring-2 ring-green-500/20' : ''} ${plan.isGold ? 'ring-2 ring-gold-500/20' : ''} overflow-hidden`}
              >
                {/* Shimmer background on elite */}
                {plan.isGold && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold-50/40 to-transparent dark:from-gold-900/10 pointer-events-none"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                )}

                {/* Floating ball decorative */}
                <motion.div
                  className="absolute -top-6 -right-6 opacity-[0.12] pointer-events-none"
                  animate={{ rotate: plan.isGold ? 360 : -360, y: [-4, 4, -4] }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 4, repeat: Infinity } }}
                >
                  <Pickleball3D size={80} gold={plan.isGold} />
                </motion.div>

                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    initial={{ y: -8, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: i * 0.14 + 0.35 }}
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap ${
                      plan.isGold ? 'bg-gold-500 text-white shadow-gold' : 'bg-green-600 text-white shadow-green'
                    }`}
                  >
                    {plan.badge}
                  </motion.div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${plan.isGold ? 'bg-gold-50 dark:bg-gold-900/20' : 'bg-green-50 dark:bg-green-800/60'}`}>
                    <plan.icon size={18} className={plan.isGold ? 'text-gold-600' : 'text-green-600 dark:text-green-300'} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-400">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 relative z-10">
                  <div className="flex items-end gap-1">
                    <span className="text-gray-400 text-sm font-medium self-start mt-2">₹</span>
                    <motion.span
                      key={`${plan.id}-${annual}`}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`font-display text-4xl font-bold ${plan.isGold ? 'text-gold-600' : 'text-gray-900 dark:text-white'}`}
                    >
                      {displayPrice}
                    </motion.span>
                    <span className="text-gray-400 text-sm mb-1">/month</span>
                  </div>
                  {annual && <p className="text-xs text-gray-400 mt-1">Billed annually</p>}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-7 relative z-10">
                  {plan.features.map((f, j) => (
                    <motion.li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300"
                      initial={{ opacity: 0, x: -12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.14 + j * 0.055 + 0.4 }}
                    >
                      <CheckCircle2 size={14} className={plan.isGold ? 'text-gold-500' : 'text-green-500'} />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: plan.isGold ? '0 8px 28px rgba(212,160,23,0.4)' : '0 8px 28px rgba(30,110,76,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all duration-200 relative z-10 ${
                    plan.isGold ? 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold'
                    : plan.isPop ? 'bg-green-600 hover:bg-green-700 text-white shadow-green'
                    : 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          All plans include a one-time ₹499 enrollment fee. Cancel anytime. Prices exclusive of GST.
        </motion.p>
      </div>
    </section>
  );
}
