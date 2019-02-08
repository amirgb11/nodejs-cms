const express = require('express');
const router = express.Router();
const passport = require('passport');

// router.get('/' , (req , res) => {
//     res.json('Home Router')
// } )
const registerController = require('app/http/controllers/auth/registerController');
const loginController = require('app/http/controllers/auth/loginController');
const forgotPasswordController = require('app/http/controllers/auth/forgotPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');


// validators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');
const forgotPasswordValidator = require('app/http/validators/forgotPasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');

router.get('/register' , registerController.showRegisterationForm);
router.get('/login'  ,loginController.showLoginForm);

router.post('/register', registerValidator.handle() ,registerController.registerProccess);
router.post('/login' , loginValidator.handle() , loginController.loginProccess);


router.get('/password/reset' , forgotPasswordController.showForgotPassword);
router.post('/password/email' , forgotPasswordValidator.handle() , forgotPasswordController.sendPasswordResetLink);
 
router.get('/password/reset/:token' , resetPasswordController.showResetPassword);
router.post('/password/reset' , resetPasswordValidator.handle() , resetPasswordController.resetPasswordProccess);
 

router.get('/google', passport.authenticate('google' , { scope : ['profile' , 'email'] } ));
router.get('/google/callback', passport.authenticate('google' , { successRedirect : '/' , failureRedirect : 'register '} ));


module.exports = router ; 