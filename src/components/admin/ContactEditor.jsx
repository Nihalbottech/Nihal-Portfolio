import React from 'react';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactEditor = ({ contactData, socialsData, onContactChange, onSocialsChange, onSave, saving }) => {
  if (!contactData || !socialsData) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Manage Contact & Socials</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <motion.div layout className="bg-surface border border-borderLine rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-1">Email Address</label>
              <input 
                type="email"
                value={contactData.email || ''} 
                onChange={(e) => onContactChange({...contactData, email: e.target.value})} 
                className="w-full bg-background border border-borderLine rounded-lg p-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">Phone Number (Display)</label>
              <input 
                type="text"
                value={contactData.phone || ''} 
                onChange={(e) => onContactChange({...contactData, phone: e.target.value})} 
                className="w-full bg-background border border-borderLine rounded-lg p-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-muted mb-1">WhatsApp URL</label>
              <input 
                type="text"
                value={contactData.whatsappUrl || ''} 
                onChange={(e) => onContactChange({...contactData, whatsappUrl: e.target.value})} 
                className="w-full bg-background border border-borderLine rounded-lg p-3 text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div layout className="bg-surface border border-borderLine rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Social Media Links</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {socialsData.map((social, index) => (
              <div key={index} className="bg-background border border-borderLine rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-primary">{social.name}</h4>
                  <span className="text-xs uppercase bg-surface px-2 py-1 rounded border border-borderLine">{social.letter}</span>
                </div>
                <div>
                  <label className="block text-[10px] text-muted mb-1 uppercase tracking-wider">Profile URL</label>
                  <input 
                    type="text" 
                    value={social.href || ''} 
                    onChange={(e) => {
                      const updated = [...socialsData];
                      updated[index].href = e.target.value;
                      onSocialsChange(updated);
                    }}
                    className="w-full bg-surface border border-borderLine rounded-md p-2 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="pt-6 border-t border-borderLine">
        <button onClick={onSave} disabled={saving} className="flex items-center justify-center space-x-2 w-full max-w-md ml-auto bg-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Saving Info...' : 'Save Contact Info'}</span>
        </button>
      </div>
    </div>
  );
};

export default ContactEditor;
