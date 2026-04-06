const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:table_id', orderController.getActiveOrder);
router.post('/', orderController.addOrderItem);

module.exports = router;
