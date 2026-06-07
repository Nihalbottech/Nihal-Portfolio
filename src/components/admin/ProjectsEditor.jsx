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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8 px-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Projects</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or reorder your portfolio projects</p>
        </div>
        <button onClick={handleAddProject} className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300">
          <Plus size={18} />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-5">
        {data.map((project, index) => (
          <motion.div key={index} layout className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
            <div 
              className={`flex justify-between items-center p-5 cursor-pointer transition-colors ${expandedIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-5">
                {project.src ? (
                  project.src.endsWith('.mp4') ? 
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200"><Video className="w-6 h-6 text-gray-400" /></div> : 
                  <img src={project.src} alt="" className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm" />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400"><ImageIcon size={24} /></div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{project.title || 'Untitled Project'}</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{project.date || 'No date specified'}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleRemoveProject(index); }} 
                className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                title="Delete Project"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="p-6 md:p-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Title</label>
                    <input type="text" value={project.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Date</label>
                    <input type="text" value={project.date || ''} onChange={(e) => handleChange(index, 'date', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" placeholder="e.g. Jun 2025 - Jul 2025" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Association (Optional)</label>
                    <input type="text" value={project.association || ''} onChange={(e) => handleChange(index, 'association', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Quote</label>
                    <textarea value={project.quote || ''} onChange={(e) => handleChange(index, 'quote', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none" rows={2} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Description</label>
                    <textarea value={project.description || ''} onChange={(e) => handleChange(index, 'description', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none" rows={4} />
                  </div>
                </div>

                <div className="space-y-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Main Media (Thumbnail/Video)</label>
                    <div className="flex flex-col space-y-3">
                      {project.src && (
                        project.src.endsWith('.mp4') ? 
                        <video src={project.src} controls className="w-full h-40 rounded-xl object-cover border border-gray-200 shadow-sm" /> :
                        <img src={project.src} className="w-full h-40 rounded-xl object-cover border border-gray-200 shadow-sm" />
                      )}
                      <label className="cursor-pointer bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-300 transition-all text-center shadow-sm w-max">
                        {uploadingIdx === index ? 'Uploading...' : 'Upload Main Media'}
                        <input type="file" accept="image/*,video/mp4" className="hidden" onChange={(e) => e.target.files[0] && handleUploadFile(index, e.target.files[0], true)} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Gallery Images</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {(project.images || []).map((img, imgIdx) => (
                        <div key={imgIdx} className="relative group">
                          <img src={img} className="w-full h-24 object-cover rounded-xl border border-gray-200 shadow-sm" />
                          <button 
                            onClick={() => {
                              const updated = [...data];
                              updated[index].images.splice(imgIdx, 1);
                              onChange(updated);
                            }}
                            className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="cursor-pointer flex items-center justify-center space-x-2 bg-white border border-dashed border-gray-300 text-gray-600 font-semibold px-4 py-3 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm w-full">
                      <Plus size={16} />
                      <span>{uploadingIdx === index ? 'Uploading...' : 'Add Gallery Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleUploadFile(index, e.target.files[0], false)} />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pt-8 pb-4 mt-8 border-t border-gray-200 flex justify-end">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving Projects...' : 'Save All Projects'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectsEditor;
