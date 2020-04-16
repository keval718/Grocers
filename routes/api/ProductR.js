const express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let Cart = require("../../models/ProductM");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const router = express.Router();
router.get('/getAllProducts', async (req, res) => {
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
    let pro = Array();
    for (i = 0; i < CartID.length; i++) {
      console.log(CartID[i].pname);
      const re = new Object({
        pname: CartID[i].pname,

        amount: CartID[i].amount
      })
      pro.push(re);

    }
    console.log(pro.length + ",khjvg");
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

      console.log(req.body);
      console.log(req.file);
      let pro = Array();
      const newCart = new Cart({
        id:req.body.id,
        name: req.body.name,
        desc:req.body.desc,
        price: req.body.price,
        img: req.body.img


      });
      const nCart = await newCart.save();
      //  tasklist.push(newTask);
      console.log(nCart)
      res.send(nCart);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.put('/:id', async (req, res) => {
  try {

    let CartID = await Cart.findById(req.params.id);
    CartID.id=req.body.id;
    CartID.name = req.body.name;
    CartID.desc=req.body.desc
    CartID.price = req.body.price;
    CartID.img=req.body.img;
    


    const cart = await CartID.save();
    console.log(cart);
    res.send(cart);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});
module.exports = router;