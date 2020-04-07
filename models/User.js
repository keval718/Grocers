const mongoose=require('mongoose');

const UserScheme=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
         type:String,
         required:true,
         unique:true
    },
    password:{
        type:String,
        required:true,
      
    },
    street_address:{
        type:String,
        required:true
    },
    postal_code:{
        type:String,
        required:true
    },
    province:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

});

const User=mongoose.model('user',UserScheme);
module.exports=User;