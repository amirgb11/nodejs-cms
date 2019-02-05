const controller = require('app/http/controllers/controller');
const passport = require('passport');


class forgotPasswordController extends controller {
    showForgotPassword(req , res){

        res.render('home/auth/passwords/email' , { messages : req.flash('errors'), recaptcha : this.recaptcha.render() , title : 'صفحه ی فراموشی رمز عبور' } );
    }


    async sendPasswordResetLink(req , res , next) {

       await this.recaptchaValidation(req , res)
       let result = await this.validationData(req);

       if (result) {
           return this.sendResetLink(req , res)
       }
       return  res.redirect('/auth/password/reset');
    }

    sendResetLink(req , res , next ){
         res.json('reset');
}
    
}

module.exports = new forgotPasswordController();