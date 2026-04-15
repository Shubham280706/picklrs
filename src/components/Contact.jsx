import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Share2, Rss, Globe, AtSign } from 'lucide-react';

const socials = [
  { icon: AtSign,  label: 'Instagram', href: '#', color: 'hover:text-pink-500' },
  { icon: Globe,   label: 'Facebook',  href: '#', color: 'hover:text-blue-600' },
  { icon: Share2,  label: 'Twitter',   href: '#', color: 'hover:text-sky-500' },
  { icon: Rss,     label: 'YouTube',   href: '#', color: 'hover:text-red-600' },
];

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView]           = useInView({ threshold: 0.1 });

  const validate = () => {
    const e = {};
    if (!form.name.trim())                    e.name    = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim())                 e.message = 'Message is required';
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm(f => ({ ...f, [field]: ev.target.value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white dark:bg-green-800/40 border ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
        : 'border-gray-200 dark:border-green-700/50 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-100 dark:focus:ring-green-800'
    } rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 transition-all duration-200`;

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-gray-50/70 dark:bg-green-900/60 overflow-hidden">
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
            <span className="text-xs font-semibold tracking-[0.25em] text-gold-600 uppercase">Get in Touch</span>
            <div className="gold-divider" />
          </div>
          <h2 className="section-heading mb-4">Contact & Location</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
            Have questions about membership or want to visit? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left — info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Contact details */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              {[
                { icon: MapPin, label: 'Location',   text: 'Picklrs Club, Alkapuri Road, Vadodara, Gujarat 390007' },
                { icon: Phone,  label: 'Phone',       text: '+91 98765 43210' },
                { icon: Mail,   label: 'Email',       text: 'hello@picklrs.in' },
                { icon: Clock,  label: 'Hours',       text: 'Mon–Sun: 6:00 AM – 10:00 PM' },
              ].map(c => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-800/60 flex items-center justify-center flex-shrink-0">
                    <c.icon size={16} className="text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{c.label}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map card */}
            <a
              href="https://maps.app.goo.gl/naYXWMtLF7KavTRL6"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative rounded-2xl overflow-hidden h-56 glass-card group cursor-pointer"
            >
              {/* Stylised court-pattern background */}
              <svg className="w-full h-full" viewBox="0 0 480 224" preserveAspectRatio="xMidYMid slice" fill="none">
                <defs>
                  <linearGradient id="map-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#1e6e4c" />
                    <stop offset="100%" stopColor="#0f3d2a" />
                  </linearGradient>
                </defs>
                <rect width="480" height="224" fill="url(#map-bg)" />
                {/* Grid lines */}
                {[60,120,180,240,300,360,420].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="224" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                ))}
                {[56,112,168].map(y => (
                  <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                ))}
                {/* Court outline */}
                <rect x="100" y="40" width="280" height="144" stroke="white" strokeOpacity="0.15" strokeWidth="1.5" />
                <line x1="100" y1="112" x2="380" y2="112" stroke="white" strokeOpacity="0.2" strokeWidth="2.5" strokeDasharray="10 6" />
                <line x1="240" y1="40"  x2="240" y2="184" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                {/* Pin */}
                <circle cx="240" cy="100" r="14" fill="#d4a017" opacity="0.9" />
                <circle cx="240" cy="100" r="6"  fill="white" />
                <circle cx="240" cy="100" r="28" stroke="#d4a017" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
              </svg>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-green-700 text-xs font-semibold px-4 py-2 rounded-full shadow-card">
                  Open in Google Maps ↗
                </span>
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-green-900/90 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-card">
                <MapPin size={12} className="text-green-600" />
                <span className="text-xs font-semibold text-gray-800 dark:text-white">Picklrs · Vadodara</span>
              </div>
            </a>

            {/* Socials */}
            <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Follow Us</p>
              <div className="flex gap-3">
                {socials.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-9 h-9 rounded-xl bg-gray-100 dark:bg-green-800 flex items-center justify-center text-gray-500 dark:text-gray-400 transition-colors duration-200 ${s.color}`}
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="glass-card rounded-2xl p-7"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-800/60 flex items-center justify-center mb-4">
                  <CheckCircle2 size={28} className="text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="mt-6 btn-outline text-sm px-6 py-2.5"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Arjun Mehta"
                    value={form.name}
                    onChange={handleChange('name')}
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Email *</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={inputClass('phone')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Enquiry Type</label>
                  <select className={inputClass('type')}>
                    <option>Membership Enquiry</option>
                    <option>Court Booking</option>
                    <option>Coaching</option>
                    <option>Corporate / Events</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange('message')}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                >
                  <Send size={14} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
