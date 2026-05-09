import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary Light */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"
      />
      
      {/* Secondary Light */}
      <motion.div 
        animate={{ 
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/10 rounded-full blur-[150px]"
      />
    </div>
  );
};

export default AnimatedBackground;
