import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Loader2, Layout, FolderKanban, Award } from 'lucide-react';
import contentData from '../../data/content.json';
import HeroEditor from './HeroEditor';
import ProjectsEditor from './ProjectsEditor';
import AwardsEditor from './AwardsEditor';

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
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });

      if (!response.ok) {
        throw new Error('Failed to save to local file');
      }

      setMessage({ type: 'success', text: 'All changes saved to content.json! Check your main site.' });
      
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
    return <div className="min-h-screen bg-background flex items-center justify-center text-text"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: <Layout size={18} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={18} /> },
    { id: 'awards', label: 'Awards', icon: <Award size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-background text-text p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 border-b border-borderLine pb-6 gap-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-muted mt-1">Manage your complete portfolio content</p>
          </div>
          
          <div className="flex items-center space-x-4">
             {/* Tabs Desktop */}
            <div className="hidden md:flex bg-surface border border-borderLine rounded-lg p-1">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-text hover:bg-white/5'}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-borderLine rounded-lg hover:text-red-500 transition-colors h-[42px]"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Tabs Mobile */}
        <div className="flex md:hidden bg-surface border border-borderLine rounded-lg p-1 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-muted hover:text-text hover:bg-white/5'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {message.text && (
          <div className={`p-4 rounded-xl mb-6 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-500' : 'bg-red-500/10 border border-red-500/30 text-red-500'}`}>
            {message.text}
          </div>
        )}

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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
