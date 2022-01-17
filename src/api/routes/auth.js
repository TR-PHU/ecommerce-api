const router = require('express').Router();

const authControler = require('../controllers/AuthController');
const { authValidate, schema } = require('../validations/AuthValidate');

//Register
router.post('/register', authValidate(schema.register), authControler.register);

//login
router.post('/login', authValidate(schema.login), authControler.login);

router.get('/test', (req, res, next) => {
    res.send('Hello world!');
});

module.exports = router;
