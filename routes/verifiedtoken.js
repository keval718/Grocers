const jwt=require('jsonwebtoken');
const config = require('config');
module.exports=function (req,res,next)
{
    const token=req.header('x-auth-token');
    console.log(token);
    if(!token)
    {
        return res.send("Access denied");

    }
    try{
console.log("inside");
        const verified =jwt.verify(token,config.get('jwtsecret'));
        console.log(verified);

        req.user=verified;
        next();
    }
    catch(err)
    {
        res.send(err);
    }
}