const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Table = require('../models/Table');
const { TAX_RATES, SERVICE_CHARGE_RATE } = require('../constants/taxRates');

const getActiveOrderForTable = async (tableId) => {
  let order = await Order.findOne({ table_id: tableId, status: 'Active' });
  if (!order) {
    order = new Order({ table_id: tableId });
    await order.save();
  }
  return order;
};

const addOrderItem = async (tableId, itemData) => {
  const order = await getActiveOrderForTable(tableId);
  
  const taxRate = TAX_RATES[itemData.category] || 0;
  const taxAmount = itemData.price * taxRate;
  const totalAmount = itemData.price + taxAmount;

  const item = new OrderItem({
    order_id: order._id,
    item_name: itemData.item_name,
    category: itemData.category,
    price: itemData.price,
    tax: taxAmount,
    total: totalAmount
  });
  await item.save();

  // Recalculate Order totals
  order.subtotal += itemData.price;
  order.total_tax += taxAmount;
  order.service_charge = order.subtotal * SERVICE_CHARGE_RATE;
  order.grand_total = order.subtotal + order.total_tax + order.service_charge;
  await order.save();

  // Ensure table is Occupied
  await Table.findByIdAndUpdate(tableId, { status: 'Occupied' });

  return item;
};

const checkoutTable = async (tableId) => {
  const order = await Order.findOne({ table_id: tableId, status: 'Active' });
  if (order) {
    order.status = 'Settled';
    await order.save();
  }
  await Table.findByIdAndUpdate(tableId, { status: 'Dirty' });
};

const getOrderItems = async (tableId) => {
  const order = await Order.findOne({ table_id: tableId, status: 'Active' });
  if (!order) return { items: [], summary: {} };
  
  const items = await OrderItem.find({ order_id: order._id });
  return { items, summary: order };
};

module.exports = { addOrderItem, checkoutTable, getOrderItems };
