import React from 'react';
import TableCard from './TableCard';
import { useAppContext } from '../context/AppContext';

const FloorGrid = () => {
  const { tables } = useAppContext();

  const floors = tables.reduce((acc, table) => {
    if (!acc[table.floor]) acc[table.floor] = [];
    acc[table.floor].push(table);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(floors).map((floor) => (
        <div key={floor} className="floor-section">
          <h2 className="floor-title">{floor}</h2>
          <div className="table-grid">
            {floors[floor].map((table) => (
              <TableCard key={table._id} table={table} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloorGrid;
