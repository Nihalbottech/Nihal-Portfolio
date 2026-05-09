import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Cpu, Maximize2 } from 'lucide-react';

import k1 from '../assets/Robotic Kit/WhatsApp Image 2026-04-18 at 11.28.37 AM.jpeg';
import k2 from '../assets/Robotic Kit/WhatsApp Image 2026-04-18 at 11.28.33 AM.jpeg';
import k3 from '../assets/Robotic Kit/WhatsApp Image 2026-04-18 at 11.28.32 AM.jpeg';

const kitImages = [k1, k2, k3];

const KitCard = ({ image, index, onClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    onClick={() => onClick(index)}
    className="break-inside-avoid mb-5 rounded-2xl overflow-hidden border border-borderLine hover:border-primary transition-all duration-500 cursor-pointer group relative bg-surface shadow-md hover:shadow-2xl hover:shadow-primary/40"
  >
    {/* Premium Glow Overlay */}
    <div className="absolute inset-0 bg-gradient-to-bl from-primary/0 via-transparent to-primary/0 group-hover:from-primary/20 group-hover:to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 pointer-events-none mix-blend-overlay" />
    
    <div className="relative overflow-hidden bg-black/20 aspect-square">
      <img
        src={image}
        alt={`Robotic Kit ${index + 1}`}
        className="w-full h-full object-cover transform group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700 ease-out"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm z-20">
        <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(150,148,184,0.6)] transform scale-50 group-hover:scale-110 transition-all duration-500 ease-out">
          <Maximize2 size={24} />
        </div>
        <span className="text-white font-semibold tracking-[0.2em] uppercase text-xs mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          Expand Kit
        </span>
      </div>
    </div>
  </motion.div>
);

const RoboticKit = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % kitImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + kitImages.length) % kitImages.length);
  };

  return (
    <section id="robotickit" className="py-24 bg-surface border-b border-borderLine relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Hardware Arsenal</h2>
            <h3 className="text-3xl font-display font-bold text-text flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-background border border-borderLine flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </span>
              Robotic Kit
            </h3>
          </div>
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-background border border-borderLine rounded-full text-muted text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>{kitImages.length} components</span>
          </div>
        </motion.div>

        {/* Grid Layout for 3 Items */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {kitImages.map((src, index) => (
            <KitCard key={index} image={src} index={index} onClick={setActiveIndex} />
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/10 hover:bg-red-500/90 border border-white/20 hover:border-red-500 flex items-center justify-center text-white transition-all z-[110] shadow-lg"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
            >
              <X size={24} strokeWidth={2} />
            </button>

            {/* Media */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-[95vw] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/50 z-[105] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={kitImages[activeIndex]}
                alt={`Robotic Kit ${activeIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>

            {/* Bottom Navigation */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-black/80 backdrop-blur-lg border border-white/20 px-6 py-3 rounded-full shadow-xl z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="text-white/60 hover:text-white transition-colors" onClick={handlePrev}>
                <ChevronLeft size={28} />
              </button>
              <span className="text-white font-medium tracking-widest text-sm w-16 text-center">
                {activeIndex + 1} / {kitImages.length}
              </span>
              <button className="text-white/60 hover:text-white transition-colors" onClick={handleNext}>
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default RoboticKit;
