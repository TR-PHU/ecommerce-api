const router = require('express').Router();

const authControler = require('../controllers/AuthController');
const { authValidate, schema } = require('../validations/AuthValidate');
const { verifyToken } = require('../middlewares/verifyToken');

//Register
router.post('/register', authValidate(schema.register), authControler.register);

//login
router.post('/login', authValidate(schema.login), authControler.login);

router.post('/forget-password', authControler.forgetPassword);

router.post('/reset-password', verifyToken, authControler.resetPassword);

module.exports = router;
