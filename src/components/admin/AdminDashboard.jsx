import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2, Layout, FolderKanban, Award, User, Mail, Settings, ShieldCheck, KeyRound } from 'lucide-react';
import contentData from '../../data/content.json';
import HeroEditor from './HeroEditor';
import ProjectsEditor from './ProjectsEditor';
import AwardsEditor from './AwardsEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';
import SecurityEditor from './SecurityEditor';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Full content state
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin');
      return;
    }

    // Clone initial data from content.json
    setContent(JSON.parse(JSON.stringify(contentData)));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../../firebase');
      
      if (!db) throw new Error('Firebase is not configured. Cannot save changes.');

      await setDoc(doc(db, 'portfolio', 'content'), content);

      setMessage({ type: 'success', text: 'All changes saved to your live portfolio!' });
      
      // Auto dismiss message
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-text"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
  }

  const tabs = [
    { id: 'hero', label: 'Hero', icon: <Layout size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'awards', label: 'Awards', icon: <Award size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'security', label: 'Security', icon: <KeyRound size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 text-text p-4 md:p-8 relative">
      {/* Decorative Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl p-5 md:px-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-black text-gray-900 tracking-tight">Admin Console</h1>
              <p className="text-gray-500 text-sm font-medium mt-0.5">Manage your digital portfolio seamlessly</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
             {/* Tabs Desktop */}
            <div className="hidden xl:flex bg-gray-100/50 p-1.5 rounded-xl border border-gray-200/60 shadow-inner">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-primary shadow-md ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 h-[44px]"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Tabs Tablet/Mobile */}
        <div className="flex xl:hidden bg-white/70 backdrop-blur-md border border-gray-200 shadow-sm rounded-2xl p-2 mb-8 overflow-x-auto custom-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 shadow-sm font-medium flex items-center justify-center ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}

        {/* Editor Container */}
        <div className="pb-24">
          {activeTab === 'hero' && (
            <HeroEditor 
              data={content.hero} 
              onChange={(data) => setContent({...content, hero: data})} 
              onSave={handleSaveAll}
              saving={saving}
              toBase64={toBase64}
            />
          )}

          {activeTab === 'about' && (
            <AboutEditor 
              data={content.about} 
              onChange={(data) => setContent({...content, about: data})} 
              onSave={handleSaveAll}
              saving={saving}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsEditor 
              data={content.projects || []} 
              onChange={(data) => setContent({...content, projects: data})} 
              onSave={handleSaveAll}
              saving={saving}
              toBase64={toBase64}
            />
          )}

          {activeTab === 'awards' && (
            <AwardsEditor 
              data={content.awards || []} 
              onChange={(data) => setContent({...content, awards: data})} 
              onSave={handleSaveAll}
              saving={saving}
              toBase64={toBase64}
            />
          )}

          {activeTab === 'contact' && (
            <ContactEditor 
              contactData={content.contact} 
              socialsData={content.socials} 
              onContactChange={(data) => setContent({...content, contact: data})} 
              onSocialsChange={(data) => setContent({...content, socials: data})} 
              onSave={handleSaveAll}
              saving={saving}
            />
          )}

          {activeTab === 'security' && (
            <SecurityEditor />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
