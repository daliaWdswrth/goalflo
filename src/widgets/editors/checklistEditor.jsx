import React from 'react';
import { useState } from 'react';

export const ChecklistEditor = ({ data, onUpdate, theme, inputClass }) => {
  const [newItem, setNewItem] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  const addItem = () => {
    if (newItem.trim()) {
      const items = [...(data.items || []), { id: Date.now(), text: newItem, completed: false }];
      onUpdate({ ...data, items });
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    const items = data.items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdate({ ...data, items });
  };

  const deleteItem = (id) => {
    const items = data.items.filter(item => item.id !== id);
    onUpdate({ ...data, items });
  };

  const deleteAllCompleted = () => {
    const items = data.items.filter(item => !item.completed);
    onUpdate({ ...data, items });
    setShowCompleted(false);
  };

  const allItems = data.items || [];
  const uncompletedItems = allItems.filter(i => !i.completed);
  const completedItems = allItems.filter(i => i.completed);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          placeholder="add a new task..."
          className={`flex-1 px-4 py-2.5 rounded-lg border-2 ${inputClass} min-w-0`}
        />
        <button
          onClick={addItem}
          className="px-6 py-2.5 bg-pink-300 text-pink-900 rounded-lg border-2 border-pink-400 font-bold hover:bg-pink-400 transition-all flex-shrink-0"
        >
          add
        </button>
      </div>

      {/* Active Tasks */}
      <div>
        <h4 className="font-bold mb-2 text-sm">active tasks</h4>
        <div className="space-y-2">
          {uncompletedItems.map(item => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all ${
                theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
                className="w-5 h-5 rounded cursor-pointer mt-0.5 flex-shrink-0"
              />
              <span className="flex-1 break-words overflow-wrap-anywhere word-break">
                {item.text}
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-600 transition-colors font-bold text-lg flex-shrink-0"
              >
                ×
              </button>
            </div>
          ))}
          {uncompletedItems.length === 0 && (
            <div className="text-gray-400 text-sm italic text-center py-4">no active tasks</div>
          )}
        </div>
      </div>

      {/* Completed Tasks Section */}
      {completedItems.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2 gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                  : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {showCompleted ? '↑ hide' : '↓ show'} completed tasks ({completedItems.length})
            </button>
            {showCompleted && (
              <button
                onClick={deleteAllCompleted}
                className="px-4 py-2 bg-red-300 text-red-900 rounded-lg border-2 border-red-400 font-bold hover:bg-red-400 transition-all flex-shrink-0"
              >
                clear all
              </button>
            )}
          </div>
          
          {showCompleted && (
            <div className="space-y-2">
              {completedItems.map(item => (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all ${
                    theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id)}
                    className="w-5 h-5 rounded cursor-pointer mt-0.5 flex-shrink-0"
                  />
                  <span className="flex-1 line-through text-gray-500 break-words overflow-wrap-anywhere word-break">
                    {item.text}
                  </span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors font-bold text-lg flex-shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};