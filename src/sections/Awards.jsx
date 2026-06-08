import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

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
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
            <Maximize2 size={20} />
          </div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow relative">
        <div className="absolute -top-10 right-8 w-16 h-16 bg-background rounded-2xl shadow-xl flex items-center justify-center border border-borderLine group-hover:border-primary/50 group-hover:-translate-y-2 transition-all duration-300">
          <IconComponent size={28} className={IconData.color} />
        </div>
        <h4 className="text-xl font-bold text-text mb-3 pr-16">{title}</h4>
        <p className="text-primary text-sm font-medium mb-4">{event}</p>
        <p className="text-muted text-sm leading-relaxed mb-6 flex-grow">{desc}</p>
      </div>
    </motion.div>
  );
};

const Awards = () => {
  const { data } = usePortfolio();
  const awardsData = data?.awards || [];
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
            className="fixed inset-0 z-[100] flex flex-col items-center justify-start md:justify-center bg-[#0B1220]/95 backdrop-blur-md p-4 md:p-8 overflow-y-auto pt-24 md:pt-8"
            onClick={() => setActiveIndex(null)}
          >
            {/* Top Right Close */}
            <button 
              className="fixed top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-surface/50 hover:bg-red-500/90 border border-borderLine hover:border-red-500 flex items-center justify-center text-muted hover:text-white transition-all pointer-events-auto shadow-lg z-[120]"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              title="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center z-[105] max-h-none md:max-h-full w-full pb-32 md:pb-0" onClick={(e) => e.stopPropagation()}>
              {/* Media Container */}
              <motion.div 
                key={`media-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-auto h-auto max-w-[100vw] md:max-w-[60vw] max-h-none md:max-h-[75vh] rounded-2xl overflow-visible md:overflow-hidden shadow-2xl border border-white/20 flex flex-col items-center justify-center bg-black/50 shrink-0"
              >
                <img 
                  src={awardsData[activeIndex].image} 
                  alt={awardsData[activeIndex].title} 
                  className="w-auto h-auto max-w-full max-h-[60vh] md:max-h-[75vh] object-contain rounded-2xl"
                />
              </motion.div>

              {/* Text Sidebar */}
              <motion.div 
                key={`text-${activeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full md:w-[400px] mt-6 md:mt-0 md:ml-8 bg-surface/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 md:p-8 z-[105] shrink-0"
              >
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{awardsData[activeIndex].title}</h3>
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
              className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6 bg-surface/90 backdrop-blur-lg border border-borderLine px-6 py-3 rounded-full shadow-2xl z-[120]"
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
