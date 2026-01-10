import { WIDGET_CONFIG } from '../config/widgetConfig';
import { WidgetPreview } from '../widgets/widgetPreview';

export const WidgetCard = ({ widget, onClick, theme }) => {
  const config = WIDGET_CONFIG[widget.type];
  const Icon = config.icon;
  
  return (
    <div
        onClick={onClick}
        className={`group relative overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]
            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
            ${theme === 'dark' 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-300'
            } flex flex-col w-full`}
    >
      {/* Header bar */}
      <div className={`px-3 py-2 border-b-2 flex items-center gap-2 flex-shrink-0 ${config.color} ${config.borderColor}`}>
        <div className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white/50'}`}>
          <Icon size={16} className={`${config.textColor} ${theme === 'dark' ? 'stroke-white' : ''}`} />
        </div>
        <h3 className={`font-bold text-sm tracking-wide truncate ${config.textColor}`}>
          {config.label}
        </h3>
      </div>
      
      {/* Content Preview */}
      <div className="p-3">
        <WidgetPreview widget={widget} theme={theme} />
    </div>
    </div>
  );
};