import React from 'react';

export const CalendarPreview = ({ data, theme }) => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${today.getFullYear()}-${today.getMonth()}-${day}`;
    const dayData = data.markedDates?.[dateKey];
    const isMarked = !!dayData;
    days.push(
      <div
        key={day}
        className={`aspect-square rounded flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all border-2 relative ${
          isMarked 
            ? 'bg-blue-300 text-blue-900 border-blue-400' 
            : theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-300'
        }`}
      >
        {dayData?.emoji ? (
          <span className="text-base sm:text-lg">{dayData.emoji}</span>
        ) : (
          day
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
        {['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'].map((d, i) => (
          <div key={i} className="text-center font-bold text-gray-500 text-[9px] sm:text-xs">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {days}
      </div>
    </div>
  );
};