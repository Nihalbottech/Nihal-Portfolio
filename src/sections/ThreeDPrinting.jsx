import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TorusKnot } from '@react-three/drei';
import { motion } from 'framer-motion';

const MiniViewer = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <TorusKnot args={[1, 0.3, 128, 16]} scale={0.8}>
        <meshStandardMaterial color="#2563EB" metalness={0.6} roughness={0.2} />
      </TorusKnot>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
};

const ThreeDPrinting = () => {
  const images = [
    "https://images.unsplash.com/photo-1631475727715-685368a573dd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=600&q=80"
  ];

  return (
    <section id="printing" className="py-24 bg-surface border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Info and 3D Viewer */}
            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-text mb-4">3D Printing & Design</h2>
                <p className="text-muted text-base leading-relaxed">
                  Transforming digital concepts into physical reality. Specializing in FDM and SLA technologies to rapidly prototype functional mechanical parts, enclosures, and architectural models with extremely high tolerances.
                </p>
              </div>

              {/* Minimal 3D Box */}
              <div className="h-64 bg-background rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute top-4 left-4 z-10 text-xs font-semibold text-muted tracking-wider uppercase">
                  CAD Preview
                </div>
                <MiniViewer />
              </div>
            </div>

            {/* Showcase Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src={images[0]} alt="Print 1" className="w-full h-48 object-cover rounded-2xl border border-white/5 hover:scale-[1.02] transition-transform duration-300" />
                <img src={images[1]} alt="Print 2" className="w-full h-64 object-cover rounded-2xl border border-white/5 hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <div className="space-y-4 pt-8">
                <img src={images[2]} alt="Print 3" className="w-full h-64 object-cover rounded-2xl border border-white/5 hover:scale-[1.02] transition-transform duration-300" />
                <div className="w-full h-48 bg-background rounded-2xl border border-white/5 flex flex-col items-center justify-center p-6 text-center hover:bg-white/5 transition-colors cursor-pointer">
                  <span className="text-primary font-bold text-3xl mb-2">+50</span>
                  <span className="text-muted text-xs uppercase tracking-widest">More Designs</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeDPrinting;
