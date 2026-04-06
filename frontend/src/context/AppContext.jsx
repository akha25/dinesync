import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTables } from '../api/tableApi';
import { getAnalytics } from '../api/analyticsApi';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tables, setTables] = useState([]);
  const [analytics, setAnalytics] = useState({
    occupancy_percentage: 0,
    live_revenue: 0,
    pending_cleanups: 0,
    top_floor: 'N/A'
  });
  const [selectedTable, setSelectedTable] = useState(null);

  // Theme: default to system preference, persist in localStorage
  const getInitialTheme = () => {
    const saved = localStorage.getItem('dinesync-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dinesync-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const fetchData = useCallback(async () => {
    try {
      const [tablesRes, analyticsRes] = await Promise.all([
        getTables(),
        getAnalytics()
      ]);
      setTables(tablesRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.error('Data sync failed:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <AppContext.Provider value={{ tables, analytics, selectedTable, setSelectedTable, refreshData: fetchData, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
