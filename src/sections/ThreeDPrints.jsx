import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Box, Maximize2 } from 'lucide-react';

import p1 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.14 AM (1).jpeg';
import p2 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.14 AM.jpeg';
import p3 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.15 AM (1).jpeg';
import p4 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.15 AM.jpeg';
import p5 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.15 AM (2).jpeg';
import p6 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.16 AM (1).jpeg';
import p7 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.16 AM.jpeg';
import p8 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.17 AM (1).jpeg';
import p9 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.17 AM (2).jpeg';
import p10 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.17 AM.jpeg';
import p11 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.18 AM (1).jpeg';
import p12 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.18 AM (2).jpeg';
import p13 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.18 AM (3).jpeg';
import p14 from '../assets/Awards/3D Printed/WhatsApp Image 2026-04-18 at 11.28.18 AM.jpeg';

const prints = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14];

const PrintCard = ({ image, index, onClick }) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    onClick={() => onClick(index)}
    className="break-inside-avoid mb-5 rounded-2xl overflow-hidden border border-borderLine hover:border-accent transition-all duration-500 cursor-pointer group relative bg-surface shadow-md hover:shadow-2xl hover:shadow-accent/40"
  >
    {/* Premium Glow Overlay */}
    <div className="absolute inset-0 bg-gradient-to-bl from-accent/0 via-transparent to-accent/0 group-hover:from-accent/20 group-hover:to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 pointer-events-none mix-blend-overlay" />
    
    <div className="relative overflow-hidden bg-black/20">
      <img
        src={image}
        alt={`3D Print ${index + 1}`}
        className="w-full h-auto object-cover transform group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700 ease-out"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm z-20">
        <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(16,185,129,0.6)] transform scale-50 group-hover:scale-110 transition-all duration-500 ease-out">
          <Maximize2 size={24} />
        </div>
        <span className="text-white font-semibold tracking-[0.2em] uppercase text-xs mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          Expand Design
        </span>
      </div>
    </div>
  </motion.div>
);

const ThreeDPrints = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % prints.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + prints.length) % prints.length);
  };

  return (
    <>
      <section id="3dprints" className="py-24 bg-surface border-b border-borderLine relative z-10 overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

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
              <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Design Portfolio</h2>
              <h3 className="text-3xl font-display font-bold text-text flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-background border border-borderLine flex items-center justify-center">
                  <Box className="w-5 h-5 text-accent" />
                </span>
                3D designs
              </h3>
            </div>
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-background border border-borderLine rounded-full text-muted text-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span>{prints.length} designs</span>
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5"
          >
            {prints.map((src, index) => (
              <PrintCard key={index} image={src} index={index} onClick={setActiveIndex} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1220]/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/50 hover:bg-red-500/90 border border-borderLine hover:border-red-500 flex items-center justify-center text-muted hover:text-white transition-all z-[110] shadow-lg"
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
              className="relative max-w-[95vw] max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl border border-borderLine bg-black/50 z-[105] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={prints[activeIndex]}
                alt={`3D Print ${activeIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>

            {/* Bottom Navigation */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-surface/80 backdrop-blur-lg border border-borderLine px-6 py-3 rounded-full shadow-xl z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="text-muted hover:text-accent transition-colors" onClick={handlePrev}>
                <ChevronLeft size={28} />
              </button>
              <span className="text-text font-medium tracking-widest text-sm w-16 text-center">
                {activeIndex + 1} / {prints.length}
              </span>
              <button className="text-muted hover:text-accent transition-colors" onClick={handleNext}>
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThreeDPrints;
