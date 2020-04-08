const mongoose = require('mongoose');



const CartScheme = new mongoose.Schema({



    pname: {
        type: String,
        required: true
    },
    quantity: {
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
    fk_user_id: {
        type: String,
        required: true
    }
    

}
    // {
    //     collection: "addtocart"
    // }

);

const Cart = mongoose.model('addtocart', CartScheme);
module.exports = Cart;