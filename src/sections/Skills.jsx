import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Printer, Code2, Brain, Users, Wrench } from 'lucide-react';

const Skills = () => {
  const categories = [
    {
      title: "Robotics & Hardware",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      color: "primary",
      skills: [
        "Robotics",
        "Arduino Programming",
        "Embedded Systems",
        "Microcontrollers",
        "Electronics",
        "PCB Design (EasyEDA)",
        "Printed Circuit Board (PCB) Design",
        "Internet of Things (IoT)",
        "Mechatronics",
        "Prototyping",
        "Hardware Prototyping",
      ]
    },
    {
      title: "3D Printing & Design",
      icon: <Printer className="w-6 h-6 text-success" />,
      color: "success",
      skills: [
        "3D Printing",
        "3D Prototyping",
        "Autodesk Fusion 360",
        "AutoCAD",
        "Rapid Prototyping",
        "Design for Manufacturing",
      ]
    },
    {
      title: "Programming",
      icon: <Code2 className="w-6 h-6 text-accent" />,
      color: "accent",
      skills: [
        "Python",
        "C (Programming Language)",
        "C++",
        "Arduino Programming",
      ]
    },
    {
      title: "AI & Research",
      icon: <Brain className="w-6 h-6 text-warning" />,
      color: "warning",
      skills: [
        "Artificial Intelligence (AI)",
        "Computer Vision",
        "Research Skills",
        "Problem Solving",
        "Project Planning",
        "Project Management",
      ]
    },
    {
      title: "Leadership & Teaching",
      icon: <Users className="w-6 h-6 text-info" />,
      color: "info",
      skills: [
        "Teaching",
        "Mentoring",
        "STEM Education & Mentoring",
        "Workshop Leadership",
        "Presentation Skills",
        "Presentations",
        "People Management",
        "Team Collaboration",
        "Teamwork",
        "Learning & Development",
      ]
    },
    {
      title: "Competitions & Events",
      icon: <Wrench className="w-6 h-6 text-muted" />,
      color: "muted",
      skills: [
        "Project Expo",
        "Robo Race",
        "Hackathon",
        "Shark Tank Idea Pitch",
        "Technical Support",
      ]
    },
  ];

  // Helper for color classes
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary': return 'border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40';
      case 'success': return 'border-success/20 bg-success/5 text-success hover:bg-success/10 hover:border-success/40';
      case 'accent': return 'border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 hover:border-accent/40';
      case 'warning': return 'border-yellow-500/20 bg-yellow-500/5 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500/40';
      case 'info': return 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40';
      case 'muted': return 'border-white/10 bg-white/5 text-muted hover:bg-white/10 hover:border-white/20';
      default: return 'border-white/10 bg-white/5 text-white hover:bg-white/10';
    }
  };

  const getGlowColor = (color) => {
    switch (color) {
      case 'primary': return 'var(--color-primary)';
      case 'success': return 'var(--color-success)';
      case 'accent': return 'var(--color-accent)';
      case 'warning': return '#eab308';
      case 'info': return '#06b6d4';
      case 'muted': return '#6b7280';
      default: return '#ffffff';
    }
  };

  return (
    <section id="skills" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-sm font-semibold tracking-widest text-muted uppercase mb-3">Expertise</h2>
            <h3 className="text-3xl font-display font-bold text-text mb-4">Technical Skills</h3>
            <p className="text-muted text-base max-w-2xl">
              A full breakdown of my engineering capabilities across hardware, software, design, and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-white/10 transition-colors shadow-lg group relative overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: getGlowColor(category.color) }}
                />

                <div className="flex items-center space-x-4 mb-8 relative z-10">
                  <div className={`p-3 rounded-xl border transition-colors ${getColorClasses(category.color).split(' ').slice(0, 2).join(' ')}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-text">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3 relative z-10">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 cursor-default ${getColorClasses(category.color)}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
