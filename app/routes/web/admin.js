const express = require('express');
const router = express.Router();

// router.get('/' , (req , res) => {
//     res.json('Admin Router')
// } )

const adminController = require('app/http/controllers/admin/adminController');

router.use((req , res , next) => {

    res.locals.layout = "admin/master"
    next();
})

router.get('/' , adminController.index )
router.get('/course' , adminController.course)

module.exports = router ; 