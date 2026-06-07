import React, { useState } from 'react';
import { Save, AlertTriangle, Loader2 } from 'lucide-react';

const AdvancedEditor = ({ data, onSave, saving, contentRef }) => {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(data, null, 2));
  const [error, setError] = useState(null);

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      // We pass the parsed data to a ref or handler in AdminDashboard
      contentRef(parsed);
      setError(null);
      onSave(); // trigger save
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Advanced Database Editor</h2>
          <p className="text-muted text-sm mt-1">Directly edit the raw JSON format of your website's database.</p>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start space-x-3 text-red-500 text-sm">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p><strong>Warning:</strong> Editing the raw JSON directly can break your website if not formatted correctly. Make sure quotes, commas, and brackets are perfectly balanced. Only edit values inside the quotes.</p>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-borderLine shadow-inner">
        <div className="bg-surface border-b border-borderLine px-4 py-2 flex justify-between items-center">
          <span className="text-xs font-mono text-muted">content.json</span>
        </div>
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            setError(null);
          }}
          className="w-full h-[500px] bg-transparent text-[#d4d4d4] font-mono text-sm p-4 focus:outline-none resize-y custom-scrollbar"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-lg text-sm font-mono">
          Syntax Error: {error}
        </div>
      )}

      <div className="pt-6 border-t border-borderLine">
        <button 
          onClick={handleApply} 
          disabled={saving || error} 
          className="flex items-center justify-center space-x-2 w-full max-w-md ml-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{saving ? 'Overwriting Database...' : 'Overwrite Database'}</span>
        </button>
      </div>
    </div>
  );
};

export default AdvancedEditor;
