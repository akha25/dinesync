const Table = require('../models/Table');
const Order = require('../models/Order');

const getAnalytics = async (req, res, next) => {
  try {
    const allTables = await Table.find();
    let occupiedTables = 0;
    let dirtyTables = 0;
    let floorCounts = {};
    
    allTables.forEach(t => {
      if (t.status === 'Occupied') occupiedTables++;
      if (t.status === 'Dirty') dirtyTables++;
      
      if (!floorCounts[t.floor]) floorCounts[t.floor] = 0;
      if (t.status === 'Occupied') floorCounts[t.floor]++;
    });

    const occupancy_percentage = allTables.length ? (occupiedTables / allTables.length) * 100 : 0;

    const activeOrders = await Order.find({ status: 'Active' });
    const live_revenue = activeOrders.reduce((sum, o) => sum + o.grand_total, 0);

    let top_floor = 'N/A';
    let maxAc = -1;
    for (let f in floorCounts) {
      if (floorCounts[f] > maxAc) {
        maxAc = floorCounts[f];
        top_floor = f;
      }
    }

    res.json({ occupancy_percentage, live_revenue, pending_cleanups: dirtyTables, top_floor });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAnalytics };
