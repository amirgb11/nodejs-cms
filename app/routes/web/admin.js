const express = require('express');
const router = express.Router();

// router.get('/' , (req , res) => {
//     res.json('Admin Router')
// } )

const adminController = require('app/http/controllers/admin/adminController');
const courseController = require('app/http/controllers/admin/courseController');

router.use((req , res , next) => {

    res.locals.layout = "admin/master"
    next();
})

router.get('/' , adminController.index )
router.get('/courses' , courseController.index)
router.get('/courses/create' , courseController.create)

module.exports = router ; 