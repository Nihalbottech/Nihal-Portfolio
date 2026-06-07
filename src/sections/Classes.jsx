import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Maximize2 } from 'lucide-react';

import c1 from '../assets/Classes/WhatsApp Image 2026-04-14 at 3.23.32 PM.jpeg';
import c2 from '../assets/Classes/WhatsApp Image 2026-04-14 at 3.25.35 PM.jpeg';
import c3 from '../assets/Classes/WhatsApp Image 2026-04-14 at 3.24.07 PM.jpeg';
import c4 from '../assets/Classes/WhatsApp Image 2026-04-14 at 3.29.23 PM.jpeg';
import c5 from '../assets/Classes/WhatsApp Image 2026-04-14 at 3.29.26 PM.jpeg';

const classImages = [c1, c2, c3, c4, c5];

const ClassCard = ({ image, index, onClick }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.02 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
    onClick={() => onClick(index)}
    className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-borderLine hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-surface shadow-lg"
  >
    <img
      src={image}
      alt={`Class session ${index + 1}`}
      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
    
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
      <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
        <Maximize2 size={20} />
      </div>
    </div>
  </motion.div>
);

const Classes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % classImages.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + classImages.length) % classImages.length);
  };

  return (
  return (
    <>
      <section id="classes" className="py-24 bg-background border-b border-borderLine relative z-10 overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3 text-primary">Mentorship</h2>
            <h3 className="text-4xl font-display font-bold text-text mb-4">Hands-on Classes</h3>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Glimpses into my training sessions where I mentor students in robotics, 3D design, and embedded systems.
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {classImages.map((src, index) => (
              <ClassCard key={index} image={src} index={index} onClick={setActiveIndex} />
            ))}
            
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-8 bg-surface border border-dashed border-borderLine rounded-2xl text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h4 className="text-xl font-bold text-text mb-2">Interactive Learning</h4>
              <p className="text-sm text-muted">Focusing on practical problem-solving and real-world hardware experience.</p>
            </motion.div>
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1220]/98 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/50 hover:bg-red-500/90 border border-borderLine hover:border-red-500 flex items-center justify-center text-muted hover:text-white transition-all z-[110] shadow-lg"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
              title="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-[90vw] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-borderLine"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={classImages[activeIndex]}
                alt={`Class session ${activeIndex + 1}`}
                className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
              />
            </motion.div>

            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-surface/80 backdrop-blur-lg border border-borderLine px-6 py-3 rounded-full shadow-xl z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="text-muted hover:text-primary transition-colors" onClick={handlePrev}>
                <ChevronLeft size={28} />
              </button>
              <span className="text-text font-medium tracking-widest text-sm w-16 text-center">
                {activeIndex + 1} / {classImages.length}
              </span>
              <button className="text-muted hover:text-primary transition-colors" onClick={handleNext}>
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Classes;
