import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings, Printer, Users, GraduationCap, Briefcase, Rocket, Cpu, Code, Box, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Animated counter
const Counter = ({ end, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-display font-bold text-text">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const IconMap = {
  Cpu: <Cpu size={14} />,
  Settings: <Settings size={14} />,
  Code: <Code size={14} />,
  Box: <Box size={14} />,
  BookOpen: <BookOpen size={14} />,
  Users: <Users size={14} />,
  Printer: <Printer size={14} />,
  Rocket: <Rocket size={14} />,
};

const About = () => {
  const { data } = usePortfolio();
  const aboutData = data.about;

  const highlights = [
    {
      icon: <Settings className="w-6 h-6 text-primary stroke-[1.5]" />,
      title: "Robotics Development",
      desc: "Designing and integrating autonomous hardware systems.",
      gradient: "from-primary/10 to-transparent"
    },
    {
      icon: <Printer className="w-6 h-6 text-accent stroke-[1.5]" />,
      title: "3D Printing Design",
      desc: "Precision CAD modeling and additive manufacturing.",
      gradient: "from-accent/10 to-transparent"
    },
    {
      icon: <Users className="w-6 h-6 text-success stroke-[1.5]" />,
      title: "Student Training",
      desc: "Educating and mentoring the next generation.",
      gradient: "from-success/10 to-transparent"
    }
  ];

  const experience = [
    {
      role: "Technical Intern",
      company: "PiBots Robotics Pvt. Ltd.",
      link: "https://www.pibots.in/",
      type: "Internship · Hybrid",
      period: "Apr 2026 – Present · 2 mos",
      desc: "Assisting in designing, prototyping, and testing robotics systems, focusing on embedded systems and real-world hardware deployment.",
      color: "bg-primary",
      textColor: "text-primary"
    },
    {
      role: "Technical Support Assistant",
      company: "PROJECTX – Electronic Skill Development Program",
      type: "Freelance · Hybrid · Kerala, India",
      period: "Aug 2024 – Oct 2024 · 3 mos",
      desc: "Provided technical help to students and participants during electronics and robotics workshops, supporting hands-on learning.",
      color: "bg-accent",
      textColor: "text-accent"
    }
  ];

  return (
    <section id="about" className="py-28 bg-surface border-b border-borderLine relative z-10 overflow-hidden">
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-text max-w-2xl leading-tight">
            Engineering solutions <br />
            <span className="text-primary">from concept</span> to reality.
          </h3>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {aboutData.stats.map((stat, i) => (
            <div key={i} className="bg-background rounded-2xl border border-borderLine p-6 hover:border-primary/40 transition-colors duration-300">
              <Counter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >

            {/* Bio */}
            <motion.div variants={itemVariants}>
              <p className="text-muted text-base leading-relaxed mb-4">
                {aboutData.bioParagraph1}
              </p>
              <p className="text-muted text-base leading-relaxed">
                {aboutData.bioParagraph2}
              </p>
            </motion.div>

            {/* Skills Chips */}
            <motion.div variants={itemVariants}>
              <p className="text-xs font-semibold tracking-widest text-muted uppercase mb-3">Top Skills</p>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.06, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center space-x-2 px-3 py-2 bg-background border border-borderLine rounded-full text-sm text-muted hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                  >
                    <span className="text-primary">{IconMap[skill.icon] || <Settings size={14} />}</span>
                    <span>{skill.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Arduino Honor - Highlighted */}
            <motion.a
              href="https://www.instagram.com/p/DRuxyvOjuZl/?igsh=eXN6YnkzOXo5bG5n"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="flex items-start space-x-5 bg-background/80 backdrop-blur-md rounded-2xl border-2 border-accent/60 p-6 hover:border-accent shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden group cursor-pointer"
            >
              {/* Animated Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Pulsing Icon */}
              <div className="relative w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 z-10 border border-accent/30 group-hover:bg-accent/30 transition-colors">
                <div className="absolute inset-0 rounded-xl bg-accent animate-ping opacity-25"></div>
                <Rocket className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <div className="relative z-10 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded border border-accent/20">🏆 Career Highlight</span>
                </div>
                <p className="text-text font-bold text-base leading-tight">Featured on Arduino's Official Instagram</p>
                <p className="text-accent/80 text-xs mt-1.5 font-medium flex items-center">
                  Click to view the feature post →
                </p>
              </div>
            </motion.a>

            {/* Education */}
            <motion.div
              variants={itemVariants}
              className="bg-background rounded-2xl border border-borderLine p-6 hover:border-primary/30 transition-colors duration-300 group"
            >
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-surface border border-borderLine flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                  <GraduationCap className="w-5 h-5 text-primary stroke-[1.5]" />
                </div>
                <h4 className="text-sm font-semibold tracking-widest text-muted uppercase">Education</h4>
              </div>
              <div className="relative pl-5 border-l-2 border-primary/30">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background animate-pulse"></div>
                <h5 className="text-base font-bold text-text leading-snug">Technical Higher Secondary School Perinthalmanna</h5>
                <p className="text-primary text-sm font-medium mt-1">Electronics Science · Grade 12th</p>
                <p className="text-muted text-xs mt-1">Jun 2024 – Mar 2026</p>
                <p className="text-muted text-xs mt-1">Activities: National Service Scheme (NSS)</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >

            {/* Highlights */}
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, x: 4 }}
                className="group flex items-start p-6 bg-background rounded-2xl border border-borderLine hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 w-12 h-12 rounded-xl bg-surface border border-borderLine flex items-center justify-center shrink-0 mr-5 group-hover:border-primary/30 transition-colors">
                  {item.icon}
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-text mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Experience Timeline */}
            <motion.div
              variants={itemVariants}
              className="bg-background rounded-2xl border border-borderLine p-8 hover:border-primary/30 transition-colors duration-300 group mt-4 relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex items-center space-x-3 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface border border-borderLine flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors shadow-sm">
                  <Briefcase className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <h4 className="text-sm font-semibold tracking-widest text-muted uppercase">Experience</h4>
              </div>

              <div className="space-y-8 relative z-10">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6">
                    {/* Timeline Line */}
                    {idx !== experience.length - 1 && (
                      <div className="absolute left-1.5 top-6 bottom-[-24px] w-px bg-borderLine"></div>
                    )}
                    
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${exp.color} ring-4 ring-background shadow-sm`}></div>
                    
                    <h5 className="text-base font-bold text-text leading-snug">{exp.role}</h5>
                    {exp.link ? (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${exp.textColor} hover:underline mt-0.5 inline-block`}>
                        {exp.company}
                      </a>
                    ) : (
                      <p className={`text-sm font-medium ${exp.textColor} mt-0.5`}>{exp.company}</p>
                    )}
                    
                    <div className="flex items-center text-xs text-muted mt-1.5 space-x-2">
                      <span>{exp.period}</span>
                      <span>•</span>
                      <span>{exp.type}</span>
                    </div>
                    <p className="text-muted text-sm mt-3 leading-relaxed">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
