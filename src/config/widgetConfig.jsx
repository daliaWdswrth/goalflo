
import { Calendar, TrendingUp, BookOpen, CheckSquare, Bookmark, Target, Settings, Plus, Moon, Sun, Sparkles } from 'lucide-react';

export const WIDGET_TYPES = {
  CALENDAR: 'calendar',
  GOAL_MONITOR: 'goal_monitor',
  JOURNAL: 'journal',
  CHECKLIST: 'checklist',
  BOOKMARKS: 'bookmarks',
  FOCUS: 'focus'
};

export const WIDGET_CONFIG = {
  [WIDGET_TYPES.CALENDAR]: { 
    icon: Calendar, 
    label: 'calendar',
    color: 'bg-blue-200',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-800',
    minCols: 2,
    minRows: 2
  },
  [WIDGET_TYPES.GOAL_MONITOR]: { 
    icon: TrendingUp, 
    label: 'goals',
    color: 'bg-green-200',
    borderColor: 'border-green-300',
    textColor: 'text-green-800',
    minCols: 2,
    minRows: 2
  },
  [WIDGET_TYPES.JOURNAL]: { 
    icon: BookOpen, 
    label: 'journal',
    color: 'bg-purple-200',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-800',
    minCols: 2,
    minRows: 2
  },
  [WIDGET_TYPES.CHECKLIST]: { 
    icon: CheckSquare, 
    label: 'tasks',
    color: 'bg-pink-200',
    borderColor: 'border-pink-300',
    textColor: 'text-pink-800',
    minCols: 2,
    minRows: 2
  },
  [WIDGET_TYPES.BOOKMARKS]: { 
    icon: Bookmark, 
    label: 'resources',
    color: 'bg-yellow-200',
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-800',
    minCols: 2,
    minRows: 2
  },
  [WIDGET_TYPES.FOCUS]: { 
    icon: Target, 
    label: 'focus',
    color: 'bg-cyan-200',
    borderColor: 'border-cyan-300',
    textColor: 'text-cyan-800',
    minCols: 2,
    minRows: 1
  }
};
