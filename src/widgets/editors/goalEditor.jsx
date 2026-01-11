import React from 'react';
import { useState } from 'react';

export const GoalMonitorEditor = ({ data, onUpdate, theme, inputClass }) => {
  const [newGoal, setNewGoal] = useState({ name: '', target: 100, current: 0, metricType: 'slider' });

  const addGoal = () => {
    if (newGoal.name) {
      onUpdate({ ...data, goals: [...(data.goals || []), { ...newGoal, id: Date.now() }] });
      setNewGoal({ name: '', target: 100, current: 0, metricType: 'slider' });
    }
  };

  const updateGoalProgress = (id, current) => {
    const goals = data.goals.map(g => g.id === id ? { ...g, current: Number(current) } : g);
    onUpdate({ ...data, goals });
  };

  const deleteGoal = (id) => {
    const goals = data.goals.filter(g => g.id !== id);
    onUpdate({ ...data, goals });
  };

  const incrementGoal = (id) => {
    const goals = data.goals.map(g => {
      if (g.id === id) {
        const newCurrent = Math.min(g.current + 1, g.target);
        return { ...g, current: newCurrent };
      }
      return g;
    });
    onUpdate({ ...data, goals });
  };

  const decrementGoal = (id) => {
    const goals = data.goals.map(g => {
      if (g.id === id) {
        const newCurrent = Math.max(g.current - 1, 0);
        return { ...g, current: newCurrent };
      }
      return g;
    });
    onUpdate({ ...data, goals });
  };

  const toggleCheckbox = (id) => {
    const goals = data.goals.map(g => {
      if (g.id === id) {
        const newCurrent = g.current === g.target ? 0 : g.target;
        return { ...g, current: newCurrent };
      }
      return g;
    });
    onUpdate({ ...data, goals });
  };

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <h4 className="font-bold mb-3">add new goal</h4>
        <div className="space-y-3">
          <input
            type="text"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            placeholder="goal name"
            className={`w-full px-4 py-2.5 rounded-lg border-2 ${inputClass}`}
          />
          <div className="flex gap-3">
            <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                placeholder="target"
                className={`flex-1 px-4 py-2.5 rounded-lg border-2 ${inputClass}`}
            />
            <button 
                onClick={addGoal} 
                className="px-6 py-2.5 bg-green-300 text-green-900 rounded-lg border-2 border-green-400 font-bold hover:bg-green-400 transition-all"
            >
                add
            </button>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {(data.goals || []).map(goal => {
          const metricType = goal.metricType || 'slider';
          
          return (
            <div key={goal.id} className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0 mr-2">
                  <h4 className="font-bold break-words">{goal.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{goal.current} / {goal.target}</p>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-500 hover:text-red-600 p-1 font-bold text-lg flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              <div className={`w-full rounded-full h-3 mb-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="bg-green-400 h-full rounded-full transition-all"
                  style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                />
              </div>

              {metricType === 'slider' && (
                <input
                  type="range"
                  min="0"
                  max={goal.target}
                  value={goal.current}
                  onChange={(e) => updateGoalProgress(goal.id, e.target.value)}
                  className="w-full"
                />
              )}

              {metricType === 'counter' && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => decrementGoal(goal.id)}
                    className="w-12 h-12 rounded-lg border-2 border-green-400 bg-green-300 text-green-900 font-bold text-xl hover:bg-green-400 transition-all"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold">{goal.current}</span>
                  <button
                    onClick={() => incrementGoal(goal.id)}
                    className="w-12 h-12 rounded-lg border-2 border-green-400 bg-green-300 text-green-900 font-bold text-xl hover:bg-green-400 transition-all"
                  >
                    +
                  </button>
                </div>
              )}

              {metricType === 'checkbox' && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => toggleCheckbox(goal.id)}
                    className={`w-16 h-16 rounded-lg border-4 transition-all ${
                      goal.current === goal.target
                        ? 'bg-green-400 border-green-500'
                        : theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                    }`}
                  >
                    {goal.current === goal.target && (
                      <span className="text-4xl">✓</span>
                    )}
                  </button>
                </div>
              )}

              {metricType === 'manual' && (
                <input
                  type="number"
                  min="0"
                  max={goal.target}
                  value={goal.current}
                  onChange={(e) => updateGoalProgress(goal.id, e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border-2 text-center ${inputClass}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};