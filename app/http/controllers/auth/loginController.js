const controller = require('app/http/controllers/controller');
const passport = require('passport');


class loginController extends controller {
    showLoginForm(req , res){

        res.render('home/auth/login' , { 
            // messages : req.flash('errors') ,     commented because set this in globalVariables 
            recaptcha : this.recaptcha.render() , 
            title : 'صفحه ی ورود' } );
    }


    async loginProccess(req , res , next) {

        await this.recaptchaValidation(req , res)
        let result = await this.validationData(req)
            if(result => {
              return this.login(req , res , next);
            })

            
        req.flash('formData' , req.body);
        return res.redirect('/auth/login');

    }

    login(req , res , next ){
        passport.authenticate('local.login' , (err , user) => {
            if(!user) return res.redirect('/auth/login');

            req.logIn(user , err => {          // logIn is a passport function 
                if(req.body.remember) {
                    
                    user.setRememberToken(res);
                }

                return  res.redirect('/');
            })
        }
        //  {
        //     successRedirect : '/' , 
        //     failureRedirect : '/login' , 
        //     failureFlash : true 
        // }


        )(req , res , next);
    }

}

module.exports = new loginController();