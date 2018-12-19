const express = require('express');
const router = express.Router();

// router.get('/' , (req , res) => {
//     res.json('Home Router')
// } )
const homeController = require('app/http/controllers/homeController');
const registerController = require('app/http/controllers/auth/registerController');
const loginController = require('app/http/controllers/auth/loginController');

router.get('/' , homeController.index );
router.get('/register' , registerController.showRegistrationForm);
router.get('/login' , loginController.showLoginForm);
router.post('/register' , registerController.registerProccess);


module.exports = router ; 