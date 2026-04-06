import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const TransferModal = ({ currentTableId, onTransfer }) => {
  const { tables } = useAppContext();
  const [targetId, setTargetId] = useState('');

  const handleTransfer = () => {
    if (!targetId) return alert("Select a target table");
    onTransfer(targetId);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Transfer Table</h3>
      <div className="form-group" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <select value={targetId} onChange={e => setTargetId(e.target.value)} style={{ flex: 1 }}>
          <option value="">Select Available Table</option>
          {tables.filter(t => t.status === 'Available' && t._id !== currentTableId).map(t => (
            <option key={t._id} value={t._id}>T{t.table_number} ({t.floor})</option>
          ))}
        </select>
        <button className="btn" onClick={handleTransfer}>Transfer</button>
      </div>
    </div>
  );
};

export default TransferModal;
