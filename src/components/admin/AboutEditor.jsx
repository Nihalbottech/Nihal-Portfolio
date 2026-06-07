import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutEditor = ({ data, onChange, onSave, saving }) => {
  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="px-2 mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Manage About Section</h2>
        <p className="text-sm text-gray-500 mt-1">Update your biography, statistics, and top skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bio Text */}
        <motion.div layout className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Biography</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Paragraph 1</label>
              <textarea 
                value={data.bioParagraph1 || ''} 
                onChange={(e) => onChange({...data, bioParagraph1: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-y"
                rows={5}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Paragraph 2</label>
              <textarea 
                value={data.bioParagraph2 || ''} 
                onChange={(e) => onChange({...data, bioParagraph2: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-y"
                rows={5}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div layout className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8 h-max">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.stats && data.stats.map((stat, index) => (
              <div key={index} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Number</label>
                  <input 
                    type="number" 
                    value={stat.end || 0} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].end = parseInt(e.target.value) || 0;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-white border border-gray-200 text-gray-900 font-bold rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Suffix (+ or empty)</label>
                  <input 
                    type="text" 
                    value={stat.suffix || ''} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].suffix = e.target.value;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Label</label>
                  <input 
                    type="text" 
                    value={stat.label || ''} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].label = e.target.value;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div layout className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8">
           <div className="mb-6">
             <h3 className="text-lg font-bold text-gray-900">Top Skills</h3>
             <p className="text-xs font-medium text-gray-500 mt-1">Icon names should match Lucide React icons (e.g., Cpu, Settings, Code, Box, BookOpen, Users, Printer, Rocket).</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {data.skills && data.skills.map((skill, index) => (
                <div key={index} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Skill Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. React"
                      value={skill.label || ''} 
                      onChange={(e) => {
                        const updated = [...data.skills];
                        updated[index].label = e.target.value;
                        onChange({...data, skills: updated});
                      }}
                      className="w-full bg-white border border-gray-200 text-gray-900 font-bold rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Icon Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Code"
                      value={skill.icon || ''} 
                      onChange={(e) => {
                        const updated = [...data.skills];
                        updated[index].icon = e.target.value;
                        onChange({...data, skills: updated});
                      }}
                      className="w-full bg-white border border-gray-200 text-primary font-medium rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              ))}
           </div>
        </motion.div>
      </div>

      <div className="pt-8 pb-4 mt-8 border-t border-gray-200 flex justify-end">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving About Section...' : 'Save About Section'}</span>
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
