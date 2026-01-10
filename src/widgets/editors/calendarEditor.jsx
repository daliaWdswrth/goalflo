import { useState } from 'react';


export const CalendarEditor = ({ data, onUpdate, theme }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [emojiInput, setEmojiInput] = useState('');

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const toggleDate = (day) => {
    // Don't allow selecting another day if one is already selected
    if (selectedDay) return;
    
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    const dayData = data.markedDates?.[dateKey];
    
    if (dayData) {
      // If already marked, show emoji input
      setSelectedDay({ day, dateKey, currentEmoji: dayData.emoji });
      setEmojiInput(dayData.emoji || '');
    } else {
      // Mark the day
      const newMarked = { ...data.markedDates };
      newMarked[dateKey] = { emoji: '' };
      onUpdate({ ...data, markedDates: newMarked });
      setSelectedDay({ day, dateKey, currentEmoji: '' });
      setEmojiInput('');
    }
  };

  const saveEmoji = () => {
    if (selectedDay) {
      const newMarked = { ...data.markedDates };
      // Only keep first character and ensure it's preserved correctly
      const emoji = emojiInput.trim() ? emojiInput.trim().substring(0, 2) : '';
      newMarked[selectedDay.dateKey] = { emoji };
      onUpdate({ ...data, markedDates: newMarked });
      setSelectedDay(null);
      setEmojiInput('');
    }
  };

  const removeDay = () => {
    if (selectedDay) {
      const newMarked = { ...data.markedDates };
      delete newMarked[selectedDay.dateKey];
      onUpdate({ ...data, markedDates: newMarked });
      setSelectedDay(null);
      setEmojiInput('');
    }
  };

  const cancelSelection = () => {
    if (selectedDay) {
      // If this was a newly created day (no emoji), remove it
      if (!selectedDay.currentEmoji) {
        const newMarked = { ...data.markedDates };
        delete newMarked[selectedDay.dateKey];
        onUpdate({ ...data, markedDates: newMarked });
      }
      setSelectedDay(null);
      setEmojiInput('');
    }
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${currentMonth}-${day}`;
    const dayData = data.markedDates?.[dateKey];
    const isMarked = !!dayData;
    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const isSelected = selectedDay?.day === day;
    
    days.push(
      <button
        key={day}
        onClick={() => toggleDate(day)}
        disabled={selectedDay && !isSelected}
        className={`aspect-square rounded-lg flex items-center justify-center font-medium transition-all border-2 text-sm sm:text-base
          ${isSelected 
            ? 'ring-4 ring-blue-500'
            : ''
          }
          ${isMarked 
            ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-sm' 
            : isToday
            ? theme === 'dark' ? 'bg-gray-700 border-blue-400' : 'bg-blue-50 border-blue-400'
            : theme === 'dark' ? 'hover:bg-gray-700 border-gray-600' : 'hover:bg-gray-100 border-gray-300'
          }
          ${selectedDay && !isSelected ? 'opacity-30 cursor-not-allowed' : ''}
          `}
      >
        {dayData?.emoji ? (
          <span className="text-lg sm:text-xl">{dayData.emoji}</span>
        ) : (
          day
        )}
      </button>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button 
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
          disabled={!!selectedDay}
          className={`p-2 rounded-lg border-2 text-lg font-bold ${
            selectedDay ? 'opacity-30 cursor-not-allowed' : ''
          } ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
        >
          ←
        </button>
        <h3 className="font-bold text-base sm:text-lg text-center px-2">
          {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
          disabled={!!selectedDay}
          className={`p-2 rounded-lg border-2 text-lg font-bold ${
            selectedDay ? 'opacity-30 cursor-not-allowed' : ''
          } ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
        >
          →
        </button>
      </div>

      {selectedDay && (
        <div className={`mb-4 p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-300'}`}>
          <p className="font-bold mb-2">day {selectedDay.day} - add emoji</p>
          <p className="text-sm text-gray-500 mb-3">add one emoji to represent how you felt/did</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={emojiInput}
              onChange={(e) => setEmojiInput(e.target.value)}
              placeholder="select an emoji"
              maxLength={2}
              className={`flex-1 px-4 py-2 rounded-lg border-2 text-center text-2xl ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 placeholder:text-gray-400'
              }`}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveEmoji}
              className="flex-1 py-2 bg-blue-300 text-blue-900 rounded-lg border-2 border-blue-400 font-bold hover:bg-blue-400 transition-all"
            >
              save
            </button>
            <button
              onClick={removeDay}
              className="flex-1 py-2 bg-red-300 text-red-900 rounded-lg border-2 border-red-400 font-bold hover:bg-red-400 transition-all"
            >
              unmark
            </button>
            <button
              onClick={cancelSelection}
              className={`px-4 py-2 rounded-lg border-2 font-bold ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
              }`}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(d => (
          <div key={d} className="text-center font-bold text-xs sm:text-sm text-gray-500">{d}</div>
        ))}
        {days}
      </div>
    </div>
  );
};