import React, { useState } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon, Video, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectsEditor = ({ data, onChange, onSave, saving, toBase64 }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const handleAddProject = () => {
    const newProject = {
      title: "New Project",
      date: "",
      association: "",
      quote: "",
      description: "",
      src: "",
      images: [],
      videoSrc: null
    };
    onChange([newProject, ...data]);
    setExpandedIndex(0);
  };

  const handleRemoveProject = (index) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      const updated = [...data];
      updated.splice(index, 1);
      onChange(updated);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleUploadFile = async (index, file, isMainSrc = false) => {
    setUploadingIdx(index);
    try {
      const base64 = await toBase64(file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name, base64 })
      });
      const result = await res.json();
      if (result.url) {
        const updated = [...data];
        if (isMainSrc) {
          updated[index].src = result.url;
          if (file.type.startsWith('video/')) {
            updated[index].videoSrc = result.url;
          }
        } else {
          updated[index].images = [...(updated[index].images || []), result.url];
        }
        onChange(updated);
      }
    } catch (err) {
      console.error('Failed to upload', err);
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <button onClick={handleAddProject} className="flex items-center space-x-2 bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/30 transition">
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <motion.div key={index} layout className="bg-surface border border-borderLine rounded-xl overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-4">
                {project.src ? (
                  project.src.endsWith('.mp4') ? <Video className="w-10 h-10 text-muted" /> : <img src={project.src} alt="" className="w-12 h-12 object-cover rounded-md" />
                ) : (
                  <div className="w-12 h-12 bg-black/20 rounded-md flex items-center justify-center text-muted"><ImageIcon size={20} /></div>
                )}
                <div>
                  <h3 className="font-bold text-lg">{project.title || 'Untitled Project'}</h3>
                  <p className="text-xs text-muted">{project.date || 'No date'}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleRemoveProject(index); }} 
                className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="p-6 pt-2 border-t border-borderLine grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-1">Title</label>
                    <input type="text" value={project.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Date</label>
                    <input type="text" value={project.date || ''} onChange={(e) => handleChange(index, 'date', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" placeholder="e.g., Jun 2025 – Jul 2025" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Association (Optional)</label>
                    <input type="text" value={project.association || ''} onChange={(e) => handleChange(index, 'association', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Quote</label>
                    <textarea value={project.quote || ''} onChange={(e) => handleChange(index, 'quote', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" rows={2} />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Description</label>
                    <textarea value={project.description || ''} onChange={(e) => handleChange(index, 'description', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" rows={4} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-2">Main Media (Thumbnail/Video)</label>
                    <div className="flex items-center space-x-4">
                      {project.src && (project.src.endsWith('.mp4') ? <Video className="text-primary w-8 h-8"/> : <img src={project.src} className="h-16 rounded object-cover" />)}
                      <label className="cursor-pointer bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm hover:bg-primary/30">
                        {uploadingIdx === index ? 'Uploading...' : 'Upload File'}
                        <input type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => e.target.files[0] && handleUploadFile(index, e.target.files[0], true)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted mb-2">Gallery Images</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.images && project.images.map((img, i) => (
                        <div key={i} className="relative group">
                          <img src={img} className="h-16 w-16 object-cover rounded border border-borderLine" />
                          <button onClick={() => {
                            const updatedImgs = [...project.images];
                            updatedImgs.splice(i, 1);
                            handleChange(index, 'images', updatedImgs);
                          }} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100"><Trash2 size={10}/></button>
                        </div>
                      ))}
                    </div>
                    <label className="cursor-pointer bg-surface border border-borderLine px-3 py-1.5 rounded-lg text-sm hover:bg-white/5 inline-block">
                      + Add Gallery Image
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleUploadFile(index, e.target.files[0], false)} />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-borderLine">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 w-full max-w-md ml-auto bg-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving Projects...' : 'Save Projects List'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectsEditor;
