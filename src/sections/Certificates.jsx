import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Award } from 'lucide-react';

import cert1 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.37 AM (1).jpeg';
import cert2 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.37 AM (2).jpeg';
import cert3 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.37 AM.jpeg';
import cert4 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.38 AM (1).jpeg';
import cert5 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.38 AM (2).jpeg';
import cert6 from '../assets/Certificates/WhatsApp Image 2026-04-18 at 11.29.38 AM.jpeg';

const CertificateCard = ({ image, index, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onClick(index)}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer border border-borderLine hover:border-primary/50 group relative bg-surface aspect-[1.414/1]"
    >
      <div className="w-full h-full relative overflow-hidden bg-black/20 p-2">
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          <img 
            src={image} 
            alt={`Certificate ${index + 1}`} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
              <Maximize2 size={20} className="ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const certificates = [
    cert6, cert2, cert1, cert5, cert3, cert4
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <>
      <section id="certificates" className="py-24 bg-background border-b border-borderLine relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12 flex items-center space-x-4">
              <div>
                <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Qualifications</h2>
                <h3 className="text-3xl font-display font-bold text-text">Professional Certificates</h3>
              </div>
              <div className="hidden md:flex ml-auto w-16 h-16 rounded-2xl bg-surface border border-borderLine items-center justify-center shadow-lg">
                 <Award className="text-primary w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <CertificateCard 
                  key={index}
                  index={index}
                  image={cert}
                  onClick={setActiveIndex}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sleek Lightbox Modal */}
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
            
            {/* Top Right Close */}
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/50 hover:bg-red-500/90 border border-borderLine hover:border-red-500 flex items-center justify-center text-muted hover:text-white transition-all pointer-events-auto shadow-lg z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              title="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            {/* Media Container */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-auto h-auto max-w-[95vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-borderLine flex items-center justify-center bg-black/50 z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={certificates[activeIndex]} 
                alt={`Certificate ${activeIndex + 1}`} 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>

            {/* Elegant Bottom Pagination Controls */}
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-surface/80 backdrop-blur-lg border border-borderLine px-6 py-3 rounded-full shadow-xl z-[110]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="text-muted hover:text-primary transition-colors flex items-center justify-center"
                onClick={handlePrev}
              >
                <ChevronLeft size={28} />
              </button>
              
              <span className="text-text font-medium tracking-widest text-sm w-16 text-center">
                {activeIndex + 1} / {certificates.length}
              </span>

              <button 
                className="text-muted hover:text-primary transition-colors flex items-center justify-center"
                onClick={handleNext}
              >
                <ChevronRight size={28} />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certificates;
