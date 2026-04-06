import React from 'react';
import { Users, IndianRupee, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { analytics, theme, toggleTheme } = useAppContext();

  return (
    <aside className="sidebar">
      <h1>DINESYNC</h1>
      
      <div className="analytics-card">
        <div className="analytics-title">
          <Users size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Occupancy
        </div>
        <div className="analytics-value">
          {analytics.occupancy_percentage ? analytics.occupancy_percentage.toFixed(0) : 0}%
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-title">
          <IndianRupee size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Live Revenue
        </div>
        <div className="analytics-value">
          ₹{analytics.live_revenue ? analytics.live_revenue.toFixed(2) : '0.00'}
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-title">
          <Trash2 size={16} style={{ display: 'inline', marginRight: '8px' }} />
          Pending Cleanups
        </div>
        <div className="analytics-value" style={{ color: analytics.pending_cleanups > 0 ? '#eab308' : 'inherit' }}>
          {analytics.pending_cleanups || 0} Tables
        </div>
      </div>

      <div className="analytics-card">
        <div className="analytics-title">Top Floor</div>
        <div className="analytics-value" style={{ fontSize: '1.2rem' }}>
          {analytics.top_floor || 'N/A'}
        </div>
      </div>

      <button
        id="theme-toggle-btn"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <span className="theme-toggle-icon">
          {theme === 'dark' ? '☀️' : '🌙'}
        </span>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  );
};

export default Dashboard;

