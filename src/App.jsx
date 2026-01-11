import React, { useState, useEffect } from 'react';
import { Settings, Plus, Sparkles, Star } from 'lucide-react';

// Import config
import { WIDGET_TYPES, WIDGET_CONFIG } from './config/widgetConfig';

// Import hooks
import { useStorage } from './hooks/useStorage';

// Import utils
import { initializeWidgetData, exportAllData, importData } from './utils/widgetUtils';

// Import components
import { WidgetCard } from './components/widgetCard';
import { ExpandedWidgetView } from './components/expandedWidgetView';
import { Sidebar } from './components/sidebar';
import { AddWidgetModal } from './components/addWidgetModal';
import { SettingsModal } from './components/settingsModal';

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================


// const HabitTrackerApp = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <h1 className="text-4xl font-bold">goalflo Test</h1>
//     </div>
//   );
// };

// export default HabitTrackerApp;

const HabitTrackerApp = () => {
  // State
  console.log('=== APP RENDERING ===');
  console.log('Window width:', window.innerWidth);
  console.log('Is mobile:', window.innerWidth < 768);
  console.log('Storage available:', typeof window.storage);
  const [activeCategory, setActiveCategory] = useState('personal');
  const [expandedWidget, setExpandedWidget] = useState(null);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
  const [showDevNotes, setShowDevNotes] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Custom hook for storage
  const {
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
  } = useStorage(activeCategory);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Widget management functions
  const addWidget = (type) => {
    if (widgets.length >= 7) return;
    
    if (widgets.some(w => w.type === type)) {
      alert('you already have this widget in this category!');
      return;
    }
    
    const newWidget = {
      id: Date.now().toString(),
      type,
      cols: WIDGET_CONFIG[type].minCols,
      rows: WIDGET_CONFIG[type].minRows,
      data: initializeWidgetData(type)
    };
    
    const newWidgets = [...widgets, newWidget];
    setWidgets(newWidgets);
    saveWidgets(newWidgets);
    setShowAddWidget(false);
  };

  const updateWidget = (id, newData) => {
    const newWidgets = widgets.map(w => 
      w.id === id ? { ...w, data: newData } : w
    );
    setWidgets(newWidgets);
    saveWidgets(newWidgets);
  };

  const deleteWidget = (id) => {
    const newWidgets = widgets.filter(w => w.id !== id);
    setWidgets(newWidgets);
    saveWidgets(newWidgets);
    setExpandedWidget(null);
  };

  // Category management functions
  const addCategory = async () => {
    setShowAddCategoryModal(true);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName || !newCategoryName.trim()) {
      return;
    }
    
    const lowerName = newCategoryName.toLowerCase().trim();
    if (categories.includes(lowerName)) {
      alert('category already exists!');
      return;
    }
    
    const newCategories = [...categories, lowerName];
    setCategories(newCategories);
    await saveCategories(newCategories);
    setNewCategoryName('');
    setShowAddCategoryModal(false);
    alert(`category '${lowerName}' added!`);
  };

  const deleteCategory = async () => {
    if (categories.length <= 1) {
      alert('you must have at least one category!');
      return;
    }
    setShowDeleteCategoryModal(true);
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    const confirmed = confirm(`are you sure you want to delete the category "${categoryToDelete}"? this will delete all widgets in this category.`);
    
    if (!confirmed) {
      return;
    }
    
    const newCategories = categories.filter(c => c !== categoryToDelete);
    setCategories(newCategories);
    await saveCategories(newCategories);
    
    try {
      await window.storage.delete(`widgets_${categoryToDelete}`);
    } catch (error) {
      console.error('Error deleting category data:', error);
    }
    
    if (activeCategory === categoryToDelete) {
      setActiveCategory(newCategories[0]);
    }
    
    setShowDeleteCategoryModal(false);
    alert(`category '${categoryToDelete}' deleted!`);
  };

  // Theme management
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  // Data import/export
  const handleExport = async () => {
    const success = await exportAllData();
    if (success) {
      alert('data exported successfully! ✅\n\ntwo files downloaded:\n- .json file (for importing back)\n- .txt file (readable version)');
    } else {
      alert('export failed 😞');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const success = await importData(file);
      if (success) {
        alert('data imported successfully! reloading...');
        window.location.reload();
      } else {
        alert('import failed 😞');
      }
    }
  };

  // Styling classes
  const bgClass = theme === 'dark' 
    ? 'bg-gray-950' 
    : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const cardClass = theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-amber-50 border-amber-200';

  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={textClass}>loading your workspace...</p>
        </div>
      </div>
    );
  }
  console.log('Active category:', activeCategory);
  console.log('Loading state:', isLoading);
  console.log('Widgets count:', widgets.length);

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-500`}>
      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            addCategory={addCategory}
            deleteCategory={deleteCategory}
            setShowSettings={setShowSettings}
            theme={theme}
            cardClass={cardClass}
          />

          {/* Main Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {expandedWidget ? (
              <div className="relative h-full">
                {/* Blurred background showing other widgets */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="h-full flex flex-col blur-sm pointer-events-none opacity-50">
                    <div className="flex justify-between items-center p-8 pb-4">
                      <h2 className="text-4xl font-black">{activeCategory}</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto px-8 pb-8">
                      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {widgets.map(widget => (
                          <div key={widget.id} className="break-inside-avoid mb-4">
                            <WidgetCard
                              widget={widget}
                              onClick={() => {}}
                              theme={theme}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Centered modal overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/20">
                  <div className="w-full max-w-4xl max-h-[85vh] overflow-hidden">
                    <ExpandedWidgetView
                      widget={widgets.find(w => w.id === expandedWidget)}
                      onClose={() => setExpandedWidget(null)}
                      onUpdate={updateWidget}
                      onDelete={deleteWidget}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {widgets.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="mb-6">
                        <div className={`w-24 h-24 mx-auto rounded-lg border-2 flex items-center justify-center
                          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]
                          ${theme === 'dark' ? 'bg-purple-600 border-purple-400' : 'bg-yellow-200 border-yellow-300'}`}>
                          <Star size={48} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                        </div>
                      </div>
                      <h2 className="text-4xl font-black mb-3">
                        
                        welcome!
                      </h2>
                      <p className={`mb-8 leading-relaxed font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                        create your first widget to start tracking your goals + habits
                      </p>
                      <button
                        onClick={() => setShowAddWidget(true)}
                        className={`px-8 py-4 rounded-lg border-2 font-bold text-lg transition-all
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]
                          hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
                          ${theme === 'dark' 
                            ? 'bg-blue-600 border-blue-400 text-white' 
                            : 'bg-blue-200 border-blue-300 text-blue-900'
                          }`}
                      >
                        + add widget
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full overflow-hidden">
                    <div className="flex justify-between items-center p-8 pb-4 flex-shrink-0">
                      <h2 className="text-4xl font-black">{activeCategory}</h2>
                      {widgets.length < 6 && (
                        <button
                          onClick={() => setShowAddWidget(true)}
                          className={`px-6 py-3 rounded-lg border-2 font-bold transition-all
                            shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]
                            hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px]
                            ${theme === 'dark' 
                              ? 'bg-blue-600 border-blue-400 text-white' 
                              : 'bg-lime-100 border-lime-300 text-lime-900'
                            }`}
                        >
                          + add widget
                        </button>
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-y-auto px-8 pb-8">
                      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {widgets.map(widget => (
                          <div key={widget.id} className="break-inside-avoid mb-4">
                            <WidgetCard
                              widget={widget}
                              onClick={() => setExpandedWidget(widget.id)}
                              theme={theme}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div className="min-h-screen pb-20">
          <div className={`${cardClass} border-b-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} p-4 sticky top-0 z-10`}>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-black">
                goalflo
              </h1>
              <button
                onClick={() => setShowSettings(true)}
                className={`p-2 rounded-lg border-2 ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
              >
                <Settings size={20} />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-bold transition-all border-2 ${
                    activeCategory === cat
                      ? theme === 'dark' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-yellow-200 border-yellow-300 text-gray-900'
                      : theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button 
                onClick={addCategory} 
                className="w-9 h-9 flex items-center justify-center text-blue-500 border-2 border-blue-500 rounded-lg flex-shrink-0 font-black hover:bg-blue-100 dark:hover:bg-blue-900"
                title="add category"
              >
                +
              </button>
              <button 
                onClick={deleteCategory} 
                className="w-9 h-9 flex items-center justify-center text-red-500 border-2 border-red-500 rounded-lg flex-shrink-0 font-black hover:bg-red-100 dark:hover:bg-red-900"
                title="delete category"
              >
                −
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {widgets.length === 0 ? (
              <div className="text-center py-20 px-4">
                <div className={`w-16 h-16 mx-auto rounded-lg border-2 flex items-center justify-center mb-4 ${
                  theme === 'dark' ? 'bg-purple-600 border-purple-400' : 'bg-yellow-200 border-yellow-300'
                }`}>
                  <Sparkles size={32} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                </div>
                <h2 className="text-2xl font-black mb-2">get started</h2>
                <p className="text-gray-500 mb-6">add your first widget to start tracking</p>
                <button
                  onClick={() => setShowAddWidget(true)}
                  className={`px-8 py-4 rounded-lg border-2 font-bold ${
                    theme === 'dark' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-blue-200 border-blue-300 text-blue-900'
                  }`}
                >
                  + add widget
                </button>
              </div>
            ) : (
              <>
                {widgets.map(widget => (
                  <div
                    key={widget.id}
                    onClick={() => setExpandedWidget(widget.id)}
                    className={`${cardClass} border-2 p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all`}
                  >
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        {/* {React.createElement(WIDGET_CONFIG[widget.type].icon, { 
                          size: 20,
                          className: WIDGET_CONFIG[widget.type].textColor
                        })} */}
                        <h3 className="font-bold">{WIDGET_CONFIG[widget.type].label}</h3>
                      </div>
                      <div className={`h-1 rounded-full ${WIDGET_CONFIG[widget.type].color}`} />
                    </div>
                    <WidgetCard
                      widget={widget}
                      onClick={() => setExpandedWidget(widget.id)}
                      theme={theme}
                    />
                  </div>
                ))}
                {widgets.length < 6 && (
                  <button
                    onClick={() => setShowAddWidget(true)}
                    className={`w-full py-6 border-2 border-dashed rounded-2xl transition-all ${
                      theme === 'dark' 
                        ? 'border-gray-700 hover:border-purple-500 text-gray-500 hover:text-purple-500' 
                        : 'border-gray-300 hover:border-purple-400 text-gray-400 hover:text-purple-600'
                    }`}
                  >
                    <Plus size={32} className="mx-auto" />
                  </button>
                )}
              </>
            )}
          </div>

          {expandedWidget && (
            <div className="fixed inset-0 bg-black/60 z-20 overflow-y-auto">
              <div className={`min-h-screen ${bgClass} pt-4 pb-4 px-4`}>
                <ExpandedWidgetView
                  widget={widgets.find(w => w.id === expandedWidget)}
                  onClose={() => setExpandedWidget(null)}
                  onUpdate={updateWidget}
                  onDelete={deleteWidget}
                  theme={theme}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <AddWidgetModal
        showAddWidget={showAddWidget}
        setShowAddWidget={setShowAddWidget}
        widgets={widgets}
        addWidget={addWidget}
        theme={theme}
        cardClass={cardClass}
      />

      <SettingsModal
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showDevNotes={showDevNotes}
        setShowDevNotes={setShowDevNotes}
        toggleTheme={toggleTheme}
        handleExport={handleExport}
        handleImport={handleImport}
        theme={theme}
        cardClass={cardClass}
      />

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 p-4">
          <div className={`${cardClass} rounded-lg border-2 p-6 max-w-sm w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
            <h3 className="text-xl font-black mb-4">add new category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder="category name"
              className={`w-full px-4 py-2.5 rounded-lg border-2 mb-4 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
              }`}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCategory}
                className="flex-1 py-2 bg-blue-300 text-blue-900 rounded-lg border-2 border-blue-400 font-bold hover:bg-blue-400 transition-all"
              >
                add
              </button>
              <button
                onClick={() => {
                  setShowAddCategoryModal(false);
                  setNewCategoryName('');
                }}
                className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                }`}
              >
                exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Modal */}
      {showDeleteCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 p-4">
          <div className={`${cardClass} rounded-lg border-2 p-6 max-w-sm w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]`}>
            <h3 className="text-xl font-black mb-4">delete category</h3>
            <p className="text-sm mb-4">select a category to delete:</p>
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleDeleteCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 hover:bg-red-900 hover:border-red-700' 
                      : 'bg-white border-gray-300 hover:bg-red-100 hover:border-red-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowDeleteCategoryModal(false)}
              className={`w-full py-2 rounded-lg border-2 font-bold transition-all ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
              }`}
            >
              exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitTrackerApp;

