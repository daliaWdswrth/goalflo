import React from 'react';
import { useState, useEffect } from 'react';


export const useStorage = (activeCategory) => {
  const [categories, setCategories] = useState(['personal', 'work', 'health']);
  const [widgets, setWidgets] = useState([]);
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      loadCategoryWidgets();
    }
  }, [activeCategory]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const categoriesResult = await window.storage.get('categories');
      if (categoriesResult) {
        setCategories(JSON.parse(categoriesResult.value));
      }

      const themeResult = await window.storage.get('theme');
      if (themeResult) {
        setTheme(themeResult.value);
      }

      const widgetsKey = `widgets_personal`;
      const result = await window.storage.get(widgetsKey);
      if (result) {
        setWidgets(JSON.parse(result.value));
      } else {
        setWidgets([]);
      }
    } catch (error) {
      setWidgets([]);
    }
    setIsLoading(false);
  };

  const loadCategoryWidgets = async () => {
    try {
      const widgetsKey = `widgets_${activeCategory}`;
      const result = await window.storage.get(widgetsKey);
      if (result) {
        setWidgets(JSON.parse(result.value));
      } else {
        setWidgets([]);
      }
    } catch (error) {
      setWidgets([]);
    }
  };

  const saveWidgets = async (newWidgets) => {
    try {
      const widgetsKey = `widgets_${activeCategory}`;
      await window.storage.set(widgetsKey, JSON.stringify(newWidgets));
    } catch (error) {
      console.error('Error saving widgets:', error);
    }
  };

  const saveCategories = async (newCategories) => {
    try {
      await window.storage.set('categories', JSON.stringify(newCategories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const saveTheme = async (newTheme) => {
    try {
      await window.storage.set('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    categories,
    setCategories,
    widgets,
    setWidgets,
    theme,
    setTheme,
    isLoading,
    saveWidgets,
    saveCategories,
    saveTheme
  };
};