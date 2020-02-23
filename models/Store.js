const mongoose=require('mongoose');

const storeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
         type:String,
         required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
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
    },
    fk_product_id:{
        type:String,
        required:true
    }
}

);

const Store=mongoose.model('store',storeSchema);
module.exports=Store;