import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, ShieldCheck, KeyRound } from 'lucide-react';
import { supabase } from '../../supabase';

const SecurityEditor = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async () => {
    if (!email && !password) {
      setMessage({ type: 'error', text: 'Please enter a new email or password to update.' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (!supabase) throw new Error('Supabase is not configured. Cannot update credentials.');

      const updateData = {};
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      const { error } = await supabase.auth.updateUser(updateData);

      if (error) {
        throw error;
      }

      let successMsg = 'Admin credentials updated successfully!';
      if (email) {
        successMsg += ' Please check your email to confirm the change.';
      }

      setMessage({ type: 'success', text: successMsg });
      
      // Clear fields after success
      setEmail('');
      setPassword('');

      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: `Failed to update credentials: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-3xl p-6 md:p-8">
        
        <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-primary/10 rounded-xl text-primary">
            <KeyRound size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin Security</h2>
            <p className="text-sm text-gray-500">Update your portfolio login credentials</p>
          </div>
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start space-x-3 text-blue-800 text-sm">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Your credentials are secured by Supabase.</strong> Updating these fields directly updates your administrator account details in your live Supabase project. If you change your email, you will need to confirm the change via a confirmation email sent to both your old and new addresses.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">New Admin Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@example.com"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">New Admin Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter a strong password"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
            />
          </div>

          <div className="pt-6 mt-4 border-t border-gray-100">
            <button 
              onClick={handleSave} 
              disabled={saving} 
              className="flex items-center justify-center space-x-2 w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 transition-all duration-300 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span>{saving ? 'Updating Credentials...' : 'Update Credentials'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityEditor;
