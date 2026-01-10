

export const GoalMonitorPreview = ({ data, theme }) => {
  const goals = (data.goals || []).slice(0, 4); // Limit to 4 goals
  if (goals.length === 0) {
    return <div className="text-gray-400 text-sm italic">no goals yet</div>;
  }

  return (
    <div className="space-y-3">
      {goals.map(goal => (
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
      {(data.goals || []).length > 4 && (
        <p className="text-xs text-gray-500 italic">+{(data.goals || []).length - 4} more goals</p>
      )}
    </div>
  );
};