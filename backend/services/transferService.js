const Order = require('../models/Order');
const Table = require('../models/Table');

const transferTable = async (sourceTableId, targetTableId) => {
  const sourceTable = await Table.findById(sourceTableId);
  const targetTable = await Table.findById(targetTableId);

  if (!targetTable || targetTable.status !== 'Available') {
    throw new Error('Target Table is Occupied or Unavailable.');
  }

  // Find active order on source
  const order = await Order.findOne({ table_id: sourceTableId, status: 'Active' });
  if (order) {
    order.table_id = targetTableId;
    await order.save();
  }

  targetTable.status = 'Occupied';
  await targetTable.save();

  sourceTable.status = 'Dirty';
  await sourceTable.save();
};

module.exports = { transferTable };
