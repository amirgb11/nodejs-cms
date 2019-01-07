const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');


const userSchema = mongoose.Schema({
    name : { type : String , require : true},
    admin : { type : Boolean , default : 0},
    email : { type : String , uniqe : true , require : true},
    password : { type : String , require : true },
    rememberToken : { type : String , default : null}
} , 
    {timestamps : true });

// userSchema.pre('save' , function (next) {
    
//     bcrypt.hash(this.password , bcrypt.genSaltSync(15) , (err , hash) => {          // arrow function to access to the 'this' key word
        
//         if(err) console.log(err);
//         this.password = hash ; 
//         next();
//     })
// })

userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token' , token , { maxAge : 1000 * 60 * 60 * 24 * 90 , httpOnly : true , signed : true}) // signed : true for cookie encryption
    this.update({ rememberToken : token } , err => {            // update in mongodb
       if(err) console.log(err)
    })
}

const myModel = mongoose.model('User' , userSchema ); 

module.exports = myModel;