import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactEditor = ({ contactData, socialsData, onContactChange, onSocialsChange, onSave, saving }) => {
  if (!contactData || !socialsData) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="px-2 mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Manage Contact & Socials</h2>
        <p className="text-sm text-gray-500 mt-1">Update your contact details and social media links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div layout className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8 h-max">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Email Address</label>
              <input 
                type="email"
                value={contactData.email || ''} 
                onChange={(e) => onContactChange({...contactData, email: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Phone Number (Display)</label>
              <input 
                type="text"
                value={contactData.phone || ''} 
                onChange={(e) => onContactChange({...contactData, phone: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">WhatsApp URL</label>
              <input 
                type="text"
                value={contactData.whatsappUrl || ''} 
                onChange={(e) => onContactChange({...contactData, whatsappUrl: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-xl p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div layout className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Social Media Links</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {socialsData.map((social, index) => (
              <div key={index} className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-primary">{social.name}</h4>
                  <span className="text-[10px] font-bold text-gray-500 uppercase bg-white px-2 py-1 rounded-lg border border-gray-200">{social.letter}</span>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Profile URL</label>
                  <input 
                    type="text" 
                    value={social.href || ''} 
                    onChange={(e) => {
                      const updated = [...socialsData];
                      updated[index].href = e.target.value;
                      onSocialsChange(updated);
                    }}
                    className="w-full bg-white border border-gray-200 text-gray-900 font-medium rounded-lg p-2 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
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
          <span>{saving ? 'Saving Info...' : 'Save Contact Info'}</span>
        </button>
      </div>
    </div>
  );
};

export default ContactEditor;
