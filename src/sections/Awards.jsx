import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import contentData from '../data/content.json';

const IconMap = {
  'Trophy': { component: Trophy, color: 'text-primary' },
  'Star': { component: Star, color: 'text-accent' },
  'Award': { component: Award, color: 'text-primary' }
};

const AwardCard = ({ title, event, desc, iconName, image, index, onClick }) => {
  const IconData = IconMap[iconName] || IconMap['Star'];
  const IconComponent = IconData.component;

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-surface rounded-2xl overflow-hidden border border-borderLine hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/20 flex flex-col h-full group cursor-pointer"
      onClick={() => onClick(index)}
    >
      <div className="w-full h-64 overflow-hidden relative bg-black/20">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-80"></div>
        
        {/* Hover Expand Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
          <Maximize2 size={18} />
        </div>
      </div>
      
      <div className="p-8 pt-4 flex-grow flex flex-col relative z-10">
        <div className="flex items-center space-x-4 mb-5 transform -translate-y-10">
          <div className="w-16 h-16 rounded-2xl bg-surface border-2 border-borderLine flex items-center justify-center shrink-0 shadow-xl group-hover:border-primary/50 transition-colors">
            <IconComponent className={`w-8 h-8 ${IconData.color} stroke-[1.5]`} />
          </div>
        </div>
        
        <div className="-mt-8">
          <h4 className="text-xl font-bold text-text leading-tight group-hover:text-primary transition-colors">{title}</h4>
          <span className="text-xs font-semibold tracking-wider text-muted uppercase mt-2 block mb-4">{event}</span>
        </div>
        <div className="text-muted text-sm leading-relaxed flex-grow whitespace-pre-line">
          {desc}
        </div>
      </div>
    </motion.div>
  );
};

const Awards = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const awardsData = contentData.awards || [];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % awardsData.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + awardsData.length) % awardsData.length);
  };

  const activeAward = activeIndex !== null ? awardsData[activeIndex] : null;

  return (
    <>
      <section id="awards" className="py-24 bg-surface/30 border-b border-borderLine relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Recognition</h2>
              <h3 className="text-3xl font-display font-bold text-text">Awards & Achievements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awardsData.map((award, index) => (
                <AwardCard 
                  key={index}
                  index={index}
                  title={award.title}
                  event={award.event}
                  desc={award.desc}
                  iconName={award.icon}
                  image={award.image}
                  onClick={setActiveIndex}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal for Awards */}
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

            <div className="flex flex-col md:flex-row items-center justify-center z-[105] max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Media Container */}
              <motion.div 
                key={`media-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-auto h-auto max-w-[95vw] md:max-w-[60vw] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col items-center justify-center bg-black/50"
              >
                <img 
                  src={awardsData[activeIndex].image} 
                  alt={awardsData[activeIndex].title} 
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-2xl"
                />
              </motion.div>

              {/* Text Sidebar */}
              <motion.div 
                key={`text-${activeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-[400px] mt-6 md:mt-0 md:ml-8 bg-surface/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 z-[105]"
              >
                <h3 className="text-3xl font-display font-bold text-white mb-2">{awardsData[activeIndex].title}</h3>
                <p className="text-primary font-semibold tracking-wider text-sm mb-6 uppercase">{awardsData[activeIndex].event}</p>
                {awardsData[activeIndex].desc && (
                  <div className="text-white/80 leading-relaxed text-sm border-l-2 border-primary/50 pl-4">
                    {awardsData[activeIndex].desc}
                  </div>
                )}
              </motion.div>
            </div>

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
                {activeIndex + 1} / {awardsData.length}
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

export default Awards;
