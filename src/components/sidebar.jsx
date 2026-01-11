import React, { useState } from 'react';
import { Settings } from 'lucide-react';




export const Sidebar = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  addCategory, 
  deleteCategory,
  renameCategory,
  onReorderCategories, // Add this
  setShowSettings, 
  theme, 
  cardClass 
}) => {

    const [draggedCategory, setDraggedCategory] = useState(null);
  return (
    
    <div className={`w-72 ${cardClass} border-r-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} flex flex-col`}>
      <div className={`p-6 border-b-2 ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-yellow-100'}`}>
        <h1 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          goalflo
        </h1>
        <p className={`text-sm font-bold mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
          track your progress! ⭐︎
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-gray-500 tracking-widest">categories</h2>
          <div className="flex gap-1">
            <button 
              onClick={addCategory} 
              className="w-7 h-7 flex items-center justify-center text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors font-black text-lg"
              title="add category"
            >
              +
            </button>
            <button 
              onClick={deleteCategory} 
              className="w-7 h-7 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors font-black text-lg"
              title="delete category"
            >
              −
            </button>
            
          </div>
        </div>
        
        <div className="space-y-2">
            {categories.map((cat, index) => (
                <button
                    key={cat}
                    draggable
                    onDragStart={() => setDraggedCategory(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                        if (draggedCategory === null) return;
                        const newCategories = [...categories];
                        const [removed] = newCategories.splice(draggedCategory, 1);
                        newCategories.splice(index, 0, removed);
                        onReorderCategories(newCategories);
                        setDraggedCategory(null);
                }}
                onDragEnd={() => setDraggedCategory(null)}
                onClick={() => setActiveCategory(cat)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    renameCategory(cat);
                }}
                className={`w-full text-left px-4 py-3 rounded border-2 transition-all font-bold text-sm cursor-move
                    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                    hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
                    ${draggedCategory === index ? 'opacity-50' : ''}
                    ${activeCategory === cat
                    ? theme === 'dark' 
                        ? 'bg-blue-600 border-blue-400 text-white' 
                        : 'bg-yellow-200 border-yellow-300 text-gray-900'
                    : theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-gray-300' 
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
                    title="Drag to reorder • Right-click to rename"
                >
                    {cat}
                </button>
            ))}
            </div>
      </div>
      
      <button
        onClick={() => setShowSettings(true)}
        className={`m-4 p-3 rounded border-2 transition-all flex items-center gap-3 font-bold text-sm
          shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
          hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
          ${theme === 'dark' 
            ? 'bg-gray-800 border-gray-600 text-gray-300' 
            : 'bg-white border-gray-300'
          }`}
      >
        <Settings size={20} />
        <span>settings</span>
      </button>
    </div>
  );
};