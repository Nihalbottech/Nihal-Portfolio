import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!auth) throw new Error('API key not valid');
      await signInWithEmailAndPassword(auth, email, password);
      // Set local storage so the dashboard doesn't kick us out
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      // Check if it's because firebase is unconfigured
      if (err.message.includes('API key not valid') || err.message.includes('authDomain')) {
        setError('Firebase is not fully configured yet. Please provide your configuration keys.');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface border border-borderLine p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-text mb-2">Admin Login</h2>
          <p className="text-muted text-sm">Sign in to manage your live portfolio</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-red-500 text-sm">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-background border border-borderLine rounded-xl py-3 pl-12 pr-4 text-text focus:outline-none focus:border-primary/50 transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-background border border-borderLine rounded-xl py-3 pl-12 pr-4 text-text focus:outline-none focus:border-primary/50 transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-xl py-3.5 font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted">Secured by Firebase Authentication</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
