import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layout, Download } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';

import profileImg from '../assets/Profile/Nihal.png';
import companyLogo from '../assets/Profile/Untitled48_20260425154829.png';
import instructablesLogo from '../assets/Awards/Logos/jhgb.png';
import resumePdf from '../assets/Resume/Mohammed_Nihal_Final_Resume.pdf';

const Hero = () => {
  const { data } = usePortfolio();
  const heroData = data.hero;
  const displayProfileImg = heroData.profileImgUrl || profileImg;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden z-10 bg-background border-b border-borderLine">
      
      {/* Subtle moving light effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center py-12">
        
        {/* Left Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6 order-2 md:order-1"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-text leading-[1.1] mb-4"
            >
              {heroData.firstName} <span className="text-primary inline-block">{heroData.lastName}</span>
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl md:text-3xl text-muted font-normal leading-tight whitespace-pre-line"
            >
              {heroData.titles}
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-muted text-lg md:text-xl max-w-lg leading-relaxed mt-2"
          >
            {heroData.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all duration-200 text-center w-max"
              >
                View Projects
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={resumePdf} 
                download="Mohammed_Nihal_Final_Resume.pdf" 
                className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-surface border border-borderLine text-text text-sm font-semibold rounded-xl hover:bg-borderLine/50 transition-all duration-200 text-center w-max"
              >
                <Download size={18} />
                <span>Resume</span>
              </motion.a>
            </div>
            
            {/* Current Company */}
            <div className="flex items-center space-x-3 pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l border-borderLine sm:pl-8">
              <span className="text-xs text-muted uppercase tracking-wider font-medium">Currently at</span>
              <a href="https://www.pibots.in/" target="_blank" rel="noopener noreferrer" className="block">
                <img src={companyLogo} alt="PiBots" className="h-8 object-contain opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300" />
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center space-x-3 pr-4 border-r border-borderLine">
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/in/nihalmelethilmohammed" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-borderLine rounded-xl text-muted hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all duration-300 shadow-sm" title="LinkedIn"
              >
                <FaLinkedinIn size={22} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/_nihalmohammed__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface border border-borderLine rounded-xl text-muted hover:text-[#E4405F] hover:border-[#E4405F]/50 transition-all duration-300 shadow-sm" title="Instagram"
              >
                <FaInstagram size={22} />
              </motion.a>
            </div>
            
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.thingiverse.com/NihalMohammed/designs" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2.5 px-5 py-3 bg-surface border border-borderLine rounded-xl text-muted hover:text-[#248bfb] hover:border-[#248bfb]/50 hover:bg-[#248bfb]/5 transition-all duration-300 shadow-sm group" title="Thingiverse"
            >
              <Box size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Thingiverse</span>
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instructables.com/member/Mohammed%20Nihal/instructables/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2.5 px-5 py-3 bg-surface border border-borderLine rounded-xl text-muted hover:text-[#f8c100] hover:border-[#f8c100]/50 hover:bg-[#f8c100]/5 transition-all duration-300 shadow-sm group" title="Instructables"
            >
              <img src={instructablesLogo} alt="Instructables" className="w-5 h-5 object-contain group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />
              <span className="text-sm font-bold">Instructables</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center md:justify-end order-1 md:order-2"
        >
          <motion.div 
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden bg-surface shadow-2xl shadow-black/50 border border-borderLine p-2 group"
          >
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="w-full h-full rounded-xl overflow-hidden bg-black/20">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={displayProfileImg} 
                alt="Mohammed Nihal M"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 30+ Projects Badge */}
            <motion.div 
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 2, 0]
              }}
              transition={{ 
                duration: 4.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-4 -right-4 bg-background/80 backdrop-blur-md border border-borderLine px-4 py-2 rounded-xl shadow-xl z-20"
            >
              <span className="text-xs font-bold text-success tracking-widest uppercase">30+ Projects</span>
            </motion.div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -2, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute -bottom-2 -left-2 bg-background/80 backdrop-blur-md border border-borderLine px-4 py-2 rounded-xl shadow-xl z-20"
            >
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Innovator</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
