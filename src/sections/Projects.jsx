import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import contentData from '../data/content.json';

const ProjectCard = ({ project, index, onClick }) => {
  const isVideo = project.src && project.src.endsWith('.mp4');

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onClick(index)}
      className="break-inside-avoid mb-6 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 cursor-pointer border border-borderLine hover:border-primary group relative bg-surface"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-transparent to-primary/0 group-hover:from-primary/20 group-hover:to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 pointer-events-none mix-blend-overlay" />
      
      <div className="w-full relative overflow-hidden flex items-center justify-center bg-black/20">
        {isVideo ? (
          <video 
            src={project.src} 
            className="w-full h-auto object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        ) : (
          <img 
            src={project.src} 
            alt={project.title || "Project showcase"} 
            className="w-full h-auto object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
          />
        )}
        
        {/* Sleek Minimal Play Overlay with Backdrop Blur */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm z-20">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] transform scale-50 group-hover:scale-110 transition-all duration-500 ease-out">
            <Play fill="currentColor" size={24} className="ml-1" />
          </div>
          <span className="text-white font-semibold tracking-[0.2em] uppercase text-xs mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {project.title ? 'View Project' : 'View Media'}
          </span>
        </div>
      </div>
      
      {/* Title block for cards that have a specific title */}
      {project.title && (
        <div className="p-5 border-t border-borderLine bg-surface">
          <h4 className="text-lg font-bold text-text mb-1">{project.title}</h4>
          {project.date && <p className="text-xs font-semibold text-primary mb-2 tracking-wider">{project.date}</p>}
          {project.quote && <p className="text-sm text-muted italic line-clamp-2">{project.quote}</p>}
        </div>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const projectsData = contentData.projects || [];

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
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const activeProject = activeIndex !== null ? projectsData[activeIndex] : null;

  return (
    <section id="projects" className="py-24 bg-background border-b border-borderLine relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Portfolio</h2>
            <h3 className="text-3xl font-display font-bold text-text">Featured Engineering Projects</h3>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={index}
                index={index}
                project={project}
                onClick={setActiveIndex}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sleek Focused Media Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col md:flex-row items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveIndex(null)}
          >
            
            {/* Top Right Close */}
            <button 
              className="fixed top-6 right-6 md:top-8 md:right-8 px-4 h-12 rounded-full bg-white/10 hover:bg-red-500/90 border border-white/20 hover:border-red-500 flex items-center justify-center space-x-2 text-white transition-all pointer-events-auto shadow-lg z-[120]"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              title="Close"
            >
              <X size={20} strokeWidth={2} />
              <span className="font-medium pr-1 text-sm tracking-wide">Back</span>
            </button>

            {/* Media Container */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full md:w-auto h-auto max-w-[95vw] md:max-w-[70vw] max-h-[75vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center bg-black/50 z-[105] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {activeProject.images ? (
                <div className="flex flex-col gap-4 p-4 w-full h-full items-center">
                  {activeProject.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={activeProject.title || `Project Image ${idx + 1}`} 
                      className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-xl"
                    />
                  ))}
                </div>
              ) : activeProject.videoSrc ? (
                <div className="flex flex-col gap-4 p-4 w-full h-full items-center">
                  <video 
                    src={activeProject.videoSrc} 
                    autoPlay 
                    loop
                    muted
                    playsInline
                    className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl"
                  />
                  {activeProject.extraImages && activeProject.extraImages.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={activeProject.title || `Project Image ${idx + 1}`} 
                      className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-xl"
                    />
                  ))}
                </div>
              ) : activeProject.src.endsWith('.mp4') ? (
                <video 
                  src={activeProject.src} 
                  autoPlay 
                  loop
                  muted
                  playsInline
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl"
                />
              ) : (
                <img 
                  src={activeProject.src} 
                  alt={`Project ${activeIndex}`} 
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-xl"
                />
              )}
            </motion.div>

            {/* Project Details Sidebar (if available) */}
            {activeProject.title && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full md:w-[400px] mt-6 md:mt-0 md:ml-8 bg-surface/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 z-[105]"
              >
                <h3 className="text-3xl font-display font-bold text-white mb-2">{activeProject.title}</h3>
                {activeProject.date && <p className="text-primary font-semibold tracking-wider text-sm mb-1">{activeProject.date}</p>}
                {activeProject.association && <p className="text-white/50 text-xs mb-6 tracking-wide">{activeProject.association}</p>}
                {activeProject.quote && <p className="text-white/80 italic text-lg mb-6 border-l-2 border-primary pl-4">{activeProject.quote}</p>}
                {activeProject.description && <p className="text-white/60 leading-relaxed text-sm">{activeProject.description}</p>}
              </motion.div>
            )}



          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
