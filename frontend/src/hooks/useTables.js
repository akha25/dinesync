import { useAppContext } from '../context/AppContext';
import { updateTableStatus, transferTable, checkoutTable } from '../api/tableApi';
import { getActiveOrderItems, addOrderItem } from '../api/orderApi';
import { useState } from 'react';

export const useTables = (tableId) => {
  const { refreshData, setSelectedTable } = useAppContext();
  const [orders, setOrders] = useState({ items: [], summary: {} });

  const fetchBill = async () => {
    if (!tableId) return;
    try {
      const { data } = await getActiveOrderItems(tableId);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const assignTable = async () => {
    await updateTableStatus(tableId, 'Occupied');
    refreshData();
  };

  const cleanTable = async () => {
    await updateTableStatus(tableId, 'Available');
    refreshData();
  };

  const addFoodItem = async (payload) => {
    await addOrderItem({ table_id: tableId, ...payload });
    refreshData();
    await fetchBill();
  };

  const handleCheckout = async () => {
    await checkoutTable(tableId);
    refreshData();
    setSelectedTable(null);
  };

  const handleTransfer = async (targetId) => {
    await transferTable(tableId, targetId);
    refreshData();
    setSelectedTable(null);
  };

  return { orders, fetchBill, assignTable, cleanTable, addFoodItem, handleCheckout, handleTransfer };
};
