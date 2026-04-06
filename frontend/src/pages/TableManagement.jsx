import React from 'react';
import FloorGrid from '../components/FloorGrid';
import TableModalWrapper from '../components/TableModalWrapper';

const TableManagement = () => {
  return (
    <div style={{ flex: 1 }}>
      <div className="floor-controls">
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Floor Map</h2>
          <p style={{ color: 'var(--text-muted)' }}>Manage live table statuses and orders.</p>
        </div>
        <div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-available)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Available</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-occupied)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Occupied</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-dirty)' }}></div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Dirty</span>
            </div>
          </div>
        </div>
      </div>

      <FloorGrid />
      <TableModalWrapper />
    </div>
  );
};

export default TableManagement;
