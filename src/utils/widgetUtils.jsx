import { WIDGET_TYPES, WIDGET_CONFIG } from '../config/widgetConfig';

export const formatCalendarData = (data) => {
  let text = '';
  const markedDates = data.markedDates || {};
  const dateKeys = Object.keys(markedDates).sort();
  
  if (dateKeys.length === 0) {
    text += 'No dates marked yet.\n';
  } else {
    text += `Total marked days: ${dateKeys.length}\n\n`;
    dateKeys.forEach(dateKey => {
      const parts = dateKey.split('-');
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
      const emoji = markedDates[dateKey].emoji || '✓';
      text += `  ${date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })} - ${emoji}\n`;
    });
  }
  return text;
};

export const formatGoalsData = (data) => {
  let text = '';
  const goals = data.goals || [];
  
  if (goals.length === 0) {
    text += 'No goals set yet.\n';
  } else {
    text += `Total goals: ${goals.length}\n\n`;
    goals.forEach((goal, index) => {
      const progress = Math.round((goal.current / goal.target) * 100);
      text += `  ${index + 1}. ${goal.name}\n`;
      text += `     Progress: ${goal.current}/${goal.target} (${progress}%)\n`;
      text += `     Status: ${progress >= 100 ? '✓ Complete' : '○ In Progress'}\n\n`;
    });
  }
  return text;
};

export const formatJournalData = (data) => {
  let text = '';
  const entries = data.entries || [];
  
  if (entries.length === 0) {
    text += 'No journal entries yet.\n';
  } else {
    text += `Total entries: ${entries.length}\n\n`;
    entries.forEach((entry, index) => {
      const date = new Date(entry.date);
      text += `  Entry ${index + 1} - ${date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}\n`;
      text += `  ${'-'.repeat(45)}\n`;
      text += `  ${entry.content.replace(/\n/g, '\n  ')}\n\n`;
    });
  }
  return text;
};

export const formatChecklistData = (data) => {
  let text = '';
  const items = data.items || [];
  const completed = items.filter(i => i.completed).length;
  const total = items.length;
  
  if (items.length === 0) {
    text += 'No tasks yet.\n';
  } else {
    text += `Total tasks: ${total} (${completed} completed, ${total - completed} active)\n\n`;
    
    const activeTasks = items.filter(i => !i.completed);
    const completedTasks = items.filter(i => i.completed);
    
    if (activeTasks.length > 0) {
      text += 'Active Tasks:\n';
      activeTasks.forEach(item => {
        text += `  ☐ ${item.text}\n`;
      });
      text += '\n';
    }
    
    if (completedTasks.length > 0) {
      text += 'Completed Tasks:\n';
      completedTasks.forEach(item => {
        text += `  ☑ ${item.text}\n`;
      });
    }
  }
  return text;
};

export const formatBookmarksData = (data) => {
  let text = '';
  const links = data.links || [];
  
  if (links.length === 0) {
    text += 'No bookmarks yet.\n';
  } else {
    text += `Total bookmarks: ${links.length}\n\n`;
    links.forEach((link, index) => {
      text += `  ${index + 1}. ${link.title}\n`;
      text += `     ${link.url}\n\n`;
    });
  }
  return text;
};

export const formatFocusData = (data) => {
  let text = '';
  if (!data.focus) {
    text += 'No focus set yet.\n';
  } else {
    text += 'Current Focus:\n';
    text += `  ${data.focus.replace(/\n/g, '\n  ')}\n`;
  }
  return text;
};

export const generateReadableExport = (allData) => {
  let text = '='.repeat(60) + '\n';
  text += 'goalflo DATA EXPORT\n';
  text += `Date: ${new Date().toLocaleString()}\n`;
  text += '='.repeat(60) + '\n\n';

  const categoriesData = allData['categories'];
  const categories = categoriesData ? JSON.parse(categoriesData) : ['personal', 'work', 'health'];
  
  const theme = allData['theme'] || 'light';
  text += `Theme: ${theme}\n\n`;
  
  categories.forEach(category => {
    const widgetsKey = `widgets_${category}`;
    const widgetsData = allData[widgetsKey];
    
    if (!widgetsData) return;
    
    const widgets = JSON.parse(widgetsData);
    
    text += '='.repeat(60) + '\n';
    text += `CATEGORY: ${category.toUpperCase()}\n`;
    text += '='.repeat(60) + '\n\n';
    
    widgets.forEach(widget => {
      text += '-'.repeat(50) + '\n';
      text += `Widget: ${WIDGET_CONFIG[widget.type]?.label || widget.type}\n`;
      text += '-'.repeat(50) + '\n';
      
      switch(widget.type) {
        case 'calendar':
          text += formatCalendarData(widget.data);
          break;
        case 'goal_monitor':
          text += formatGoalsData(widget.data);
          break;
        case 'journal':
          text += formatJournalData(widget.data);
          break;
        case 'checklist':
          text += formatChecklistData(widget.data);
          break;
        case 'bookmarks':
          text += formatBookmarksData(widget.data);
          break;
        case 'focus':
          text += formatFocusData(widget.data);
          break;
      }
      
      text += '\n';
    });
  });
  
  text += '='.repeat(60) + '\n';
  text += 'END OF EXPORT\n';
  text += '='.repeat(60) + '\n';
  
  return text;
};

export const initializeWidgetData = (type) => {
  switch(type) {
    case WIDGET_TYPES.CALENDAR:
      return { markedDates: {} };
    case WIDGET_TYPES.GOAL_MONITOR:
      return { goals: [] };
    case WIDGET_TYPES.JOURNAL:
      return { entries: [] };
    case WIDGET_TYPES.CHECKLIST:
      return { items: [] };
    case WIDGET_TYPES.BOOKMARKS:
      return { links: [] };
    case WIDGET_TYPES.FOCUS:
      return { focus: '' };
    default:
      return {};
  }
};

export const exportAllData = async () => {
  try {
    const allData = {};
    
    const result = await window.storage.list();
    if (result && result.keys) {
      for (const key of result.keys) {
        const data = await window.storage.get(key);
        if (data) {
          allData[key] = data.value;
        }
      }
    }
    
    // Create JSON download
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `goalflo-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Create human-readable text download
    const readableText = generateReadableExport(allData);
    const textBlob = new Blob([readableText], { type: 'text/plain' });
    const textUrl = URL.createObjectURL(textBlob);
    const textLink = document.createElement('a');
    textLink.href = textUrl;
    textLink.download = `goalflo-backup-readable-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);
    URL.revokeObjectURL(textUrl);
    
    return true;
  } catch (error) {
    console.error('Export error:', error);
    return false;
  }
};

export const importData = async (file) => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Restore all data
    for (const [key, value] of Object.entries(data)) {
      await window.storage.set(key, value);
    }
    
    return true;
  } catch (error) {
    console.error('Import error:', error);
    return false;
  }
};