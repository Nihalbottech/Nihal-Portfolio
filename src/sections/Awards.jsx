import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Star, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

import img1 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.19 AM.jpeg';
import img2 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.20 AM (1).jpeg';
import img3 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.20 AM.jpeg';
import img4 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.21 AM (1).jpeg';
import img5 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.22 AM.jpeg';
import img6 from '../assets/Awards/WhatsApp Image 2026-04-18 at 11.29.21 AM.jpeg';
import classImg1 from '../assets/Awards/Class/WhatsApp Image 2026-04-18 at 11.28.58 AM.jpeg';
import classImg2 from '../assets/Awards/Class/WhatsApp Image 2026-04-18 at 11.28.59 AM.jpeg';

const AwardCard = ({ title, event, desc, icon, image, index, onClick }) => {
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
            {icon}
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const awardsData = [
    {
      title: "1st Place - Project Expo",
      event: "THARANG 2K24",
      desc: "Developed a fully automated AI-powered wheelchair integrating joystick, eye, and voice control with smart navigation and safety features. Recognized for innovation, real-world impact, and advanced robotics application.",
      icon: <Trophy className="w-8 h-8 text-primary stroke-[1.5]" />,
      image: img6
    },
    {
      title: "1st Place - Shark Tank Pitch",
      event: "Tech Fest 2K24",
      desc: "Achieved 1st place in the Shark Tank–style Idea Pitch Competition. Presented an innovative business idea with strong real-world application and scalability. Proud to have competed against college students and secured the top spot.",
      icon: <Star className="w-8 h-8 text-accent stroke-[1.5]" />,
      image: img2
    },
    {
      title: "2nd Place - Robo Race",
      event: "THARANG 2K24",
      desc: "Secured 2nd place in Robo Race. Designed and raced a high-speed robot optimized for agility, stability, and obstacle navigation. Recognized for engineering skill, precision control, and competitive performance.",
      icon: <Award className="w-8 h-8 text-success stroke-[1.5]" />,
      image: img3
    },
    {
      title: "Special Recognition Award",
      event: "Edu AI Expo, IHRD Perinthalmanna",
      desc: "Honored with a special award for successfully organizing the Robotics Expo. The event showcased cutting-edge robotics projects and inspired students toward innovation. Recognized for leadership, coordination, and contribution to the success of the expo.",
      icon: <Star className="w-8 h-8 text-primary stroke-[1.5]" />,
      image: img4
    },
    {
      title: "Team Thanks Award",
      event: "ProjectX, Exceligentia 2025",
      desc: "Received the Team Thanks Award from ProjectX. Recognized for valuable support at Exceligentia 2025. Part of South India’s Biggest Students Innovators Summit.",
      icon: <Award className="w-8 h-8 text-accent stroke-[1.5]" />,
      image: img5
    },
    {
      title: "1st Place - Science Fair",
      event: "Sub District Science Fair",
      desc: "Secured 1st place for presenting an innovative science project. Recognized for creativity, practical application, and problem-solving skills. This achievement strengthened my passion for STEM and real-world innovation.",
      icon: <Trophy className="w-8 h-8 text-success stroke-[1.5]" />,
      image: img1
    },
    {
      title: "Class Leadership Recognition",
      event: "Academic Year 2024",
      desc: "Recognized for outstanding leadership and active participation in class activities and organizational roles.",
      icon: <Star className="w-8 h-8 text-primary stroke-[1.5]" />,
      image: classImg1
    },
    {
      title: "Excellence in Class Performance",
      event: "Academic Year 2024",
      desc: "Commended for consistent academic performance and dedication to learning throughout the academic year.",
      icon: <Award className="w-8 h-8 text-accent stroke-[1.5]" />,
      image: classImg2
    }
  ];

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % awardsData.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + awardsData.length) % awardsData.length);
  };

  return (
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
                icon={award.icon}
                image={award.image}
                onClick={setActiveIndex}
              />
            ))}
          </div>
        </motion.div>
      </div>

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

            {/* Media Container */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-auto h-auto max-w-[95vw] max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-borderLine flex flex-col items-center justify-center bg-surface z-[105]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={awardsData[activeIndex].image} 
                alt={awardsData[activeIndex].title} 
                className="w-auto h-auto max-w-full max-h-[60vh] object-contain rounded-t-2xl bg-black/50"
              />
              <div className="p-6 w-full text-center border-t border-borderLine bg-surface/90 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-text mb-1">{awardsData[activeIndex].title}</h4>
                <p className="text-primary text-sm font-semibold">{awardsData[activeIndex].event}</p>
              </div>
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
    </section>
  );
};

export default Awards;
