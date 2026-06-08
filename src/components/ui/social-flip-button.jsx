import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiInstructables, SiThingiverse } from 'react-icons/si';
import { usePortfolio } from '../../context/PortfolioContext';

const IconMap = {
  FaLinkedin: <FaLinkedin size={26} />,
  FaInstagram: <FaInstagram size={26} />,
  SiInstructables: <SiInstructables size={26} />,
  SiThingiverse: <SiThingiverse size={26} />,
  FaWhatsapp: <FaWhatsapp size={26} />
};

export default function SocialFlipButton() {
  const { data } = usePortfolio();
  const socialLinks = data?.socials || [];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {socialLinks.map((social, idx) => (
        <a 
          key={idx}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-16 h-16 md:w-20 md:h-20 [perspective:1000px]"
          title={social.name}
        >
          <div className="absolute inset-0 w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
            
            {/* Front Face */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center rounded-2xl bg-surface border border-borderLine text-text font-display font-bold text-xl md:text-2xl uppercase tracking-widest shadow-md [backface-visibility:hidden]">
              {social.letter}
            </div>

            {/* Back Face */}
            <div 
              className={`absolute inset-0 w-full h-full flex items-center justify-center rounded-2xl text-white ${social.color} border border-white/20 [transform:rotateX(180deg)] [backface-visibility:hidden]`}
              style={{ boxShadow: `0 10px 25px -5px ${social.shadowColor}` }}
            >
              {IconMap[social.icon]}
            </div>
            
          </div>
        </a>
      ))}
    </div>
  );
}
