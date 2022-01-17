const router = require('express').Router();
const { verifyToken, verifyAuthorization, verifyAdmin } = require('../middlewares/verifyToken');
const userController = require('../controllers/UserController');
const { authValidate, schema } = require('../validations/AuthValidate');

// router.put(
//     '/:id',
//     authValidate(schema.changeUser),
//     verifyToken,
//     verifyAuthorization,
//     userController.changeUser
// );

// router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

// router.get('/:id', verifyToken, verifyAdmin, userController.getUser);

router.get('/stats', verifyToken, verifyAdmin, userController.statsUser);

// router.get('/', verifyToken, verifyAdmin, userController.getAllUser);

module.exports = router;
