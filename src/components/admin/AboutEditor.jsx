import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutEditor = ({ data, onChange, onSave, saving }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Manage About Section</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bio Text */}
        <motion.div layout className="bg-surface border border-borderLine rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Biography</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-1">Paragraph 1</label>
              <textarea 
                value={data.bioParagraph1 || ''} 
                onChange={(e) => onChange({...data, bioParagraph1: e.target.value})} 
                className="w-full bg-background border border-borderLine rounded-lg p-3 text-sm resize-y"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Paragraph 2</label>
              <textarea 
                value={data.bioParagraph2 || ''} 
                onChange={(e) => onChange({...data, bioParagraph2: e.target.value})} 
                className="w-full bg-background border border-borderLine rounded-lg p-3 text-sm resize-y"
                rows={4}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div layout className="bg-surface border border-borderLine rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.stats && data.stats.map((stat, index) => (
              <div key={index} className="bg-background border border-borderLine rounded-lg p-3 space-y-2">
                <div>
                  <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider">Number</label>
                  <input 
                    type="number" 
                    value={stat.end || 0} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].end = parseInt(e.target.value) || 0;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider">Suffix (+ or empty)</label>
                  <input 
                    type="text" 
                    value={stat.suffix || ''} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].suffix = e.target.value;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-1.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider">Label</label>
                  <input 
                    type="text" 
                    value={stat.label || ''} 
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[index].label = e.target.value;
                      onChange({...data, stats: updated});
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-1.5 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div layout className="md:col-span-2 bg-surface border border-borderLine rounded-xl p-6">
           <h3 className="text-lg font-bold mb-4">Top Skills</h3>
           <p className="text-xs text-muted mb-4">Icon names should match Lucide React icons (e.g., Cpu, Settings, Code, Box, BookOpen, Users, Printer, Rocket).</p>
           
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.skills && data.skills.map((skill, index) => (
                <div key={index} className="bg-background border border-borderLine rounded-lg p-3 space-y-2">
                  <input 
                    type="text" 
                    placeholder="Skill Name"
                    value={skill.label || ''} 
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[index].label = e.target.value;
                      onChange({...data, skills: updated});
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-1.5 text-sm font-semibold"
                  />
                  <input 
                    type="text" 
                    placeholder="Icon Name"
                    value={skill.icon || ''} 
                    onChange={(e) => {
                      const updated = [...data.skills];
                      updated[index].icon = e.target.value;
                      onChange({...data, skills: updated});
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-1.5 text-xs text-primary"
                  />
                </div>
              ))}
           </div>
        </motion.div>
      </div>

      <div className="pt-6 border-t border-borderLine">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 w-full max-w-md ml-auto bg-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving About Section...' : 'Save About Section'}</span>
        </button>
      </div>
    </div>
  );
};

export default AboutEditor;
