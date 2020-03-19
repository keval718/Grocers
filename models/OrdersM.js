const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
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

    }
});

const OrderSchema = new mongoose.Schema({



    product: [
      productSchema
    ],
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

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;
