import React from 'react';
import { WIDGET_TYPES } from '../config/widgetConfig';
import { CalendarPreview } from './previews/calendarPreview';
import { GoalMonitorPreview } from './previews/goalPreview';
import { JournalPreview } from './previews/journalPreview';
import { FocusPreview } from './previews/focusPreview';
import { ChecklistPreview } from './previews/checklistPreview';
import { BookmarksPreview } from './previews/bookmarksPreview';

export const WidgetPreview = ({ widget, theme }) => {
  switch(widget.type) {
    case WIDGET_TYPES.CALENDAR:
      return <CalendarPreview data={widget.data} theme={theme} />;
    case WIDGET_TYPES.GOAL_MONITOR:
      return <GoalMonitorPreview data={widget.data} theme={theme} />;
    case WIDGET_TYPES.JOURNAL:
      return <JournalPreview data={widget.data} theme={theme} />;
    case WIDGET_TYPES.CHECKLIST:
      return <ChecklistPreview data={widget.data} theme={theme} />;
    case WIDGET_TYPES.BOOKMARKS:
      return <BookmarksPreview data={widget.data} theme={theme} />;
    case WIDGET_TYPES.FOCUS:
      return <FocusPreview data={widget.data} theme={theme} />;
    default:
      return null;
  }
};