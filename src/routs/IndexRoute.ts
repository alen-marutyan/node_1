// @ts-ignore
let express = require('express')
// @ts-ignore
const router = express.Router()
const usersRouter = require('./UserRoute');
const CarRouter = require('./CarRouter');


router.use('/user', usersRouter);
router.use('/car', CarRouter);


router.get('/', (req, res) => {
    res.send('Home Page')
})


module.exports = router;