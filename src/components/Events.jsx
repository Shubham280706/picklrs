import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import {
  ChevronLeft, ChevronRight, X, Calendar, Clock,
  MapPin, Trophy, Users, Zap, BookOpen, Star,
} from 'lucide-react';
import Lottie from 'lottie-react';
import paddleHitData from '../animations/paddleHit';
import MagneticButton from './MagneticButton';

/* ─── Event data ─────────────────────────────────────────── */
const EVENT_TYPES = {
  tournament: { label: 'Tournament',  color: 'bg-gold-500',     text: 'text-gold-600',    border: 'border-gold-400',    icon: Trophy,    bg: 'bg-gold-50 dark:bg-gold-900/20'    },
  clinic:     { label: 'Clinic',      color: 'bg-green-600',    text: 'text-green-600',   border: 'border-green-400',   icon: BookOpen,  bg: 'bg-green-50 dark:bg-green-800/40'  },
  social:     { label: 'Social Play', color: 'bg-blue-500',     text: 'text-blue-600',    border: 'border-blue-400',    icon: Users,     bg: 'bg-blue-50 dark:bg-blue-900/20'    },
  workshop:   { label: 'Workshop',    color: 'bg-purple-500',   text: 'text-purple-600',  border: 'border-purple-400',  icon: Zap,       bg: 'bg-purple-50 dark:bg-purple-900/20'},
  members:    { label: 'Members Only',color: 'bg-green-700',    text: 'text-green-700',   border: 'border-green-600',   icon: Star,      bg: 'bg-green-50 dark:bg-green-800/40'  },
};

