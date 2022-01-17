const router = require('express').Router();
const { verifyToken, verifyAdmin, verifyAuthorization } = require('../middlewares/verifyToken');
const cartController = require('../controllers/CartController');

// Get all cart
router.get('/allproduct', verifyToken, verifyAdmin, cartController.getAllCart);
//Get cart
router.get('/:id', verifyToken, verifyAuthorization, cartController.getCart);
//Update cart
router.put('/:id', verifyToken, verifyAuthorization, cartController.updateCart);
//Delete cart
router.delete('/:id', verifyToken, verifyAuthorization, cartController.deleteCart);
//Create cart
router.post('/', verifyToken, cartController.createCart);

module.exports = router;
