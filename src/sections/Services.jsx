import React from 'react';
import { Cpu, Printer, BookOpen } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "Robotics Engineering",
      description: "End-to-end development of autonomous systems, embedded electronics, and sophisticated mechatronics solutions."
    },
    {
      icon: <Printer className="w-8 h-8 text-primary" />,
      title: "3D Printing Architect",
      description: "Advanced additive manufacturing, rapid prototyping, and CAD modeling for high-precision components."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Technical Training",
      description: "Comprehensive workshops and curriculum design focused on robotics, IoT, and modern manufacturing techniques."
    }
  ];

  return (
    <section id="services" className="py-24 bg-surface border-b border-background/50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Core Competencies</h2>
          <p className="text-muted text-lg">
            Delivering high-quality engineering services across hardware development, fabrication, and education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-background rounded-2xl p-8 border border-surface/50 hover:border-primary/50 transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-text mb-3">{service.title}</h3>
              <p className="text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
