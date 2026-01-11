import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const SettingsModal = ({ 
  showSettings, 
  setShowSettings, 
  showDevNotes, 
  setShowDevNotes, 
  toggleTheme, 
  handleExport, 
  handleImport, 
  theme, 
  cardClass 
}) => {
  const [showUpdates, setShowUpdates] = useState(false);

  if (!showSettings) return null;

  const handleReset = async () => {
    const confirmed = confirm('⚠️ Are you sure you want to reset ALL data? This will delete everything and cannot be undone!');
    
    if (!confirmed) return;
    
    const doubleConfirm = confirm('This is your last chance! Really delete everything?');
    
    if (!doubleConfirm) return;
    
    try {
      // Clear all storage
      const result = await window.storage.list();
      if (result && result.keys) {
        for (const key of result.keys) {
          await window.storage.delete(key);
        }
      }
      
      alert('✅ All data has been reset! Reloading...');
      window.location.reload();
    } catch (error) {
      console.error('Reset error:', error);
      alert('❌ Reset failed!');
    }
  };

  // Developer Updates - Edit this section with new updates
  const developerUpdates = [
    {
      date: "January 11, 2025",
      version: "v1.1.0",
      updates: [
        "★ Couple new features + fixes ★",
        "✧ Added drag-and-drop category reordering",
        "✧ Added category renaming",
        "✧ Updated goal widget preview"
      ]
    },
    {
      date: "January 10, 2025",
      version: "v1.0.0",
      updates: [
        "★ Initial release of goalflo ★",
        "✧ Added 6 widget types: Calendar, Goals, Journal, Tasks, Resources, and Focus",
        "✧ Light and dark theme support",
        "✧ Multiple categories for organization",
        "✧ Data export and import functionality",
        "✧ Reset all data option"
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-30 p-4 pt-8 pb-8 overflow-y-auto">
      <div className={`${cardClass} rounded-lg border-2 p-6 max-w-md w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black">settings</h3>
          <button 
            onClick={() => {
              setShowSettings(false);
              setShowDevNotes(false);
              setShowUpdates(false);
            }}
            className={`p-2 rounded border-2 font-black text-xl ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-purple-300 bg-purple-100'
          }`}>
            <div>
              <p className="font-black text-sm">theme</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>light / dark mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded border-2 transition-all
                shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
                ${theme === 'dark' 
                  ? 'bg-yellow-400 border-yellow-300 text-yellow-900' 
                  : 'bg-indigo-300 border-indigo-400 text-indigo-900'
                }`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-blue-300 bg-blue-100'
          }`}>
            <p className="font-black text-sm mb-2">data management</p>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>export, import, or reset your data</p>
            <button
              onClick={handleExport}
              className={`w-full py-2 rounded-lg border-2 font-bold mb-2 transition-all
                shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]
                ${theme === 'dark' 
                  ? 'bg-blue-400 border-blue-300 text-blue-900' 
                  : 'bg-blue-300 border-blue-400 text-blue-900'
                }`}
            >
              📥 export data
            </button>
            <label className={`block w-full py-2 rounded-lg border-2 font-bold text-center cursor-pointer transition-all mb-2
                shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]
                ${theme === 'dark' 
                  ? 'bg-green-400 border-green-300 text-green-900' 
                  : 'bg-green-300 border-green-400 text-green-900'
                }`}
            >
              📤 import data
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleReset}
              className={`w-full py-2 rounded-lg border-2 font-bold transition-all
                shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]
                bg-red-300 border-red-400 text-red-900 hover:bg-red-400`}
            >
              🗑️ reset all data
            </button>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>⚠️ exporting creates backup files. resetting deletes everything permanently!</p>
          </div>

          {/* Developer Updates Section */}
          <div className={`p-4 rounded-lg border-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-orange-300 bg-orange-100'
          }`}>
            <button
              onClick={() => setShowUpdates(!showUpdates)}
              className="w-full flex items-center justify-between font-black text-sm"
            >
              <span>🚀 what's new</span>
              <span className="text-xl">{showUpdates ? '▼' : '▶'}</span>
            </button>
            
            {showUpdates && (
              <div className={`text-sm space-y-4 mt-3 max-h-96 overflow-y-auto pr-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                {developerUpdates.map((update, index) => (
                  <div key={index} className={`pb-3 ${index !== developerUpdates.length - 1 ? 'border-b border-gray-400' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-base">{update.version}</p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{update.date}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {update.updates.map((item, itemIndex) => (
                        <li key={itemIndex} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            theme === 'dark' ? 'border-gray-600 bg-gray-800' : 'border-green-300 bg-green-100'
          }`}>
            <button
              onClick={() => setShowDevNotes(!showDevNotes)}
              className="w-full flex items-center justify-between font-black text-sm"
            >
              <span>📖 how to use goalflo</span>
              <span className="text-xl">{showDevNotes ? '▼' : '▶'}</span>
            </button>
            
            {showDevNotes && (
              <div className={`text-sm space-y-2 mt-3 max-h-96 overflow-y-auto pr-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                <p className="font-bold">welcome to goalflo! 🎉</p>
                
                <p><strong>getting started:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>click "+ add widget" to add tracking tools</li>
                  <li>click any widget to expand and edit it</li>
                  <li>use categories to organize different areas of life</li>
                </ul>
                
                <p><strong>managing your data:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>data is saved in your browser automatically</li>
                  <li>clearing cache/cookies will delete your data</li>
                  <li>use "export data" regularly to create backups</li>
                  <li>keep backup files safe - you'll need them to restore</li>
                </ul>
                
                <p><strong>tips:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>calendar: click days to add emojis</li>
                  <li>tasks: completed items are hidden by default</li>
                  <li>switch themes in settings for comfort</li>
                  <li>right click a category you want to rename</li>
                  <li>click and drag categories to rearrange</li>
                </ul>
                
                <p className="text-xs italic pt-2 border-t border-gray-400">
                  💾 remember: export your data regularly! browser data can be lost if you clear cache, switch devices, or reinstall your browser.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
