const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let Cart = require("../../models/OrdersM");

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const CartList = await Cart.find();
        console.log(CartList);
        res.json(CartList);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }


});

router.get('/:id', async (req, res) => {
    try {
       
        const CartID = await Cart.findById(req.params.id);
        console.log(CartID);
        if (!CartID) {

        }
        res.send(CartID);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }


});

router.delete('/:id', async (req, res) => {
    try {

        const CartID = await Cart.findById(req.params.id);
        CartID.delete();
        res.json("Deleted");

    } catch (err) {
        res.status(500).send('Server error');
    }
});

router.post('/',
    async (req, res) => {
        try {
            new_products = [];
            req.body.product.forEach((p) => new_products.push(p));
            const newCart = new Cart({
                product: new_products,
                fk_store_id: req.body.fk_store_id,
                fk_user_id: req.body.fk_user_id
            });

            console.log(newCart);
            const nCart = await newCart.save();
            console.log(nCart)
            res.send(nCart);
        } catch (err) {
            res.status(500).send(err);
        }
    });

router.put('/:id', async (req, res) => {
    try {

        let CartID = await Cart.findById(req.params.id);
        CartID.pname = req.body.pname;
        CartID.quantity = req.body.quantity;
        CartID.amount = req.body.amount;
        CartID.fk_store_id = req.body.fk_store_id;
        CartID.fk_user_id = req.body.fk_user_id;

        const cart = await CartID.save();

        console.log(cart);
        res.send(cart);
    } catch (err) {
        res.status(500).send('Server error');
        console.log(err);
    }
});
module.exports = router;