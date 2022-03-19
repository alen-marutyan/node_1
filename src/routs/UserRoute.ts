// @ts-ignore
let express = require('express')
// @ts-ignore
const router = express.Router();
const {loginUser, registerUser, editUSer,getUsersList} = require('../controllers/UserController')
// @ts-ignore
let auth = require('../middleware/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/edit', auth, editUSer);
router.get('/list',auth, getUsersList);


module.exports = router;