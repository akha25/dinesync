import React, { useEffect } from 'react';
import { useTables } from '../hooks/useTables';
import { useAppContext } from '../context/AppContext';
import OrderForm from './OrderForm';
import TransferModal from './TransferModal';
import BillSummary from './BillSummary';

const TableModalWrapper = () => {
  const { selectedTable, setSelectedTable } = useAppContext();
  const { orders, fetchBill, assignTable, cleanTable, addFoodItem, handleCheckout, handleTransfer } = useTables(selectedTable?._id);

  useEffect(() => {
    if (selectedTable?.status === 'Occupied') {
      fetchBill();
    }
  }, [selectedTable]);

  if (!selectedTable) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedTable(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Table {selectedTable.table_number} ({selectedTable.capacity} Persons) - {selectedTable.floor}</h2>
          <button className="close-btn" onClick={() => setSelectedTable(null)}>&times;</button>
        </div>

        {selectedTable.status === 'Available' && (
          <div>
            <p>This table is currently available.</p>
            <div className="actions">
              <button className="btn" onClick={assignTable}>Assign Guests</button>
            </div>
          </div>
        )}

        {selectedTable.status === 'Dirty' && (
          <div>
            <p>This table is dirty and pending cleanup.</p>
            <div className="actions">
              <button className="btn" onClick={cleanTable}>Mark as Clean & Available</button>
            </div>
          </div>
        )}

        {selectedTable.status === 'Occupied' && (
          <div className="modal-body">
            <div>
              <OrderForm onAddFood={addFoodItem} />
              <TransferModal currentTableId={selectedTable._id} onTransfer={handleTransfer} />
            </div>
            <BillSummary orders={orders} onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableModalWrapper;
