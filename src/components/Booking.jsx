import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, X } from 'lucide-react';

const COURTS = [
  { id: 1, name: 'Court 1 — Diamond',  type: 'indoor'  },
  { id: 2, name: 'Court 2 — Emerald',  type: 'indoor'  },
  { id: 3, name: 'Court 3 — Sapphire', type: 'indoor'  },
  { id: 4, name: 'Court 4 — Onyx',     type: 'indoor'  },
  { id: 5, name: 'Court 5 — Sunrise',  type: 'outdoor' },
  { id: 6, name: 'Court 6 — Horizon',  type: 'outdoor' },
  { id: 7, name: 'Court 7 — Zenith',   type: 'outdoor' },
  { id: 8, name: 'Court 8 — Aurora',   type: 'outdoor' },
];

const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

// Randomly mark some slots as booked for demo
const BOOKED = new Set([
  '2-07:00', '2-08:00', '5-09:00', '5-10:00',
  '1-14:00', '3-11:00', '6-17:00', '7-18:00', '7-19:00',
]);

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

export default function Booking() {
  const today     = new Date();
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [day, setDay]       = useState(today.getDate());
  const [court, setCourt]   = useState(1);
  const [slot, setSlot]     = useState(null);
  const [success, setSuccess] = useState(false);
  const [ref, inView]       = useInView({ threshold: 0.1 });

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setDay(null); setSlot(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setDay(null); setSlot(null);
  };

  const isBooked = (s) => BOOKED.has(`${court}-${s}`);
  const isPast   = (d) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const handleBook = () => {
    if (!day || !slot) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <section id="booking" ref={ref} className="py-24 md:py-32 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto section-padding">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="gold-divider" />
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Reserve Your Spot</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading mb-4">Book a Court</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Select your preferred court, date, and time — your session is one click away.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-[1fr_1.2fr_1fr] gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {/* Step 1 — Court */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase mb-4">Step 1 · Choose Court</p>
            <div className="space-y-2">
              {COURTS.map(c => (
                <motion.button
                  key={c.id}
                  onClick={() => { setCourt(c.id); setSlot(null); }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                    court === c.id
                      ? 'bg-green-600 text-white shadow-green'
                      : 'bg-white dark:bg-green-800/40 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800/70 border border-gray-100 dark:border-green-700/40'
                  }`}
                >
                  <span>{c.name}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    c.type === 'indoor'
                      ? court === c.id ? 'bg-white/20 text-white' : 'bg-green-50 dark:bg-green-700/40 text-green-600 dark:text-green-300'
                      : court === c.id ? 'bg-white/20 text-white' : 'bg-gold-50 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400'
                  }`}>
                    {c.type}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Step 2 — Calendar */}
          <div className="glass-card rounded-2xl p-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase mb-4">Step 2 · Pick a Date</p>

            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-green-50 dark:hover:bg-green-800 flex items-center justify-center text-gray-500 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="font-semibold text-gray-900 dark:text-white text-sm">{MONTHS[month]} {year}</span>
              <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-green-50 dark:hover:bg-green-800 flex items-center justify-center text-gray-500 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const past     = isPast(d);
                const selected = day === d;
                return (
                  <motion.button
                    key={d}
                    disabled={past}
                    onClick={() => { setDay(d); setSlot(null); }}
                    whileTap={!past ? { scale: 0.9 } : {}}
                    className={`h-8 w-full rounded-lg text-xs font-medium transition-all duration-150 ${
                      selected
                        ? 'bg-green-600 text-white shadow-green'
                        : past
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800'
                    }`}
                  >
                    {d}
                  </motion.button>
                );
              })}
            </div>

            {day && (
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                Selected: <span className="font-semibold text-green-600 dark:text-green-400">{MONTHS[month]} {day}, {year}</span>
              </p>
            )}
          </div>

          {/* Step 3 — Time slots */}
          <div className="glass-card rounded-2xl p-6 flex flex-col">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase mb-4">Step 3 · Select Time</p>

            <div className="grid grid-cols-2 gap-2 flex-1">
              {TIME_SLOTS.map(s => {
                const booked   = isBooked(s);
                const selected = slot === s;
                return (
                  <motion.button
                    key={s}
                    disabled={booked || !day}
                    onClick={() => setSlot(s)}
                    whileTap={!booked && day ? { scale: 0.94 } : {}}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                      selected
                        ? 'bg-green-600 text-white shadow-green'
                        : booked
                        ? 'bg-gray-100 dark:bg-green-900/30 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through'
                        : !day
                        ? 'bg-gray-50 dark:bg-green-800/20 text-gray-300 cursor-not-allowed'
                        : 'bg-white dark:bg-green-800/40 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-800 border border-gray-100 dark:border-green-700/40'
                    }`}
                  >
                    <Clock size={10} className="flex-shrink-0" />
                    {s}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-green-800/50">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <div className="w-2.5 h-2.5 rounded-sm bg-green-600" /> Available
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <div className="w-2.5 h-2.5 rounded-sm bg-gray-200 dark:bg-green-800" /> Booked
              </div>
            </div>

            {/* Book button */}
            <motion.button
              onClick={handleBook}
              disabled={!day || !slot}
              whileHover={day && slot ? { scale: 1.02 } : {}}
              whileTap={day && slot ? { scale: 0.97 } : {}}
              className={`mt-4 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                day && slot
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-green'
                  : 'bg-gray-100 dark:bg-green-900/30 text-gray-400 cursor-not-allowed'
              }`}
            >
              {day && slot ? `Confirm Booking — ${slot}` : 'Select Date & Time'}
            </motion.button>
          </div>
        </motion.div>

        {/* Success toast */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-white dark:bg-green-800 rounded-2xl px-5 py-4 shadow-premium border border-green-100 dark:border-green-700"
            >
              <CheckCircle2 size={20} className="text-green-600" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Booking Confirmed!</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Court {court} · {MONTHS[month]} {day} · {slot}
                </p>
              </div>
              <button onClick={() => setSuccess(false)} className="ml-2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
