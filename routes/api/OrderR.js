const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let Cart = require("../../models/OrderM");
let Cart1 = require("../../models/AddToCartM");
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
     //   res.json(tasklist); 
     const CartList=await Cart.find();
     console.log(CartList);
     res.json(CartList);
     
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }


});

router.get('/:id',async(req,res)=>{
    try{
   //     const task = tasklist.find(t => t.id == req.params.id);
        const CartID= await Cart.findById(req.params.id);
     console.log(CartID);
        if(!CartID){
            
        }
        res.send(CartID);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Server Error');
    }

    
});

router.delete('/:id', async(req, res) => {
    try{
        
        const CartID=await Cart.findById(req.params.id);
        CartID.delete();
       res.json("Deleted");        

    }catch(err){
        res.status(500).send('Server error');
    }
});

router.post('/',
// [
//     check('name').not().isEmpty(),
//     check('desc').isLength({min : 12})
// ]
//,
async(req, res) => {
    try {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(422).json({ errors: errors.array() });
        // }
     // console.log(req.body);
    //   let pro=Array();
    //   const CartID= await Cart.find(req.parm.fk_user_id);
    //  for(i=0;i<CartID.length;i++){
    //     console.log(CartID[i].pname);
    //     const re=new Object({
    //         pname: CartID[i].pname,
    //     quantity: CartID[i].quantity,
    //     amount: CartID[i].amount
    //     })
    //     pro.push(re);

    //  }
    //  const an=pro;
    //  console.log(an);
    console.log("a")
      const newCart = new Cart({
        // id: req.body.id,
        // pname: req.body.pname,
        // quantity: req.body.quantity,
        // amount: req.body.amount,
        product:[{
            pname : req.body.product[0].pname,
            quantity: req.body.product[0].quantity,
            amount: req.body.product[0].amount
        },
        {
            pname : req.body.product[1].pname,
            quantity: req.body.product[1].quantity,
            amount: req.body.product[1].amount
        }
        ],
        fk_store_id: req.body.fk_store_id,
        fk_user_id: req.body.fk_user_id
        
      });
      console.log(newCart);
      const nCart=await newCart.save();
    //  tasklist.push(newTask);
    console.log(nCart)
      res.send(nCart);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.put('/:id', async(req, res) => {
    try {
        //find an element by id
        //
     //   const TaskDb= await Task.findById(req.params.id);
        let CartID = await Cart.findById(req.params.id);
        
        //   TaskDb.id= req.body.id;
        CartID.pname= req.body.pname;
        CartID.quantity= req.body.quantity;
        CartID.amount= req.body.amount;
        CartID.fk_store_id= req.body.fk_store_id;
        CartID.fk_user_id= req.body.fk_user_id;         
        
        const cart=await CartID.save();
    //    Task[TaskDb]=newTask;
      //   console.log(userlist[user]);
        console.log(cart);
        res.send(cart);
      }
       catch (err) {
        res.status(500).send('Server error');
        console.log(err);
      }
  });
module.exports=router;