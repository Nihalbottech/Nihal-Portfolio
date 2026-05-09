import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RevealLoader({
  text = "LOADING",
  bgColors = ["#0f172a", "#334155"],
  staggerOrder = "left-to-right", // left-to-right, center-out
  textFadeDelay = 0.5,
  columns = 5,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader from DOM after animations are done
    const totalTime = (textFadeDelay + 2.5) * 1000;
    const timer = setTimeout(() => {
      setLoading(false);
    }, totalTime);
    return () => clearTimeout(timer);
  }, [textFadeDelay]);

  const bgStyle = bgColors.length > 1 
    ? `linear-gradient(135deg, ${bgColors[0]}, ${bgColors[1]})` 
    : bgColors[0] || "#0f172a";

  const getDelay = (i) => {
    if (staggerOrder === "center-out") {
      const center = Math.floor(columns / 2);
      const dist = Math.abs(i - center);
      return textFadeDelay + 1.2 + (dist * 0.08);
    }
    return textFadeDelay + 1.2 + (i * 0.08);
  };

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex pointer-events-none">
          {/* Shutter Bars */}
          {Array.from({ length: columns }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0 }}
              animate={{ y: "-100%" }}
              exit={{ y: "-100%" }}
              transition={{ 
                duration: 1, 
                ease: [0.76, 0, 0.24, 1], // Cinematic easing
                delay: getDelay(i) 
              }}
              className="h-full flex-1 shadow-2xl relative"
              style={{ background: bgStyle }}
            />
          ))}

          {/* Text Container */}
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: textFadeDelay + 1 }}
            className="absolute inset-0 flex items-center justify-center z-[10000]"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-widest text-center px-4 overflow-hidden">
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.05,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
