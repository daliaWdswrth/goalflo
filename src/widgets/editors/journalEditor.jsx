import React from 'react';
import { useState } from 'react';

export const JournalEditor = ({ data, onUpdate, theme, inputClass }) => {
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (newEntry.trim()) {
      const entries = [
        { id: Date.now(), date: new Date().toISOString(), content: newEntry },
        ...(data.entries || [])
      ];
      onUpdate({ ...data, entries });
      setNewEntry('');
    }
  };

  const deleteEntry = (id) => {
    const entries = data.entries.filter(e => e.id !== id);
    onUpdate({ ...data, entries });
  };

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="what's on your mind today?"
          rows="4"
          className={`w-full px-4 py-3 rounded-lg border-2 ${inputClass} resize-none`}
        />
        <button
          onClick={addEntry}
          className="mt-3 w-full py-2.5 bg-purple-300 text-purple-900 rounded-lg border-2 border-purple-400 font-bold hover:bg-purple-400 transition-all"
        >
          save entry
        </button>
      </div>

      <div className="space-y-3">
        {(data.entries || []).map(entry => (
          <div key={entry.id} className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium text-gray-500">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="text-red-500 hover:text-red-600 font-bold text-lg flex-shrink-0"
              >
                ×
              </button>
            </div>
            <p className="whitespace-pre-wrap leading-relaxed break-words">{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
