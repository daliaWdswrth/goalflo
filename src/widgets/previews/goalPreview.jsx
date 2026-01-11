import React from 'react';

export const GoalMonitorPreview = ({ data, theme }) => {
  const allGoals = data.goals || [];
  const activeGoals = allGoals.filter(g => g.current < g.target).slice(0, 3);
  const completedGoals = allGoals.filter(g => g.current >= g.target).slice(0, 2);
  
  if (allGoals.length === 0) {
    return <div className="text-gray-400 text-sm italic">no goals yet</div>;
  }

  return (
    <div className="space-y-3">
      {activeGoals.map(goal => (
        <div key={goal.id} className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium truncate flex-1 mr-2 break-words">{goal.name}</span>
            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{goal.current}/{goal.target}</span>
          </div>
          <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="bg-green-400 h-full rounded-full transition-all"
              style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
      
      {completedGoals.map(goal => (
        <div key={goal.id} className="space-y-1 opacity-60">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium truncate flex-1 mr-2 break-words line-through">{goal.name}</span>
            <span className="text-xs text-green-600 whitespace-nowrap flex-shrink-0">✓ {goal.current}/{goal.target}</span>
          </div>
          <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="bg-green-400 h-full rounded-full transition-all"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ))}
      
      {allGoals.length > 5 && (
        <p className="text-xs text-gray-500 italic">+{allGoals.length - 5} more goals</p>
      )}
    </div>
  );
};