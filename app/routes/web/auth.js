const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/' , (req , res) => {
//     res.json('Home Router')
// } )
const registerController = require('app/http/controllers/auth/registerController');
const loginController = require('app/http/controllers/auth/loginController');


// validators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');

router.get('/register' , registerController.showRegisterationForm);
router.get('/login'  ,loginController.showLoginForm);
router.post('/register', registerValidator.handle() ,registerController.registerProccess);
router.post('/login' , loginValidator.handle() , loginController.loginProccess);
 
router.get('/google', passport.authenticate('google' , { scope : ['profile' , 'email'] } ));
router.get('/google/callback', passport.authenticate('google' , { successRedirect : '/' , failureRedirect : 'register '} ));


module.exports = router ; 