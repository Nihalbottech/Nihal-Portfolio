import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About',        href: '#about' },
  { name: 'Skills',       href: '#skills' },
  { name: 'Projects',     href: '#projects' },
  { name: 'Expo',         href: '#expo' },
  { name: '3D Designs',   href: '#3dprints' },
  { name: 'Awards',       href: '#awards' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Classes',      href: '#classes' },
];

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/85 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xl font-display font-bold tracking-tight text-text shrink-0 z-10"
            >
              Nihal<span className="text-primary">.</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted hover:text-text'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex shrink-0">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                className="px-5 py-2 bg-primary/10 text-primary border border-primary/20 text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              >
                Contact Me
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-surface transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-borderLine shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-borderLine">
                <span className="text-lg font-display font-bold text-text">
                  Nihal<span className="text-primary">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-muted hover:text-text hover:bg-background transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'text-muted hover:text-text hover:bg-background'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer Footer CTA */}
              <div className="px-4 py-5 border-t border-borderLine">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
                  className="block w-full text-center px-5 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
