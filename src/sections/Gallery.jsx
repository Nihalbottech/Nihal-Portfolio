import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  // Simulating a masonry layout with columns
  const column1 = [
    "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80",
  ];
  
  const column2 = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=600&q=80"
  ];

  const column3 = [
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80",
  ];

  const renderImage = (src, idx) => (
    <div key={idx} className="relative w-full rounded-2xl overflow-hidden border border-borderLine group mb-6">
      <img 
        src={src} 
        alt={`Gallery item ${idx}`} 
        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
    </div>
  );

  return (
    <section id="gallery" className="py-24 bg-background border-b border-borderLine relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Gallery</h2>
            <h3 className="text-3xl font-display font-bold text-text">Behind the Scenes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col">
              {column1.map((src, idx) => renderImage(src, `c1-${idx}`))}
            </div>
            <div className="flex flex-col">
              {column2.map((src, idx) => renderImage(src, `c2-${idx}`))}
            </div>
            <div className="flex flex-col">
              {column3.map((src, idx) => renderImage(src, `c3-${idx}`))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
