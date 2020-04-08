const express = require('express');
const router = express.Router();
const mailer = require('../../mailer');



router.route('/sendEmail').post(async (req, res) => {
    try {
        const email = req.body.email;

        //const url = req.body.location;
        console.log("backend mailer.js")
       console.log(email)
        await mailer.doEmail(email)
        res.send("mail done");
    } catch (err) {
        res.send("Error "+err);
    }
})


module.exports = router;