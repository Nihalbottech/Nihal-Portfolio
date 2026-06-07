import React, { useState } from 'react';
import { Save, Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AwardsEditor = ({ data, onChange, onSave, saving, toBase64 }) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [uploadingIdx, setUploadingIdx] = useState(null);

  const handleAddAward = () => {
    const newAward = {
      title: "New Award",
      event: "",
      desc: "",
      icon: "Star",
      image: ""
    };
    onChange([newAward, ...data]);
    setExpandedIndex(0);
  };

  const handleRemoveAward = (index) => {
    if(window.confirm('Are you sure you want to delete this award?')) {
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

  const handleUploadFile = async (index, file) => {
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
        updated[index].image = result.url;
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
        <h2 className="text-2xl font-bold">Manage Awards</h2>
        <button onClick={handleAddAward} className="flex items-center space-x-2 bg-primary/20 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/30 transition">
          <Plus size={18} />
          <span>Add Award</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.map((award, index) => (
          <motion.div key={index} layout className="bg-surface border border-borderLine rounded-xl overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/5 transition"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-4">
                {award.image ? (
                  <img src={award.image} alt="" className="w-12 h-12 object-cover rounded-md" />
                ) : (
                  <div className="w-12 h-12 bg-black/20 rounded-md flex items-center justify-center text-muted"><ImageIcon size={20} /></div>
                )}
                <div>
                  <h3 className="font-bold text-lg">{award.title || 'Untitled Award'}</h3>
                  <p className="text-xs text-muted">{award.event || 'No event specified'}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleRemoveAward(index); }} 
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
                    <input type="text" value={award.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Event Name</label>
                    <input type="text" value={award.event || ''} onChange={(e) => handleChange(index, 'event', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Icon Name (Trophy, Star, Award)</label>
                    <select value={award.icon || 'Star'} onChange={(e) => handleChange(index, 'icon', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm text-text">
                      <option value="Trophy">Trophy</option>
                      <option value="Star">Star</option>
                      <option value="Award">Award</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Description</label>
                    <textarea value={award.desc || ''} onChange={(e) => handleChange(index, 'desc', e.target.value)} className="w-full bg-background border border-borderLine rounded-lg p-2 text-sm" rows={4} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-2">Award Image</label>
                    <div className="flex items-center space-x-4">
                      {award.image && <img src={award.image} className="h-24 rounded object-cover border border-borderLine" />}
                      <label className="cursor-pointer bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm hover:bg-primary/30">
                        {uploadingIdx === index ? 'Uploading...' : 'Upload Image'}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleUploadFile(index, e.target.files[0])} />
                      </label>
                    </div>
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
          <span>{saving ? 'Saving Awards...' : 'Save Awards List'}</span>
        </button>
      </div>
    </div>
  );
};

export default AwardsEditor;
