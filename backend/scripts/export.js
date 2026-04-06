const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });
const Table = require('../models/Table');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dinesync';

async function exportData() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to DB for export...');

    const tables = await Table.find();
    const orders = await Order.find();
    const items = await OrderItem.find();

    const data = { tables, orders, items };

    const dumpPath = path.join(__dirname, '../../database/mongo_dump.json');
    fs.writeFileSync(dumpPath, JSON.stringify(data, null, 2));
    
    console.log(`Successfully exported database to database/mongo_dump.json!`);
    process.exit(0);
  } catch (err) {
    console.error('Error exporting data', err);
    process.exit(1);
  }
}

exportData();
