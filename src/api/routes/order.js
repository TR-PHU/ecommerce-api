const router = require('express').Router();

const { verifyAdmin, verifyToken, verifyAuthorization } = require('../middlewares/verifyToken');
const orderController = require('../controllers/OrderController');

// Get all order
router.get('/allorder', verifyToken, verifyAdmin, orderController.getAllOrder);
// GET MONTHLY INCOME
router.get('/income', verifyToken, verifyAdmin, orderController.getStats);
//Get order
router.get('/:id', verifyToken, verifyAuthorization, orderController.getOrder);
//Update order
router.put('/:id', verifyToken, verifyAdmin, orderController.updateOrder);
//Delete order
router.delete('/:id', verifyToken, verifyAdmin, orderController.deleteOrder);
//Create order
router.post('/', verifyToken, orderController.createOrder);

module.exports = router;
