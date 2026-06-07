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
        const base64 = await toBase64(file);
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: file.name, base64 })
        });
        const result = await res.json();
        if (result.url) {
          onChange({ ...data, profileImgUrl: result.url }); // Note: We actually mapped hero image directly in Hero.jsx to profile.png, but leaving this for future proofing.
        }
      } catch (err) {
        console.error('Failed to upload image', err);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-surface border border-borderLine rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6">Hero Section</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-2">First Name</label>
                <input type="text" value={data.firstName || ''} onChange={(e) => onChange({...data, firstName: e.target.value})} className="w-full bg-background border border-borderLine text-text rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-2">Last Name (Highlighted)</label>
                <input type="text" value={data.lastName || ''} onChange={(e) => onChange({...data, lastName: e.target.value})} className="w-full bg-background border border-borderLine text-text rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Titles (One per line)</label>
              <textarea value={data.titles || ''} onChange={(e) => onChange({...data, titles: e.target.value})} rows={2} className="w-full bg-background border border-borderLine text-text rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Description</label>
              <textarea value={data.description || ''} onChange={(e) => onChange({...data, description: e.target.value})} rows={3} className="w-full bg-background border border-borderLine text-text rounded-xl py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none" />
            </div>

            <div className="pt-4 border-t border-borderLine">
              <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 w-full bg-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50">
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="md:col-span-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-surface border border-borderLine rounded-2xl p-6 text-center">
          <h2 className="text-lg font-bold mb-4">Profile Photo</h2>
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-background border border-borderLine mb-4 group">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover object-top" />
            ) : (
              <div className="flex items-center justify-center h-full text-muted flex-col bg-black/10">
                <ImageIcon size={40} className="mb-2 opacity-50" />
                <span className="text-sm font-medium text-primary">Current Photo Loaded</span>
                <span className="text-xs mt-1">Upload to replace</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
          <p className="text-xs text-muted">Click the image to upload a new one. Don't forget to click "Save Changes".</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroEditor;
