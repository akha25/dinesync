const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/', tableController.getTables);
router.post('/', tableController.createTable);
router.put('/:id', tableController.updateTableState);
router.delete('/:id', tableController.deleteTable);
router.post('/transfer', tableController.transferTable);
router.post('/:id/checkout', tableController.checkoutTable);

module.exports = router;
