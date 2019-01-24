const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check');


class controller {
    constructor(){
        autoBind(this);
        this.recaptchaConfig();
    }

    recaptchaConfig(){
        this.recaptcha = new Recaptcha(
            config.service.recaptcha.site_key ,
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


    async validationData(req) {
        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
           
            errors.forEach(err => messages.push(err.msg));

            req.flash('errors' , messages)

            return false;
        }

        return true;
    }
}

module.exports = controller ;