import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Training = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const programs = [
    {
      id: 1,
      title: "Embedded Systems Mastery",
      level: "Advanced | 8 Weeks",
      desc: "Deep dive into microcontrollers, RTOS, and writing efficient C/C++ code for hardware integration.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Robotics Fundamentals",
      level: "Beginner | 4 Weeks",
      desc: "An introduction to kinematics, sensors, and basic motor control loops with hands-on building.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Advanced 3D Printing",
      level: "Intermediate | 6 Weeks",
      desc: "Learn advanced slicing techniques, material science for FDM/SLA, and design for additive manufacturing.",
      image: "https://images.unsplash.com/photo-1596495610815-562629b3a37b?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % programs.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length);

  return (
    <section id="training" className="py-24 bg-surface border-b border-borderLine relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Education</h2>
            <h3 className="text-3xl font-display font-bold text-text mb-4">Training & Classes</h3>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Hands-on engineering classes focusing on practical hardware deployment and logic architecture.
            </p>
          </div>

          <div className="relative h-[450px] flex items-center justify-center">
            <div className="w-full max-w-5xl h-full relative perspective-1000">
              <AnimatePresence initial={false}>
                {programs.map((program, idx) => {
                  // Determine relative position
                  let position = "hidden";
                  if (idx === currentIndex) position = "center";
                  else if (idx === (currentIndex - 1 + programs.length) % programs.length) position = "left";
                  else if (idx === (currentIndex + 1) % programs.length) position = "right";

                  if (position === "hidden") return null;

                  const isCenter = position === "center";
                  const xOffset = position === "left" ? "-40%" : position === "right" ? "40%" : "0%";
                  const scale = isCenter ? 1 : 0.85;
                  const zIndex = isCenter ? 30 : 20;
                  const opacity = isCenter ? 1 : 0.4;

                  return (
                    <motion.div
                      key={program.id}
                      initial={false}
                      animate={{
                        x: xOffset,
                        scale: scale,
                        opacity: opacity,
                        zIndex: zIndex
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[80%] md:w-[60%] h-full rounded-2xl overflow-hidden bg-background border border-borderLine shadow-2xl"
                    >
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <span className="inline-block px-3 py-1 mb-3 bg-surface/80 backdrop-blur-sm text-primary text-xs font-semibold rounded-lg border border-primary/20">
                          {program.level}
                        </span>
                        <h4 className="text-2xl font-bold text-text mb-2">{program.title}</h4>
                        <p className={`text-sm text-muted line-clamp-2 transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                          {program.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-40 px-4 md:px-0 pointer-events-none">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-surface/80 border border-borderLine flex items-center justify-center text-text backdrop-blur-md hover:bg-primary hover:text-white transition-colors pointer-events-auto"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-surface/80 border border-borderLine flex items-center justify-center text-text backdrop-blur-md hover:bg-primary hover:text-white transition-colors pointer-events-auto"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Training;
