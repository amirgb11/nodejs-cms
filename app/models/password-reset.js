const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');


const passwordReset = mongoose.Schema({
    email : { type : String , require : true},
    token : { type : String , require : true} ,
    use : { type : Boolean , default : false }
} , { timestamps : { updatedAt : false } });


module.exports = mongoose.model('passwordReset' , passwordReset);





// const mongoose = require('mongoose');
// //const bcrypt = require('bcrypt');


// const passwordReset = mongoose.Schema({
//     email : { type : String , require : true},
//     token : { type : String , require : true },
//     use : { type : Boolean , default : false }
// } , 
//     {timestamps : { updatedAt : false } });

// // userSchema.pre('save' , function (next) {
    
// //     bcrypt.hash(this.password , bcrypt.genSaltSync(15) , (err , hash) => {          // arrow function to access to the 'this' key word
        
// //         if(err) console.log(err);
// //         this.password = hash ; 
// //         next();
// //     })
// // })


// module.exports = mongoose.model('passwordReset' , passwordReset );