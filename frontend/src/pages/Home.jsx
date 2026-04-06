import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import FloorGrid from '../components/FloorGrid';
import TableModalWrapper from '../components/TableModalWrapper';
import { useAppContext } from '../context/AppContext';
import { createTable } from '../api/tableApi';

const FLOOR_OPTIONS = ['Ground Floor', 'First Floor', 'Terrace', 'Private Dining', 'Bar Area'];

const Home = () => {
  const { tables, refreshData } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ table_number: '', capacity: 4, floor: 'Ground Floor' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTable = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.table_number || form.capacity < 1) {
      setError('Please provide a valid table number and capacity.');
      return;
    }
    setLoading(true);
    try {
      await createTable(form);
      await refreshData();
      setForm({ table_number: '', capacity: 4, floor: 'Ground Floor' });
      setShowAddForm(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add table. Table number may already exist.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Dashboard />

      <main className="main-content">
        {/* Header */}
        <div className="floor-controls">
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Live Floor Map</h2>
            <p style={{ color: 'var(--text-muted)' }}>Click a table to manage orders, transfers, and checkouts.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-available)' }}></div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Available</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-occupied)' }}></div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Occupied</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-dirty)' }}></div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Dirty</span>
              </div>
            </div>
            <button className="btn" onClick={() => setShowAddForm(v => !v)}>
              {showAddForm ? '✕ Cancel' : '＋ Add Table'}
            </button>
          </div>
        </div>

        {/* Add Table Form */}
        {showAddForm && (
          <div style={{
            background: 'var(--bg-panel)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'flex-end'
          }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Table Number</label>
              <input
                type="number"
                min="1"
                placeholder="e.g. 1"
                value={form.table_number}
                onChange={e => setForm(f => ({ ...f, table_number: Number(e.target.value) }))}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Capacity</label>
              <select value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))}>
                {[2, 4, 6, 8, 10, 12].map(n => (
                  <option key={n} value={n}>{n} Seater</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Floor / Zone</label>
              <select value={form.floor} onChange={e => setForm(f => ({ ...f, floor: e.target.value }))}>
                {FLOOR_OPTIONS.map(fl => (<option key={fl} value={fl}>{fl}</option>))}
              </select>
            </div>
            <button className="btn" onClick={handleAddTable} disabled={loading} style={{ marginBottom: '1rem' }}>
              {loading ? 'Adding...' : 'Create Table'}
            </button>
            {error && <p style={{ color: '#ef4444', width: '100%' }}>{error}</p>}
          </div>
        )}

        {/* Floor Grid or Empty State */}
        {tables.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No Tables Yet</h3>
            <p>Click "＋ Add Table" above to set up your restaurant floor map.</p>
          </div>
        ) : (
          <FloorGrid />
        )}

        <TableModalWrapper />
      </main>
    </div>
  );
};

export default Home;
