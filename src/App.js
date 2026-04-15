import React, { useState, useEffect } from 'react';
import './index.css';

import Loader         from './components/Loader';
import Cursor         from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import Courts         from './components/Courts';
import Facilities     from './components/Facilities';
import Booking        from './components/Booking';
import Membership     from './components/Membership';
import Events         from './components/Events';
import Gallery        from './components/Gallery';
import Testimonials   from './components/Testimonials';
import Contact        from './components/Contact';
import Footer         from './components/Footer';

function App() {
  const [loading,  setLoading]  = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  if (loading) return <Loader />;

  return (
    <div className={`font-body min-h-screen ${darkMode ? 'dark bg-green-900' : 'bg-white'}`}>
      <Cursor />
      <ScrollProgress />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Courts />
      <Facilities />
      <Booking />
      <Membership />
      <Events />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
