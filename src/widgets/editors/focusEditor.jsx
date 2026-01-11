import React from 'react';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const FocusEditor = ({ data, onUpdate, theme, inputClass }) => {
  const [focus, setFocus] = useState(data.focus || '');

  const saveFocus = () => {
    onUpdate({ ...data, focus });
  };

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-cyan-50 border-cyan-200'}`}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-cyan-600" />
          <h4 className="font-bold">what's your current focus?</h4>
        </div>
        <textarea
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="describe what you're focusing on improving right now..."
          rows="6"
          className={`w-full px-4 py-3 rounded-lg border-2 ${inputClass} resize-none break-words`}
        />
        <button
          onClick={saveFocus}
          className="mt-3 w-full py-2.5 bg-cyan-300 text-cyan-900 rounded-lg border-2 border-cyan-400 font-bold hover:bg-cyan-400 transition-all"
        >
          save focus
        </button>
      </div>

      {data.focus && (
        <div className={`p-4 rounded-xl border-l-2 border-cyan-400 ${theme === 'dark' ? 'bg-gray-800/50 border-r-2 border-t-2 border-b-2 border-gray-700' : 'bg-cyan-50 border-r-2 border-t-2 border-b-2 border-cyan-200'}`}>
          <p className="font-bold mb-2 text-cyan-700">current focus:</p>
          <p className="whitespace-pre-wrap leading-relaxed break-words">{data.focus}</p>
        </div>
      )}
    </div>
  );
};