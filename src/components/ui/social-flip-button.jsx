import React from 'react';
import { FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiInstructables, SiThingiverse } from 'react-icons/si';

const socialLinks = [
  {
    name: "LinkedIn",
    letter: "in",
    icon: <FaLinkedin size={26} />,
    href: "https://www.linkedin.com/in/nihalmelethilmohammed",
    color: "bg-[#0077b5]",
    shadowColor: "rgba(0,119,181,0.5)"
  },
  {
    name: "Instagram",
    letter: "ig",
    icon: <FaInstagram size={26} />,
    href: "https://www.instagram.com/_nihalmohammed__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    color: "bg-[#E1306C]",
    shadowColor: "rgba(225,48,108,0.5)"
  },
  {
    name: "Instructables",
    letter: "ib",
    icon: <SiInstructables size={26} />,
    href: "https://www.instructables.com/member/Mohammed%20Nihal/instructables/",
    color: "bg-[#F2A200]",
    shadowColor: "rgba(242,162,0,0.5)"
  },
  {
    name: "Thingiverse",
    letter: "tv",
    icon: <SiThingiverse size={26} />,
    href: "https://www.thingiverse.com/NihalMohammed/designs",
    color: "bg-[#248BFB]",
    shadowColor: "rgba(36,139,251,0.5)"
  },
  {
    name: "WhatsApp",
    letter: "wa",
    icon: <FaWhatsapp size={26} />,
    href: "https://wa.me/918075097435",
    color: "bg-[#16a34a]",
    shadowColor: "rgba(22,163,74,0.5)"
  }
];

export default function SocialFlipButton() {
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
              {social.icon}
            </div>
            
          </div>
        </a>
      ))}
    </div>
  );
}
