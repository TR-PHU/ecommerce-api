const router = require('express').Router();
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken');
const productController = require('../controllers/ProductController');

// Get all product
router.get('/allproduct', verifyToken, verifyAdmin, productController.getAllProduct);
//Get product
router.get('/:id', verifyToken, verifyAdmin, productController.getProduct);
//Update
router.put('/:id', verifyToken, verifyAdmin, productController.changeProduct);
//Delete
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);
//Create
router.post('/', verifyToken, verifyAdmin, productController.createProduct);

module.exports = router;
