import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';


import img2 from '../assets/Projects/WhatsApp Image 2026-04-18 at 11.27.25 AM.jpeg';

import img3 from '../assets/Projects/2.jpg';
import img4 from '../assets/Projects/1.2.jpeg';
import imgBpm1 from '../assets/Projects/1.jpg';
import imgBpm2 from '../assets/Projects/1.1.jpg';
import imgAcid1 from '../assets/Projects/2.jpg';
import imgAcid2 from '../assets/Projects/2.2.jpg';
import imgAcid3 from '../assets/Projects/2.1.jpg';

import vid1 from '../assets/Projects/WhatsApp Video 2026-04-18 at 11.27.28 AM.mp4';
import vid2 from '../assets/Projects/WhatsApp Video 2026-04-18 at 11.27.29 AM.mp4';
import vid3 from '../assets/Projects/WhatsApp Video 2026-04-18 at 11.27.30 AM.mp4';
import vid4 from '../assets/Projects/WhatsApp Video 2026-04-18 at 11.27.48 AM.mp4';
import vidSession1 from '../assets/Projects/WhatsApp Video 2026-05-07 at 2.35.48 PM.mp4';
import vidSession2 from '../assets/Projects/WhatsApp Video 2026-05-07 at 2.36.15 PM.mp4';
import vidSession3 from '../assets/Projects/WhatsApp Video 2026-05-07 at 2.36.15 PM (1).mp4';
import imgRoboDog from '../assets/Projects/1758561548814.jpg';
import imgJoy1 from '../assets/Projects/1758559081994.jpg';
import imgJoy2 from '../assets/Projects/1758559113593.jpg';
import imgRoboArm from '../assets/Projects/robotic arm.jpg';
import imgOtto from '../assets/Projects/otto.jpg';
import imgLdr from '../assets/Projects/ldr.jpg';
import imgAlexa from '../assets/Projects/alexaa.jpg';
import imgRoboRace from '../assets/Projects/robo csae.jpg';
import imgHeight from '../assets/Projects/smaart.jpg';
import imgAr1 from '../assets/Projects/ar.jpg';
import imgAr2 from '../assets/Projects/aar1.jpg';
import imgAr3 from '../assets/Projects/ar2.jpg';
import imgWild from '../assets/Projects/wild.jpg';
import imgRes1 from '../assets/Projects/1764080426222.jpg';
import imgRes2 from '../assets/Projects/1764080424993.jpg';
import imgTools from '../assets/Projects/1760533643297.jpg';
import imgKb1 from '../assets/Projects/k.jpg';
import imgKb2 from '../assets/Projects/k1.jpg';
import imgKb3 from '../assets/Projects/k3.jpg';
import imgCa1 from '../assets/Projects/ca.jpg';
import imgCa2 from '../assets/Projects/cas.jpg';
import imgCa3 from '../assets/Projects/case.jpg';