const EVENTS = [
  /* April 2025 */
  { id:1,  year:2025, month:3, day:6,  title:'Sunday Social Mix',           type:'social',     time:'07:00–09:00 AM', venue:'All Outdoor Courts',   prize:null,        spots:40, reg:28, desc:'Drop-in fun games for members. All levels welcome. Free for members.' },
  { id:2,  year:2025, month:3, day:10, title:'Beginner Dink Clinic',        type:'clinic',     time:'10:00–12:00 PM', venue:'Indoor Court 4',       prize:null,        spots:16, reg:11, desc:'Master the dink shot with certified coach Priya Sharma. Great for new players.' },
  { id:3,  year:2025, month:3, day:13, title:'Picklrs Members Mixer',       type:'members',    time:'06:00–09:00 PM', venue:'Members Lounge',       prize:null,        spots:60, reg:42, desc:'Exclusive evening for members. Cocktails, food, and casual rallies on the courts.' },
  { id:4,  year:2025, month:3, day:20, title:'Vadodara Open Championship',  type:'tournament', time:'08:00 AM–06:00 PM', venue:'All 8 Courts',      prize:'₹50,000',   spots:64, reg:51, desc:"Our flagship tournament. Open to all levels — Men's, Women's & Mixed doubles categories." },
  { id:5,  year:2025, month:3, day:26, title:'3.5+ Singles Ladder',         type:'tournament', time:'09:00 AM–02:00 PM', venue:'Indoor Courts 1–3', prize:'₹8,000',    spots:24, reg:16, desc:'Round-robin format singles ladder for intermediate-advanced players.' },
  { id:6,  year:2025, month:3, day:27, title:'Video Analysis Workshop',     type:'workshop',   time:'03:00–05:00 PM', venue:'Indoor Court 1',       prize:null,        spots:12, reg:7,  desc:'HD replay session with head coach. Bring your game, leave with a game plan.' },

  /* May 2025 */
  { id:7,  year:2025, month:4, day:4,  title:'Sunday Social Mix',           type:'social',     time:'07:00–09:00 AM', venue:'All Outdoor Courts',   prize:null,        spots:40, reg:22, desc:'Drop-in fun games for members of all levels. Free for members.' },
  { id:8,  year:2025, month:4, day:10, title:'Serve & Return Clinic',       type:'clinic',     time:'10:00–12:00 PM', venue:'Indoor Court 3',       prize:null,        spots:16, reg:9,  desc:'Deep-dive into serving patterns and return strategies with Coach Arjun.' },
  { id:9,  year:2025, month:4, day:17, title:'Intermediate Doubles Drill',  type:'clinic',     time:'09:00–11:00 AM', venue:'Indoor Courts 1–2',    prize:null,        spots:20, reg:14, desc:'2-person drills focused on communication, stacking, and kitchen play.' },
  { id:10, year:2025, month:4, day:18, title:'Gujarat State Qualifier',     type:'tournament', time:'07:00 AM–06:00 PM', venue:'All 8 Courts',      prize:'₹1,20,000', spots:96, reg:72, desc:'IPTF-sanctioned state qualifier. Advance to the Gujarat State Championships.' },
  { id:11, year:2025, month:4, day:24, title:'Members Evening Social',      type:'members',    time:'06:00–09:00 PM', venue:'Members Lounge',       prize:null,        spots:60, reg:35, desc:'Monthly members mixer. Network, relax, and catch some casual games.' },
  { id:12, year:2025, month:4, day:31, title:'3.0 Doubles Tournament',      type:'tournament', time:'09:00 AM–04:00 PM', venue:'Outdoor Courts',    prize:'₹12,000',   spots:32, reg:20, desc:'Beginner-friendly doubles tournament. Perfect for 3.0 and under players.' },

  /* June 2025 */
  { id:13, year:2025, month:5, day:7,  title:'Sunday Social Mix',           type:'social',     time:'07:00–09:00 AM', venue:'All Outdoor Courts',   prize:null,        spots:40, reg:18, desc:'Open drop-in session for members. All levels welcome.' },
  { id:14, year:2025, month:5, day:14, title:'Monsoon Mixed Doubles Cup',   type:'tournament', time:'08:00 AM–05:00 PM', venue:'Indoor Courts',      prize:'₹25,000',   spots:48, reg:30, desc:'Special indoor tournament celebrating the monsoon season. Mixed doubles format.' },
  { id:15, year:2025, month:5, day:20, title:'Youth Academy Open Day',      type:'clinic',     time:'10:00 AM–12:00 PM', venue:'Indoor Court 4',    prize:null,        spots:20, reg:8,  desc:'Free session for kids 8–16. Coaching, games, and gear giveaways.' },
  { id:16, year:2025, month:5, day:28, title:'Club Championship Qualifier', type:'tournament', time:'09:00 AM–06:00 PM', venue:'All 8 Courts',      prize:'₹75,000',   spots:80, reg:55, desc:'Qualifier round for the annual Picklrs Club Championship. Top 32 advance.' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m)    { return new Date(y, m, 1).getDay(); }

/* ─── Event Detail Modal ──────────────────────────────────── */
function EventModal({ event, onClose }) {
  const t  = EVENT_TYPES[event.type];
  const TypeIcon = t.icon;
  const pct = Math.round((event.reg / event.spots) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative z-10 w-full max-w-lg glass-card rounded-3xl p-7 overflow-hidden"
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1,    y: 0,  opacity: 1 }}
        exit={{ scale: 0.88, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {/* Close */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.15, rotate: 90 }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-green-800 flex items-center justify-center text-gray-500 dark:text-gray-300"
        >
          <X size={15} />
        </motion.button>

        {/* Type badge */}
        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${t.bg} ${t.text} mb-4`}>
          <TypeIcon size={11} /> {t.label}
        </span>

        <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3 pr-8">
          {event.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">{event.desc}</p>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: Calendar, label: 'Date',  val: `${MONTHS[event.month]} ${event.day}, ${event.year}` },
            { icon: Clock,    label: 'Time',  val: event.time },
            { icon: MapPin,   label: 'Venue', val: event.venue },
            { icon: Users,    label: 'Spots', val: `${event.reg} / ${event.spots} registered` },
          ].map(m => (
            <div key={m.label} className="flex items-start gap-2.5 bg-gray-50 dark:bg-green-800/40 rounded-xl p-3">
              <m.icon size={14} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{m.label}</p>
                <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{m.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Spots progress */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-500 dark:text-gray-400">Registrations</span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{pct}% filled</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-green-800/60 overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${pct > 80 ? 'bg-gold-500' : 'bg-green-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Prize */}
        {event.prize && (
          <div className="flex items-center gap-2 bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-700/40 rounded-xl px-4 py-2.5 mb-5">
            <Trophy size={14} className="text-gold-600" />
            <span className="text-xs font-semibold text-gold-700 dark:text-gold-400">Prize Pool: {event.prize}</span>
          </div>
        )}

        <MagneticButton
          strength={0.3}
          onClick={onClose}
          className={`w-full py-3.5 rounded-2xl font-semibold text-sm text-white ${
            event.type === 'tournament' ? 'bg-gold-500 hover:bg-gold-600' : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          Register Now →
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
}

/* ─── Calendar grid ───────────────────────────────────────── */
function CalendarGrid({ year, month, events, onSelect, selectedDay }) {
  const total    = getDaysInMonth(year, month);
  const firstDay = getFirstDay(year, month);
  const today    = new Date();

  const eventsByDay = {};
  events.forEach(e => {
    if (!eventsByDay[e.day]) eventsByDay[e.day] = [];
    eventsByDay[e.day].push(e);
  });

  return (
    <div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-2 uppercase tracking-wider">{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}

        {Array.from({ length: total }).map((_, i) => {
          const day      = i + 1;
          const dayEvts  = eventsByDay[day] || [];
          const isToday  = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          const isSelected = selectedDay === day;

          return (
            <motion.button
              key={day}
              onClick={() => onSelect(day)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`relative aspect-square rounded-xl flex flex-col items-center justify-start pt-1.5 transition-all duration-200 ${
                isSelected
                  ? 'bg-green-600 text-white shadow-green'
                  : isToday
                  ? 'bg-green-50 dark:bg-green-800/50 text-green-700 dark:text-green-300 ring-1 ring-green-400'
                  : 'hover:bg-gray-50 dark:hover:bg-green-800/30 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-xs font-semibold leading-none">{day}</span>

              {/* Event dots */}
              {dayEvts.length > 0 && (
                <div className="flex gap-0.5 mt-1 flex-wrap justify-center px-0.5">
                  {dayEvts.slice(0, 3).map((e, j) => (
                    <span
                      key={j}
                      className={`w-1.5 h-1.5 rounded-full ${EVENT_TYPES[e.type].color} ${isSelected ? 'opacity-80' : ''}`}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Event list card ─────────────────────────────────────── */
function EventCard({ event, index, onClick }) {
  const t       = EVENT_TYPES[event.type];
  const TypeIcon = t.icon;
  const pct     = Math.round((event.reg / event.spots) * 100);
  const almostFull = pct >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(event)}
      className={`glass-card rounded-2xl p-4 cursor-pointer group hover:-translate-y-1 transition-all duration-200 border-l-4 ${t.border}`}
    >
      <div className="flex items-start gap-3">
        {/* Date block */}
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${t.bg} flex flex-col items-center justify-center`}>
          <span className={`text-[10px] font-bold uppercase ${t.text}`}>{MONTHS[event.month].slice(0,3)}</span>
          <span className={`text-base font-display font-bold leading-none ${t.text}`}>{event.day}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <TypeIcon size={10} className={t.text} />
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${t.text}`}>{t.label}</span>
            {almostFull && (
              <span className="text-[10px] font-bold text-gold-600 bg-gold-50 dark:bg-gold-900/20 px-1.5 py-0.5 rounded-full ml-auto">Almost Full</span>
            )}
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{event.title}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Clock size={9} /> {event.time.split('–')[0]}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin size={9} /> {event.venue.split(' ').slice(0,2).join(' ')}
            </span>
          </div>
        </div>

        {event.prize && (
          <div className="flex-shrink-0 text-right">
            <p className="text-[10px] text-gray-400">Prize</p>
            <p className="text-xs font-bold text-gold-600">{event.prize}</p>
          </div>
        )}
      </div>

      {/* Spots bar */}
      <div className="mt-2.5 h-1 rounded-full bg-gray-100 dark:bg-green-800/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${almostFull ? 'bg-gold-500' : 'bg-green-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Events section ─────────────────────────────────── */
export default function Events() {
  const today     = new Date();
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selDay, setSelDay]   = useState(null);
  const [modal,  setModal]    = useState(null);
  const [filter, setFilter]   = useState('all');
  const [ref, inView]         = useInView({ threshold: 0.08 });

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y-1); } else setMonth(m => m-1); setSelDay(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y+1); } else setMonth(m => m+1); setSelDay(null); };

  const monthEvents = EVENTS.filter(e => e.year === year && e.month === month);
  const filteredEvents = (filter === 'all' ? monthEvents : monthEvents.filter(e => e.type === filter))
    .sort((a, b) => a.day - b.day);

  const displayedEvents = selDay
    ? filteredEvents.filter(e => e.day === selDay)
    : filteredEvents;

  return (
    <section id="events" ref={ref} className="py-24 md:py-36 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden relative">

      {/* Paddle animation decoration */}
      <motion.div
        className="absolute top-12 right-12 opacity-[0.07] dark:opacity-[0.04] pointer-events-none hidden lg:block"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Lottie animationData={paddleHitData} loop style={{ width: 180, height: 180 }} />
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
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Club Calendar</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading mb-4">Events & Tournaments</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            From weekly social mix sessions to IPTF-sanctioned tournaments — there's always something happening at Picklrs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">

          {/* ── Left: Calendar ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="glass-card rounded-3xl p-6 lg:p-8 lg:sticky lg:top-24"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <motion.button
                onClick={prevMonth}
                whileHover={{ x: -2 }} whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full hover:bg-green-50 dark:hover:bg-green-800 flex items-center justify-center text-gray-500 transition-colors"
              >
                <ChevronLeft size={17} />
              </motion.button>
              <motion.h3
                key={`${year}-${month}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-xl font-bold text-gray-900 dark:text-white"
              >
                {MONTHS[month]} {year}
              </motion.h3>
              <motion.button
                onClick={nextMonth}
                whileHover={{ x: 2 }} whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full hover:bg-green-50 dark:hover:bg-green-800 flex items-center justify-center text-gray-500 transition-colors"
              >
                <ChevronRight size={17} />
              </motion.button>
            </div>

            {/* Calendar */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${year}-${month}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CalendarGrid
                  year={year}
                  month={month}
                  events={monthEvents}
                  onSelect={d => setSelDay(selDay === d ? null : d)}
                  selectedDay={selDay}
                />
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-green-800/50">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Event Types</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {Object.entries(EVENT_TYPES).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setFilter(filter === key ? 'all' : key)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-opacity ${
                      filter !== 'all' && filter !== key ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* This month summary */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { val: monthEvents.filter(e=>e.type==='tournament').length, label:'Tournaments' },
                { val: monthEvents.filter(e=>e.type==='clinic'||e.type==='workshop').length, label:'Clinics' },
                { val: monthEvents.filter(e=>e.type==='social'||e.type==='members').length, label:'Socials' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 dark:bg-green-800/30 rounded-xl p-2.5 text-center">
                  <p className="font-display text-xl font-bold text-green-600 dark:text-green-300">{s.val}</p>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Event list ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                {selDay
                  ? `${MONTHS[month]} ${selDay} · ${displayedEvents.length} event${displayedEvents.length !== 1 ? 's' : ''}`
                  : `${MONTHS[month]} · ${displayedEvents.length} event${displayedEvents.length !== 1 ? 's' : ''}`
                }
              </h3>
              {selDay && (
                <button
                  onClick={() => setSelDay(null)}
                  className="text-xs text-gray-400 hover:text-green-600 transition-colors"
                >
                  Show all ×
                </button>
              )}
            </div>

            {/* Event cards */}
            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {displayedEvents.length > 0 ? (
                  displayedEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} onClick={setModal} />
                  ))
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 text-gray-400"
                  >
                    <Calendar size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No events for this period.</p>
                    <p className="text-xs mt-1">Try a different month or filter.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-6 glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">Host a Private Event?</p>
                <p className="text-xs text-gray-400 mt-0.5">Corporate tournaments, birthday tourneys, and group clinics available.</p>
              </div>
              <MagneticButton
                strength={0.35}
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold text-xs px-5 py-2.5 rounded-full font-semibold whitespace-nowrap flex-shrink-0"
              >
                Enquire
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && <EventModal event={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </section>
  );
}
