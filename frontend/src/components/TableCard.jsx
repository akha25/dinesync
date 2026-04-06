import React from 'react';
import { useAppContext } from '../context/AppContext';

const TableCard = ({ table }) => {
  const { setSelectedTable } = useAppContext();

  return (
    <div
      className={`table-card status-${table.status}`}
      onClick={() => setSelectedTable(table)}
    >
      <div className="table-number">T{table.table_number}</div>
      <div className="table-capacity">{table.capacity} Persons</div>
      <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{table.status}</div>
    </div>
  );
};

export default TableCard;
