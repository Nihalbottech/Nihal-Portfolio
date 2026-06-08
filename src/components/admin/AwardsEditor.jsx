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
      const { storage } = await import('../../firebase');
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      
      const storageRef = ref(storage, `uploads/awards/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      if (url) {
        const updated = [...data];
        updated[index].image = url;
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
          <h2 className="text-2xl font-bold text-gray-900">Manage Awards</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or reorder your awards and achievements</p>
        </div>
        <button onClick={handleAddAward} className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300">
          <Plus size={18} />
          <span>Add Award</span>
        </button>
      </div>

      <div className="space-y-5">
        {data.map((award, index) => (
          <motion.div key={index} layout className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
            <div 
              className={`flex justify-between items-center p-5 cursor-pointer transition-colors ${expandedIndex === index ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-center space-x-5">
                {award.image ? (
                  <img src={award.image} alt="" className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm" />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 text-gray-400"><ImageIcon size={24} /></div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{award.title || 'Untitled Award'}</h3>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{award.event || 'No event specified'}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleRemoveAward(index); }} 
                className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                title="Delete Award"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {expandedIndex === index && (
              <div className="p-6 md:p-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Title</label>
                    <input type="text" value={award.title || ''} onChange={(e) => handleChange(index, 'title', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Event Name</label>
                    <input type="text" value={award.event || ''} onChange={(e) => handleChange(index, 'event', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Icon Name</label>
                    <select value={award.icon || 'Star'} onChange={(e) => handleChange(index, 'icon', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all">
                      <option value="Trophy">Trophy</option>
                      <option value="Star">Star</option>
                      <option value="Award">Award</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Description</label>
                    <textarea value={award.desc || ''} onChange={(e) => handleChange(index, 'desc', e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none" rows={4} />
                  </div>
                </div>

                <div className="space-y-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 h-max">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Award Image</label>
                    <div className="flex flex-col space-y-4">
                      {award.image ? (
                        <div className="relative group">
                           <img src={award.image} className="w-full h-48 rounded-xl object-cover border border-gray-200 shadow-sm" />
                        </div>
                      ) : (
                        <div className="w-full h-48 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                           <span>No Image Provided</span>
                        </div>
                      )}
                      
                      <label className="cursor-pointer flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm w-full">
                        <ImageIcon size={16} />
                        <span>{uploadingIdx === index ? 'Uploading...' : 'Upload Award Image'}</span>
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

      <div className="pt-8 pb-4 mt-8 border-t border-gray-200 flex justify-end">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving Awards...' : 'Save All Awards'}</span>
        </button>
      </div>
    </div>
  );
};

export default AwardsEditor;
