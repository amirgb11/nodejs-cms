const express = require('express');
const router = express.Router();

// router.get('/' , (req , res) => {
//     res.json('Home Router')
// } )
const homeController = require('app/http/controllers/homeController');
const registerController = require('app/http/controllers/auth/registerController');
const loginController = require('app/http/controllers/auth/loginController');

// middleware
const redirectIfAuthenticated = require('app/http/middleware/redirectIfAuthenticated');



router.get('/' , homeController.index );
router.get('/register' , redirectIfAuthenticated.handle , registerController.showRegisterationForm);
router.get('/login' ,redirectIfAuthenticated.handle ,loginController.showLoginForm);
router.post('/register' , redirectIfAuthenticated.handle ,registerController.registerProccess);
router.post('/login', redirectIfAuthenticated.handle , loginController.loginProccess);
 
router.get('/logout' , (req , res) => {
    req.logout();
    res.clearCookie('remember_token');  
    res.redirect('/');
})

module.exports = router ; 