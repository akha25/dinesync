const billingService = require('../services/billingService');
const { validatePositivePrice } = require('../utils/validators');

const getActiveOrder = async (req, res, next) => {
  try {
    const details = await billingService.getOrderItems(req.params.table_id);
    res.json(details);
  } catch (err) {
    next(err);
  }
};

const addOrderItem = async (req, res, next) => {
  try {
    const { table_id, item_name, category, price } = req.body;
    validatePositivePrice(price);
    
    const item = await billingService.addOrderItem(table_id, { item_name, category, price: Number(price) });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

module.exports = { getActiveOrder, addOrderItem };
