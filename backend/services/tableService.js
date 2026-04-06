const Table = require('../models/Table');

const assignTable = async (tableId) => {
  const table = await Table.findById(tableId);
  if (!table) throw new Error('Table not found');
  if (table.status !== 'Available') throw new Error('Table is not available');
  
  table.status = 'Occupied';
  return await table.save();
};

const cleanTable = async (tableId) => {
  const table = await Table.findById(tableId);
  if (!table) throw new Error('Table not found');
  if (table.status !== 'Dirty') throw new Error('Table is not dirty');
  
  table.status = 'Available';
  return await table.save();
};

const deleteTable = async (tableId) => {
  const table = await Table.findById(tableId);
  if (!table) throw new Error('Table not found');
  if (table.status === 'Occupied') throw new Error('Cannot delete occupied table');
  
  await Table.findByIdAndDelete(tableId);
};

module.exports = { assignTable, cleanTable, deleteTable };
