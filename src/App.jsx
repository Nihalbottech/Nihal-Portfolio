import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RevealLoader from './components/ui/reveal-loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import ExpoAttended from './sections/ExpoAttended';
import ThreeDPrints from './sections/ThreeDPrints';
import RoboticKit from './sections/RoboticKit';
import Awards from './sections/Awards';
import Certificates from './sections/Certificates';
import Classes from './sections/Classes';
import Contact from './sections/Contact';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <RevealLoader 
        text="MOHAMMED NIHAL M" 
        bgColors={["#6B7280", "#4B5563"]}
        staggerOrder="center-out"
        textFadeDelay={0.5}
      />
      <div className="bg-background min-h-screen text-text font-sans overflow-x-hidden selection:bg-primary selection:text-white antialiased">
        <div className="pattern-bg"></div>
        <Navbar activeSection={activeSection} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ExpoAttended />
        <ThreeDPrints />
        <RoboticKit />
        <Awards />
        <Certificates />
        <Classes />
        <Contact />
      </main>
      
      <footer className="py-8 bg-surface text-center border-t border-borderLine relative z-10">
        <div className="container mx-auto px-6">
          <p className="text-sm text-muted font-medium tracking-wide">
            © {new Date().getFullYear()} Nihal. Engineering Portfolio.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
