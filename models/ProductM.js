const mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
  
    img:{type:String}


}
   
);

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
