import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

import vidKotech from '../assets/Expo Attended/WhatsApp Video 2026-05-07 at 2.39.08 PM.mp4';
import imgTharang from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 2.46.39 PM.jpeg';
import imgTharang2 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 2.46.39 PM (1).jpeg';
import imgTharang3 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 2.46.40 PM.jpeg';
import imgEnteKeralam1 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 2.47.14 PM.jpeg';
import imgEnteKeralam2 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 2.47.15 PM.jpeg';
import imgTharang24 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 3.22.58 PM.jpeg';
import imgProjectX from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 3.24.17 PM.jpeg';
import imgKotechFest25 from '../assets/Expo Attended/WhatsApp Image 2026-05-07 at 3.24.37 PM.jpeg';

const expos = [
  {
    src: vidKotech,
    videoSrc: vidKotech,
    images: null,
    title: 'KOTECH — Technology Expo',
    date: 'May 2026',
    association: 'Organised by Britco & Bridco | Kumat',
    quote: 'Where technology meets imagination — a celebration of innovation and engineering.',
    description:
      'Attended KOTECH, a regional technology expo organised by Britco & Bridco, showcasing cutting-edge innovations in robotics, virtual reality, and smart systems. The event featured live robot demonstrations, VR experiences, and student-led engineering projects, providing a great platform to explore the latest trends in technology and connect with fellow innovators.',
  },
  {
    src: imgTharang,
    images: [imgTharang, imgTharang2, imgTharang3],
    title: 'THARANG 2023 — National Level Tech Fest',
    date: '2023',
    association: 'College of Engineering, Chengannur',
    quote: "Where school meets college, and passion meets competition — THARANG 2023 was truly unforgettable.",
    description:
      'Attended THARANG 2023, a National Level Tech Fest held at the College of Engineering, Chengannur — one of the most inspiring events I have ever been part of. The fest brought together school and college students to showcase their technical skills through innovation, creativity, and competition. Our team represented IHRD and competed against college-level teams, achieving great results. The highlight was Team IHRD being recognised as the Best Technical School — a proud moment that truly strengthened my passion for technology and robotics.',
  },
  {
    src: imgEnteKeralam1,
    images: [imgEnteKeralam1, imgEnteKeralam2],
    title: 'Team IHRD Expo Stall — Ente Keralam Expo',
    date: 'Kottakunnu Park, Malappuram',
    association: 'Organised by the Government of Kerala',
    quote: 'Proud to represent Team IHRD — showcasing innovation at a state-level celebration of Kerala’s progress.',
    description:
      'Represented Team IHRD at the Ente Keralam Expo, a prestigious event organised by the Government of Kerala at Kottakunnu Park, Malappuram. We showcased innovative robotics and AI-based projects that attracted great interest from visitors and students alike. It was an inspiring experience to interact with the public, demonstrate our creations, and promote technology-driven learning — all as part of an initiative that celebrates Kerala’s innovation and progress.',
  },
  {
    src: imgTharang24,
    images: [imgTharang24],
    title: 'THARANG 2k24 — National Level Tech Fest, Calicut',
    date: '2024',
    association: 'Team IHRD',
    quote: 'Competed against college students, won three times — THARANG 2024 was a defining moment.',
    description:
      'Represented Team IHRD at THARANG 2024, a National Level Tech Fest held in Calicut — one of the most inspiring and competitive events I have ever attended. Proud to have achieved outstanding results across multiple categories: 🥇 1st Place in the Project Expo, 🥈 2nd Place in Robo War, and 🏆 1st Place in the Shark Tank Idea Pitch Competition, where I competed against college-level teams and presented an innovative business idea. This experience was a true testament to teamwork, creativity, and the power of passion-driven learning.',
  },
  {
    src: imgProjectX,
    images: [imgProjectX],
    title: 'ProjectX — MEGA CO TIGA (4th Edition, 2023)',
    date: '2023',
    association: 'Exceligentia Mega Convocation | Powered by Britco & Bridco',
    quote: 'From student to coach — sharing the spark of technology with the next generation of innovators.',
    description:
      'Honoured to serve as one of the coaches and speakers at ProjectX, held as part of MEGA CO TIGA (4th Edition, 2023), organised under Exceligentia Mega Convocation and powered by Britco and Bridco. I shared insights on technology, innovation, and leadership with talented school tech enthusiasts, guiding them to explore the future of AI and Robotics. Interacting with these young minds and inspiring them was a truly rewarding experience — grateful to ProjectX 2023 for this incredible opportunity.',
  },
  {
    src: imgKotechFest25,
    images: [imgKotechFest25],
    title: 'Kotech Fest 2025 — Robotics & Tech Stall',
    date: 'July 2025 • Kottakkal, Kerala',
    association: "Qismat Foundation | Faith Foundation | Kottakkal Municipality",
    quote: "India's first Social Tech Fest — where robotics met the community and innovation became accessible to all.",
    description:
      'Participated in Kotech Fest 2025, India’s first Social Tech Fest, held in Kottakkal, Kerala, organised by the Qismat Foundation in partnership with the Faith Foundation and Kottakkal Municipality. At our Robotics & Tech Stall, we showcased 20+ innovative projects including a Robot Dog, Prosthetic Hand, PS5-style Joystick Controller, Robotics Kit, 3D-printed parts, Otto Robot, Robotic Arm, Line Follower Robot, Bluetooth Car, Obstacle Avoiding Car, Home Automation Board, and many more. The stall attracted students, parents, and tech enthusiasts eager to explore how robotics and 3D printing can address real-world challenges. The highlight for me was not just displaying projects, but interacting with people of all ages and demonstrating how innovation can be fun, practical, and impactful.',
  },
];

