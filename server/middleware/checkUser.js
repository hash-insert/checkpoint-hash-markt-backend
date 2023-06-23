const jwt =require('jsonwebtoken')
require('dotenv/config')

exports.authenticate=(req,res,next)=>{
    const jwtCookie=req.cookies();
    const document=jwt.verify(jwtCookie,process.env.secret);
    if(document){
        next()
    }
    else{
        res.send('not a user')
    }

    


}