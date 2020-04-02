const express = require('express');
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
let userList = require("../../models/User");
const router = express.Router();
router.post('/adduser', [
    check('password', 'password is required').not().isEmpty(),
    check('name', 'minimum 1 needed').isLength({
        min: 1
    }),
    check('email', 'please enter valid email').isEmail(),
    check('street_address', 'street address is required').not().isEmpty(),
    check('province', 'province is required').not().isEmpty(),
    check('country', 'country is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
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
            //check if users email  is there already in the database
            try {
                let user1 = await userList.findOne({
                    email: req.body.email
                });
                if (user1) {
                    return res.send("already exists").json({
                        error: [{
                            msg: 'user already exists'
                        }]
                    });

                }
                //create new user
                const newUser = new userList({
                    //user:req.user.id,
                    name:req.body.name,

                    email: req.body.email,
                    password: req.body.password,
                    postal_code:req.body.postal_code,
                    street_address:req.body.street_address,
                    province:req.body.province,
                    country:req.body.country,
                    phone:req.body.phone
                });
                //hash the password
                const salt = await bcrypt.genSalt(10);
                newUser.password = await bcrypt.hash(req.body.password, salt);
                await newUser.save();
                //generate token
                const payload = {
                    user: {
                        id: newUser.id,
                        name: newUser.name
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

    } catch (err) {}

});
router.get('/',async(req,res)=>{
    try{
    const user=  await userList.find();
    res.send(user);
    }
    catch(err)
    {
        res.send(err);
    }
})
router.post('/login', async (req, res) => {
 
    //in curly braces beacuse we are checking email field from database
    const checkUser= await userList.findOne({email:req.body.email});
    if(!checkUser)
    {
       return res.send("No User Found");
    }
    const validpassword=await bcrypt.compare(req.body.password,checkUser.password);
    const payload = {
        user: {
            id: checkUser.id,
            name:checkUser.name
          
        }
    };
    if(!validpassword)
    {
        return res.status(400).send("invalid password");

    }
    
    else{
       
        //create and asssign token

        jwt.sign(
                      payload,
                      config.get('jwtsecret'),
                      { expiresIn: 36000 },
                      (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                      }
                    );
                  
    }
    


   
    

});
// router.post(
//     '/login',
//     [
//       check('email', 'Please include valid email').isEmail(),
//       check('password', 'Password is required').exists()
//     ],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       const { email, password } = req.body;
//       try {
//         //see if user exists
//         let user = await userList.findOne({ email });
//         if (!user) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'invalid credentials' }] });
//         }
  
//         const isMatch = await bcrypt.compare(password, user.password);
  
//         if (!isMatch) {
//           return res
//             .status(400)
//             .json({ errors: [{ msg: 'invalid credentials' }] });
//         }
//         //get user info for payload from mongo
//         const payload = {
//           user: {
//             id: user.id,
//             name: user.name
//           }
//         };
  
//         jwt.sign(
//           payload,
//           config.get('jwtsecret'),
//           { expiresIn: 36000 },
//           (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//           }
//         );
//       } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//       }
//     }
//   );
module.exports=router;