const ExpoCard = ({ expo, index, onClick }) => {
  const isVideo = expo.src && expo.src.toString().endsWith?.('.mp4') || expo.videoSrc;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={() => onClick(index)}
      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 cursor-pointer border border-borderLine hover:border-primary group relative bg-surface"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-transparent to-primary/0 group-hover:from-primary/20 group-hover:to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-700 z-10 pointer-events-none mix-blend-overlay" />

      <div className="w-full relative overflow-hidden flex items-center justify-center bg-black/20 aspect-video">
        {isVideo ? (
          <video
            src={expo.src}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={expo.src}
            alt={expo.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
          />
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm z-20">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] transform scale-50 group-hover:scale-110 transition-all duration-500 ease-out">
            <Play fill="currentColor" size={24} className="ml-1" />
          </div>
          <span className="text-white font-semibold tracking-[0.2em] uppercase text-xs mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
            View Details
          </span>
        </div>
      </div>

      <div className="p-5 border-t border-borderLine bg-surface">
        <h4 className="text-lg font-bold text-text mb-1">{expo.title}</h4>
        {expo.date && <p className="text-xs font-semibold text-primary mb-1 tracking-wider">{expo.date}</p>}
        {expo.association && <p className="text-xs text-muted mb-2">{expo.association}</p>}
        {expo.quote && <p className="text-sm text-muted italic line-clamp-2">{expo.quote}</p>}
      </div>
    </motion.div>
  );
};

const ExpoAttended = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeExpo = activeIndex !== null ? expos[activeIndex] : null;

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeIndex]);

  return (
    <>
      <section id="expo" className="py-24 bg-background border-b border-borderLine relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Events</h2>
              <h3 className="text-3xl font-display font-bold text-text">Expo Attended</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {expos.map((expo, index) => (
                <ExpoCard key={index} expo={expo} index={index} onClick={setActiveIndex} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeExpo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col md:flex-row items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
            onClick={() => setActiveIndex(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-red-500/90 border border-white/20 hover:border-red-500 flex items-center justify-center text-white transition-all pointer-events-auto shadow-lg z-[110]"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
              title="Close"
            >
              <X size={24} strokeWidth={2} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full md:w-auto h-auto max-w-[95vw] md:max-w-[60vw] max-h-[75vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center bg-black/50 z-[105] custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {activeExpo.videoSrc ? (
                <video
                  src={activeExpo.videoSrc}
                  autoPlay loop muted playsInline
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain rounded-2xl"
                />
              ) : (
                <div className="flex flex-col gap-4 p-4 w-full items-center">
                  {activeExpo.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={activeExpo.title}
                      className="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-xl"
                    />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full md:w-[400px] mt-6 md:mt-0 md:ml-8 bg-surface/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 z-[105]"
            >
              <h3 className="text-3xl font-display font-bold text-white mb-2">{activeExpo.title}</h3>
              {activeExpo.date && <p className="text-primary font-semibold tracking-wider text-sm mb-1">{activeExpo.date}</p>}
              {activeExpo.association && <p className="text-white/50 text-xs mb-6 tracking-wide">{activeExpo.association}</p>}
              {activeExpo.quote && <p className="text-white/80 italic text-lg mb-6 border-l-2 border-primary pl-4">{activeExpo.quote}</p>}
              {activeExpo.description && <p className="text-white/60 leading-relaxed text-sm">{activeExpo.description}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpoAttended;
