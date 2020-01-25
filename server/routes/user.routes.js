const user = require('../controllers/user.controller')

const {
    Router
} = require('express')

const router = Router()

router.get('/list', user.getUserList);


module.exports = router