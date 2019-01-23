const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;


class controller {
    constructor(){
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig(){
        this.recaptcha = new Recaptcha(
            config.service.recaptcha.clinet_key ,
            config.service.recaptcha.secret_key ,
            {...config.service.recaptcha.options}
            );
    }

    recaptchaValidation( req , res){
        return new Promise((resolve , reject) => {
            this.recaptcha.verify(req , ( err , data) => {
                if (err) {
                     req.flash('errors' , 'لطفا ریکپچا را پر کنید . ' );
                     res.redirect(req.url);
                } else resolve(true);
            })
        })
    }
}

module.exports = controller ;