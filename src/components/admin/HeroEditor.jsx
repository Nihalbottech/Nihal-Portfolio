import React, { useState } from 'react';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroEditor = ({ data, onChange, onSave, saving, toBase64 }) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      
      try {
        if (toBase64) {
          const url = await toBase64(file);
          if (url) {
            onChange({ ...data, profileImgUrl: url }); 
          }
        }
      } catch (err) {
        console.error('Failed to upload image', err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Hero Section</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">First Name</label>
                <input type="text" value={data.firstName || ''} onChange={(e) => onChange({...data, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Last Name (Highlighted)</label>
                <input type="text" value={data.lastName || ''} onChange={(e) => onChange({...data, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Titles (One per line)</label>
              <textarea value={data.titles || ''} onChange={(e) => onChange({...data, titles: e.target.value})} rows={2} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Description</label>
              <textarea value={data.description || ''} onChange={(e) => onChange({...data, description: e.target.value})} rows={4} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none" />
            </div>

            <div className="pt-6 mt-4 border-t border-gray-100">
              <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 disabled:opacity-50">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 text-center">
          <h2 className="text-lg font-bold mb-5 text-gray-900">Profile Photo</h2>
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 mb-5 group shadow-inner">
            {preview || data.profileImgUrl ? (
              <img src={preview || data.profileImgUrl} alt="Preview" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 flex-col bg-gray-50/50">
                <ImageIcon size={48} className="mb-3 opacity-40" />
                <span className="text-sm font-bold text-gray-500">No Custom Photo</span>
                <span className="text-xs mt-1 font-medium text-gray-400">Default will be used</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <label className="cursor-pointer bg-white text-gray-900 px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-transform">
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium px-2 leading-relaxed">Click the image area to upload a new portrait. Changes apply immediately upon saving.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroEditor;