const ProjectCard = ({ project, index, onClick }) => {
  const isVideo = project.src.endsWith('.mp4');

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  const projectsData = [
    // === FLAGSHIP ROBOTICS ===
    {
      src: vid3,
      images: null,
      videoSrc: vid3,
      extraImages: [imgRoboDog],
      title: "Robotic Dog",
      date: "Jun 2025 – Jul 2025",
      association: "Associated with Technical Higher Secondary School Perinthalmanna",
      quote: "Robots can move, play, and even feel. This Robotic Dog shows that!",
      description: "I created a Robotic Dog that walks, responds to touch, and can be controlled with a custom joystick. It's an enjoyable mix of mechanics, electronics, and creativity.",
    },
    {
      src: imgJoy1,
      images: [imgJoy1, imgJoy2],
      title: "Joystick Controller for My Robot Dog",
      date: "Jun 2025 – Jul 2025",
      association: "Associated with Technical Higher Secondary School Perinthalmanna",
      quote: "Why settle for basic controls? I built my own PS5-style joystick for my Robot Dog.",
      description: "To make my Robot Dog more interactive and enjoyable to control, I built a PS5-style joystick controller using Arduino and wireless communication.",
    },
    {
      src: imgWild,
      images: [imgWild],
      title: "Wild Animal Attack Monitoring System (Prototype)",
      date: "Sep 2025 – Sep 2025",
      quote: "A step toward wildlife safety, combining AI vision and IoT for protection.",
      description: "This prototype detects animal movement near human settlements or forest borders and sends real-time alerts. It uses the ESP32 as the main controller with a HuskyLens AI camera to identify objects and track motion, while SIM900A GSM and Neo-6M GPS modules transmit important data instantly.",
    },
    {
      src: imgRoboArm,
      images: [imgRoboArm],
      title: "3D Printed Robotic Arm",
      date: "Apr 2025 – Apr 2025",
      association: "Associated with Technical Higher Secondary School Perinthalmanna",
      quote: "Bringing together electronics, mechanics, and programming into one robotic arm.",
      description: "I built a robotic arm using Arduino, servo motors, and 3D-printed parts. This project brings together my interests in electronics, mechanics, and programming. The arm can pick and place small objects, be controlled precisely through Arduino, and show how robotics can be used in automation and education.",
    },
    // === ELECTRONICS & SYSTEMS ===
    { 
      src: imgBpm1,
      images: [imgBpm1, imgBpm2, img4],
      title: "BPM (Heart Rate) Monitoring System",
      date: "Nov 2025 – Nov 2025",
      quote: "When electronics meet healthcare, monitoring becomes simple, smart, and stylish.",
      description: "This project features a BPM (Beats Per Minute) Monitoring System created with Arduino and a pulse sensor, housed in a custom 3D-printed heart-shaped case. The case is fully customizable and can be found on Thingiverse, allowing anyone to print, assemble, and use it."
    },
    { 
      src: imgAcid1,
      images: [imgAcid1, imgAcid2, imgAcid3],
      title: "Smart Acid Rain Prediction System",
      date: "Nov 2025 – Nov 2025",
      quote: "Detecting danger before it reaches the ground, blending environmental science with electronics.",
      description: "This project is a Smart Acid Rain Prediction System designed to monitor atmospheric gases and predict the early formation of acid rain. By measuring pollutants like SO₂ and NO₂, along with temperature and humidity, the system calculates a risk score and displays alerts in real time."
    },
    {
      src: imgAlexa,
      images: [imgAlexa],
      title: "DIY Alexa – Voice Controlled Home Automation",
      date: "Nov 2023 – Nov 2023",
      quote: "Built my own Alexa from scratch — voice commands, custom PCB, and full home control.",
      description: "This project is a DIY Alexa-style system built completely from scratch using Arduino Nano and DFRobot's voice recognition module. The system can recognize and respond to voice commands to control different home appliances — all through a custom PCB I designed myself!",
    },
    {
      src: imgHeight,
      images: [imgHeight],
      title: "Smart Height Measurement System",
      date: "Jan 2023 – Jan 2023",
      association: "Associated with Technical Higher Secondary School Perinthalmanna",
      quote: "Combining electronics with practical problem-solving — a smart height finder.",
      description: "As part of my journey in combining electronics with practical problem-solving, I built a Height Finder System using Arduino and sensors. This project was designed to measure a person's height quickly and display it on an LCD screen.",
    },
    {
      src: imgLdr,
      images: [imgLdr],
      title: "Custom LDR Sensor Module",
      date: "Sep 2024 – Sep 2024",
      quote: "From schematic to PCB — a custom light sensor module built from scratch.",
      description: "In this project, I designed and built a Light Dependent Resistor (LDR) sensor module using an LM358 operational amplifier — complete with a custom PCB that I designed and printed myself!",
    },
    // === ROBOTS & COMPETITIONS ===
    {
      src: imgOtto,
      images: [imgOtto],
      title: "Otto Robot",
      date: "Apr 2024 – Apr 2024",
      association: "Associated with Technical Higher Secondary School Perinthalmanna",
      quote: "A small but powerful walking robot — meet Otto!",
      description: "Meet Otto Robot, a fun and interactive robot built using Arduino, 3D-printed parts, and servo motors. Otto is a small but powerful walking robot that can walk and dance with pre-programmed movements, respond to basic interactions, and serve as a great STEM learning tool for kids and beginners in robotics.",
    },
    {
      src: imgRoboRace,
      images: [imgRoboRace],
      title: "Robo Race Robot",
      date: "Feb 2023 – Feb 2023",
      quote: "Speed, agility, and precision — built to compete.",
      description: "For this project, I built a high-speed Robo Race robot designed for agility and quick decision-making on complex tracks. It was built to compete in robotics competitions where performance, balance, and control matter most.",
    },
    // === 3D PRINTED CASES & ACCESSORIES ===
    {
      src: imgAr1,
      images: [imgAr1, imgAr2, imgAr3],
      title: "Arduino Uno Protective Case",
      date: "Aug 2025 – Aug 2025",
      quote: "3D-printed protection for your Arduino — functional, clean, and fully accessible.",
      description: "A simple and functional 3D-printed case for the Arduino Uno, designed to protect the board while keeping all pins, USB, and power ports easily accessible.",
    },
    {
      src: imgCa1,
      images: [imgCa1, imgCa2, imgCa3],
      title: "HuskyLens Protective Case",
      date: "Oct 2025 – Oct 2025",
      quote: "Protect your AI vision module — durable, compact, and mount-ready.",
      description: "I designed a durable and compact 3D-printed case for the HuskyLens AI camera to protect it during robotics or AI vision projects. The case safely encloses the module while keeping all ports, buttons, and the display easily accessible. It also includes mounting holes for attaching the case to robots, frames, or project enclosures.",
    },
    {
      src: imgRes1,
      images: [imgRes1, imgRes2],
      title: "3D Printed Resistor Organizer Box",
      date: "Oct 2025 – Oct 2025",
      quote: "Compact thinking — a custom-made organizer for the electronics workspace.",
      description: "After trying out different organizers, I designed and printed a Compact Resistor Organizer Box. Anyone who works with electronics knows how quickly resistors can pile up and mix together. I needed a case that was portable, well-labeled, and easy to access while prototyping.",
    },
    {
      src: imgTools,
      images: [imgTools],
      title: "Tools Organiser",
      date: "Oct 2025 – Oct 2025",
      quote: "A tidy workspace is a productive workspace — 3D printed and custom made.",
      description: "I designed a simple 3D-printed tabletop organizer to keep my tools, pens, and small electronics neatly arranged on my desk. It's compact, functional, and easy to print — perfect for hobbyists, makers, or anyone who wants a tidy workspace.",
    },
    {
      src: imgKb1,
      images: [imgKb1, imgKb2, imgKb3],
      title: "Keyboard Height Extender",
      date: "Oct 2025 – Oct 2025",
      quote: "Better posture, better typing — a simple 3D-printed ergonomic fix.",
      description: "I designed a simple 3D-printed keyboard height extender to improve typing comfort and reduce wrist strain. It slightly raises the back side of the keyboard to create a more ergonomic typing angle.",
    },
    // === WORKSHOP SESSION — MAY 2026 ===
    {
      src: vidSession1,
      images: null,
      videoSrc: vidSession1,
      title: "Workshop Session — Clip 1",
      date: "May 2026",
      quote: "Behind every great build is an even greater process.",
      description: "A live recording from a hands-on workshop session, capturing the build and testing process in action.",
    },
    {
      src: vidSession2,
      images: null,
      videoSrc: vidSession2,
      title: "Workshop Session — Clip 2",
      date: "May 2026",
      quote: "Every iteration brings the design one step closer to perfect.",
      description: "Continuation of the workshop session, showcasing assembly, wiring, or demonstration of the project in progress.",
    },
    {
      src: vidSession3,
      images: null,
      videoSrc: vidSession3,
      title: "Workshop Session — Clip 3",
      date: "May 2026",
      quote: "The final moments of a build session — where ideas become reality.",
      description: "The concluding clip from the workshop session, highlighting the final stages of the project build or a live demonstration.",
    },
  ];

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
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-red-500/90 border border-white/20 hover:border-red-500 flex items-center justify-center text-white transition-all pointer-events-auto shadow-lg z-[110]"
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
