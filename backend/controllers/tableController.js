const Table = require('../models/Table');
const tableService = require('../services/tableService');
const transferService = require('../services/transferService');
const billingService = require('../services/billingService');

const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ floor: 1, table_number: 1 });
    res.json(tables);
  } catch (err) {
    next(err);
  }
};

const createTable = async (req, res, next) => {
  try {
    const { table_number, capacity, floor } = req.body;
    const newTable = new Table({ table_number, capacity, floor, status: 'Available' });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    next(err);
  }
};

const updateTableState = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (status === 'Occupied') {
      await tableService.assignTable(req.params.id);
    } else if (status === 'Available') {
      await tableService.cleanTable(req.params.id);
    } else {
      await Table.findByIdAndUpdate(req.params.id, req.body);
    }
    res.json({ message: 'Table updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteTable = async (req, res, next) => {
  try {
    await tableService.deleteTable(req.params.id);
    res.json({ message: 'Table deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

const transferTable = async (req, res, next) => {
  try {
    const { source_table_id, target_table_id } = req.body;
    await transferService.transferTable(source_table_id, target_table_id);
    res.json({ message: 'Table transferred successfully.' });
  } catch (err) {
    next(err);
  }
};

const checkoutTable = async (req, res, next) => {
  try {
    await billingService.checkoutTable(req.params.id);
    res.json({ message: 'Checkout successful.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTables, createTable, updateTableState, deleteTable, transferTable, checkoutTable };
