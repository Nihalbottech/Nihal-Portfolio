import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import SocialFlipButton from '../components/ui/social-flip-button';
import contentData from '../data/content.json';

const Contact = () => {
  const contactData = contentData.contact;

  return (
    <section id="contact" className="py-24 bg-surface border-b border-borderLine relative z-10 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Contact</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">Let's Discuss Your Project</h3>
          <p className="text-muted text-lg mb-12 leading-relaxed max-w-xl">
            Whether you need consultation on a robotics build, a complex 3D print, or technical training, I am ready to help you succeed.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full mb-12">
            <a href={`mailto:${contactData.email}`} className="flex items-center w-full md:w-auto p-4 md:px-8 md:py-5 bg-background rounded-2xl border border-borderLine hover:border-primary/50 hover:bg-primary/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mr-5 border border-borderLine group-hover:border-primary/30 transition-colors">
                <Mail size={22} className="text-muted group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted mb-1 uppercase tracking-wider font-semibold">Email Me</p>
                <span className="font-medium text-text text-lg">{contactData.email}</span>
              </div>
            </a>
            <a href={contactData.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center w-full md:w-auto p-4 md:px-8 md:py-5 bg-background rounded-2xl border border-borderLine hover:border-green-500/50 hover:bg-green-500/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mr-5 border border-borderLine group-hover:border-green-500/30 transition-colors">
                <Phone size={22} className="text-muted group-hover:text-green-500 transition-colors" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted mb-1 uppercase tracking-wider font-semibold">Call / WhatsApp</p>
                <span className="font-medium text-text text-lg">{contactData.phone}</span>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <SocialFlipButton />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
