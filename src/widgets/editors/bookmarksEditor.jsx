import { useState } from 'react';
import { Bookmark } from 'lucide-react';

export const BookmarksEditor = ({ data, onUpdate, theme, inputClass }) => {
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const addLink = () => {
    if (newLink.title && newLink.url) {
      const links = [...(data.links || []), { ...newLink, id: Date.now() }];
      onUpdate({ ...data, links });
      setNewLink({ title: '', url: '' });
    }
  };

  const deleteLink = (id) => {
    const links = data.links.filter(link => link.id !== id);
    onUpdate({ ...data, links });
  };

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className="font-bold mb-3">add resource</h4>
        <div className="space-y-3">
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="resource title"
            className={`w-full px-4 py-2.5 rounded-lg border-2 ${inputClass}`}
          />
          <div className="flex gap-2">
            <input
              type="url"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://..."
              className={`flex-1 px-4 py-2.5 rounded-lg border-2 ${inputClass}`}
            />
            <button
              onClick={addLink}
              className="px-6 py-2.5 bg-yellow-300 text-yellow-900 rounded-lg border-2 border-yellow-400 font-bold hover:bg-yellow-400 transition-all"
            >
              add
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {(data.links || []).map(link => (
          <div
            key={link.id}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            <Bookmark size={18} className="text-yellow-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium block truncate"
              >
                {link.title}
              </a>
              <p className="text-xs text-gray-500 truncate mt-0.5">{link.url}</p>
            </div>
            <button
              onClick={() => deleteLink(link.id)}
              className="text-red-500 hover:text-red-600 transition-colors flex-shrink-0 font-bold text-lg"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};