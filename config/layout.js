const path = require('path');
const expressLayouts = require('express-ejs-layouts');

module.exports = {
    public_dir : 'public' , 
    view_engine : 'ejs' , 
    view_dir : path.resolve('./resource/views'),
    ejs : {
        expressLayouts,
        extractScripts : true ,
        extractStyles : true ,
        master_dir : 'home/master' 
    }   
}