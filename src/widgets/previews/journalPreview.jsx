import React from 'react';


export const JournalPreview = ({ data, theme }) => {
  const entries = (data.entries || []).slice(0, 2); // Limit to 3 entries
  if ((data.entries || []).length === 0) {
    return <div className="text-gray-400 text-sm italic">no entries yet</div>;
  }

  return (
    <div className="space-y-2">
      {entries.map(entry => (
        <div key={entry.id} className={`p-3 rounded-lg text-sm ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="text-xs text-gray-500 mb-1">
            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed break-words">{entry.content}</p>
        </div>
      ))}
      {(data.entries || []).length > 2 && (
            <p className="text-xs text-gray-500 italic">+{(data.entries || []).length - 2} more entries</p>
      )}
    </div>
  );
};