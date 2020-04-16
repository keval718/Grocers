const mongoose = require('mongoose');

const sub = new mongoose.Schema({
    _id: {
        type: String
    },
    id:{
        type:String
    },
    name:{
        type:String
    },
    desc:{
        type:String
    },
    price:{
        type:Number
    },
    img:{
        type:String
    },
    __v:{
        type:Number
    },
    quantity:{
        type:Number
    }
});

const OrderSchema = new mongoose.Schema({



        product: [sub],


        fk_user_id: {
            type: String,
            required: true
        },
        total:{
            type:Number,
            required:true
        }


    }
    // {
    //     collection: "addtocart"
    // }

);

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;