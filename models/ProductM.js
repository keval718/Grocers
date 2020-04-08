const mongoose = require('mongoose');

const ProductSchema=new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true

    },
    fk_store_id: {
        type: String,
        required: true
    },
    productImage:{type:String}


}
   
);

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
