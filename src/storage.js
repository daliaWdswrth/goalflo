import React from 'react';

const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { key, value, shared: false } : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },

  async set(key, value, shared = false) {
    try {
      localStorage.setItem(key, value);
      return { key, value, shared };
    } catch (error) {
      console.error('Storage set error:', error);
      return null;
    }
  },

  async delete(key, shared = false) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true, shared };
    } catch (error) {
      console.error('Storage delete error:', error);
      return null;
    }
  },

  async list(prefix = '', shared = false) {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        prefix ? key.startsWith(prefix) : true
      );
      return { keys, prefix: prefix || undefined, shared };
    } catch (error) {
      console.error('Storage list error:', error);
      return null;
    }
  }
};

// Make it available globally
if (typeof window !== 'undefined') {
  window.storage = storage;
}

export default storage;