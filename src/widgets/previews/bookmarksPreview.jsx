import { Bookmark } from 'lucide-react';


export const BookmarksPreview = ({ data, theme }) => {
  const links = (data.links || []).slice(0, 4); // Limit to 6 bookmarks
  const totalLinks = (data.links || []).length;
  
  if (totalLinks === 0) {
    return <div className="text-gray-400 text-sm italic">no resources yet</div>;
  }

  return (
    <div className="space-y-2.5">
      {links.map(link => (
        <div key={link.id} className={`flex items-start gap-2 p-2 rounded border-2 min-w-0 ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <Bookmark size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium block break-words overflow-wrap-anywhere leading-relaxed min-w-0" style={{ wordBreak: 'break-word' }}>{link.title}</span>
          </div>
        </div>
      ))}
      {totalLinks > 4 && (
            <p className="text-xs text-gray-500 italic">+{totalLinks - 4} more resources</p>
        )}
    </div>
  );
};