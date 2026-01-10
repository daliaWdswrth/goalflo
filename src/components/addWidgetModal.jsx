import React from 'react';
import { WIDGET_CONFIG } from '../config/widgetConfig';

export const AddWidgetModal = ({ 
  showAddWidget, 
  setShowAddWidget, 
  widgets, 
  addWidget, 
  theme, 
  cardClass 
}) => {
  if (!showAddWidget) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-30 p-4">
      <div className={`${cardClass} rounded-lg border-2 p-4 sm:p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-black">add widget</h3>
          <button 
            onClick={() => setShowAddWidget(false)}
            className={`p-2 rounded border-2 font-black text-xl ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(WIDGET_CONFIG).map(([type, config]) => {
            const Icon = config.icon;
            const alreadyAdded = widgets.some(w => w.type === type);
            
            return (
              <button
                key={type}
                onClick={() => addWidget(type)}
                disabled={alreadyAdded}
                className={`p-4 sm:p-6 rounded-lg border-2 transition-all group relative flex flex-col items-center justify-center
                  shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]
                  ${alreadyAdded 
                    ? 'opacity-50 cursor-not-allowed border-gray-400 bg-gray-200' 
                    : `${config.borderColor} ${config.color} hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]`
                  }`}
              >
                {alreadyAdded && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-400 text-red-900 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border-2 border-red-500 font-bold">
                    added
                  </div>
                )}
                <Icon size={32} className={`mb-2 sm:mb-3 ${config.textColor}`} />
                <div className={`font-black text-sm sm:text-lg text-center ${config.textColor}`}>{config.label}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};