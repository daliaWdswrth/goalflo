

export const ChecklistPreview = ({ data, theme }) => {
  const allItems = data.items || [];
  const uncompletedItems = allItems.filter(i => !i.completed).slice(0, 5);
  const totalUncompleted = allItems.filter(i => !i.completed).length;
  
  if (allItems.length === 0) {
    return <div className="text-gray-400 text-sm italic">no tasks yet</div>;
  }

  return (
    <div className="space-y-2">
      {uncompletedItems.map(item => (
        <div key={item.id} className="flex items-start gap-2 min-w-0">
          <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-400'
          }`} />
          <span className="text-sm flex-1 break-words leading-relaxed overflow-wrap-anywhere word-break min-w-0" style={{ wordBreak: 'break-word' }}>
            {item.text}
          </span>
        </div>
      ))}
      {totalUncompleted === 0 && (
        <div className="text-gray-400 text-sm italic">all tasks completed! 🎉</div>
      )}
      {totalUncompleted > 5 && (
        <p className="text-xs text-gray-500 italic">+{totalUncompleted - 5} more tasks</p>
      )}
    </div>
  );
};