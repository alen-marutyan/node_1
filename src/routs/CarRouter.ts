// @ts-ignore
let express = require('express')
// @ts-ignore
const router = express.Router();
const {createCar,editCar,removeCar,listCar} = require('../controllers/CarController')
// @ts-ignore
let auth = require('../middleware/auth');

router.post('/create',auth, createCar);
router.put('/edit/:id',auth, editCar);
router.delete('/remove/:id',auth, removeCar);
router.get('/list',auth, listCar);



module.exports = router;