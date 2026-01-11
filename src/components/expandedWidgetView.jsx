import React from 'react';
import { WIDGET_TYPES, WIDGET_CONFIG } from '../config/widgetConfig';
import { CalendarEditor } from '../widgets/editors/calendarEditor';
import { JournalEditor } from '../widgets/editors/journalEditor';
import { GoalMonitorEditor } from '../widgets/editors/goalEditor';
import { ChecklistEditor } from '../widgets/editors/checklistEditor';
import { FocusEditor } from '../widgets/editors/focusEditor';
import { BookmarksEditor } from '../widgets/editors/bookmarksEditor';


export const ExpandedWidgetView = ({ widget, onClose, onUpdate, onDelete, theme }) => {
  if (!widget) return null;
  
  const config = WIDGET_CONFIG[widget.type];
  const Icon = config.icon;
  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300';
  const inputClass = theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200';
  
  const renderEditor = () => {
    const props = { data: widget.data, onUpdate: (newData) => onUpdate(widget.id, newData), theme, inputClass };
    
    switch(widget.type) {
      case WIDGET_TYPES.CALENDAR:
        return <CalendarEditor {...props} />;
      case WIDGET_TYPES.GOAL_MONITOR:
        return <GoalMonitorEditor {...props} />;
      case WIDGET_TYPES.JOURNAL:
        return <JournalEditor {...props} />;
      case WIDGET_TYPES.CHECKLIST:
        return <ChecklistEditor {...props} />;
      case WIDGET_TYPES.BOOKMARKS:
        return <BookmarksEditor {...props} />;
      case WIDGET_TYPES.FOCUS:
        return <FocusEditor {...props} />;
      default:
        return null;
    }
  };
  
return (
  <div className={`${cardClass} rounded-2xl border-2 flex flex-col shadow-lg overflow-hidden`} style={{ maxHeight: '85vh' }}>
    {/* Header */}
    <div className={`flex justify-between items-center p-6 pb-4 border-b-2 flex-shrink-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl ${config.color} border-2 ${config.borderColor}`}>
          <Icon size={24} className={config.textColor} />
        </div>
        <h2 className="text-2xl font-bold">{config.label}</h2>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onDelete(widget.id)}
          className="px-4 py-2 bg-red-300 text-red-900 rounded-lg border-2 border-red-400 hover:bg-red-400 transition-all font-bold"
        >
          delete
        </button>
        <button
          onClick={onClose}
          className={`p-2 rounded-lg border-2 transition-colors font-bold text-lg ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
        >
          ×
        </button>
      </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 overflow-y-auto p-6 min-h-0">
      {renderEditor()}
    </div>
  </div>
);
};