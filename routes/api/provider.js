const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let providerList = require("../../models/Provider");

const router = express.Router();
router.post('/addprovider', [
    check('password', 'password is required').not().isEmpty(),
    check('name', 'minimum 1 allowed').isLength({
        min: 1
    }),
    check('email', 'please enter valid email').isEmail(),
    check('Address', 'Address is required').not().isEmpty(),
    check('province', 'province is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('OwnerName', 'Owner Name is required').not().isEmpty(),
    check('Open_time', 'Open Time is Required').not().isEmpty(),
    // check('Close_time', 'Close Time is required').not().isEmpty(),
    check('postal_code', 'maximum 6 allowed').not().isEmpty().isLength({
        max: 6
    })
],

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            } else {

                console.log(req.body);
                //check if Products email  is there already in the database
                try {
                    let Provider = await providerList.findOne({
                        email: req.body.email
                    });
                    if (Provider) {
                        return res.send("already exists").json({
                            error: [{
                                msg: 'Provider already exists'
                            }]
                        });

                    }
                    //create new Provider
                    const newProvider = new providerList({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        postal_code: req.body.postal_code,
                        Address: req.body.Address,
                        province: req.body.province,
                        country: req.body.country,
                        phone: req.body.phone,
                        OwnerName: req.body.OwnerName,
                        Open_time: req.body.Open_time,
                        Close_time: req.body.Close_time
                    });
                    //hash the password
                    const salt = await bcrypt.genSalt(10);
                    newProvider.password = await bcrypt.hash(req.body.password, salt);
                    await newProvider.save();
                    //generate token
                    const payload = {
                        user: {
                            id: newProvider.id,
                            name: newProvider.name
                        }
                    };
                    jwt.sign(
                        payload,
                        config.get('jwtsecret'),
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                        }
                    );

                    // res.send(newUser);

                } catch (err) {
                    console.log('Error: ', err)
                    return res.send(err)
                }

            }

        } catch (err) { }

    });
    router.delete('/deleteProvider/:id',async(req,res)=>{
        try{
       const provider=  await providerList.findById(req.params.id)
         provider.delete();
          res.send("Provider deleted");
        }
        catch(err)
        {
            console.log(err);
        }
      });
    router.get('/display',async(req,res)=>{
        try{
         //   res.json(tasklist);
         const provider=await providerList.find();
         console.log(provider);
         res.json(provider);
        }
        catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    
    
    });
    router.get('/display/:id',async(req,res)=>{
        try{
         //   res.json(tasklist);
         const provider=await providerList.findById(req.params.id);
         console.log(provider);
         res.json(provider);
        }
        catch(err){
            console.log(err);
            res.status(500).send('Server Error');
        }
    
    
    });
    router.post('/update/:id',async(req,res)=>{
        providerList.findById(req.params.id)
          .then(provider => {
           provider.name= req.body.name,
           provider.email= req.body.email,
           provider. password= req.body.password,
           provider.postal_code= req.body.postal_code,
           provider.Address= req.body.Address,
           provider.province= req.body.province,
           provider.country=req.body.country,
           provider. phone= req.body.phone,
           provider. OwnerName= req.body.OwnerName,
           provider.Open_time= req.body.Open_time,
           provider.Close_time= req.body.Close_time
           
            provider.save()
              .then(() => res.json('Exercise updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      });
    router.post('/Providerlogin', async (req, res) => {
        try {
            const user  = await providerList.checkValidCredentials(req.body.email, req.body.password)
    
            const token = await user.newAuthToken()
            res.send({ user, token})
            console.log("success");
        } catch (error) {
            res.status(400).send()   
            console.log("fail" + error);     
        }
    })
router.post('/Providerlogin', async (req, res) => {

    console.log(req.body.email);
    //in curly braces beacuse we are checking email field from database
    const checkUser = await providerList.findOne({ email: req.body.email });
    if (!checkUser) {
        return res.send("No User Found");
    }
    const validpassword = await bcrypt.compare(req.body.password, checkUser.password);
    const payload = {
        user: {
            id: checkUser.id
        }
    };
    if (!validpassword) {
        return res.status(400).send("invalid password");

    }

    else {

        //create and asssign token
        const token = jwt.sign(payload, config.get('jwtsecret'));
        res.header('auth-token', token).send(token);
    }

});

router.get('/', async (req, res) => {
    try {
        //   res.json(tasklist); 
        const CartList = await providerList.find();
        console.log(CartList);
        res.json(CartList);

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }


});

router.get('/:id', async (req, res) => {
    try {
        //     const task = tasklist.find(t => t.id == req.params.id);
        const CartID = await providerList.findOne(req.params.email);
        console.log(CartID);
        if (!CartID) {

        }
        res.send(CartID);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }


});

router.delete('/:id', async (req, res) => {
    try {

        const CartID = await providerList.findOne(req.params.email);
        CartID.delete();
        res.json("Deleted");

    } catch (err) {
        res.status(500).send('Server error');
    }
});


module.exports = router;