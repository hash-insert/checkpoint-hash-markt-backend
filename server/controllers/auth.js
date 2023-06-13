const User = require("../model/User");
const JWT = require('jsonwebtoken');
require('dotenv/config');
const bcrypt = require("bcryptjs");
const SECRET = process.env.SECRET;


exports.signin = async(req, res) => {
    console.log(req.body);
const {username,email,password} = req.body;
try{
    if(!username||!email||!password)res.send("enter all the inputs");
    else if(await User.findOne({email}))res.send("User already exist.");
    else{
        const salt= bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password,salt);
    const user = new User({
        name:username,
        email:email,
        password:hashedPassword
    })
    user.save();
    const token = JWT.sign({
        email:email
    },SECRET,{expiresIn:"1d"})
    res.cookie("Token",token)
    res.send(token);
}
}
catch(error){
    console.log(error);
}
};

exports.login = (req,res) =>{
   const {email,password} = req.body;
   try{
    const Email = User.findOne({email})
    if(Email){
        if(bcrypt.compare(Email.password,password)){
            const token = JWT.sign({email:email},SECRET,{expiresIn:"1d"})
            res.cookies("Token",token)
            res.send(token);
        }
        else{res.send("enter password correctly")}
    }else{res.send("Email doesnot exist signup now!")}
   }catch(error){
        console.log(error);
   }

}

exports.logout = (req,res) =>{
    try{
            res.cookies("Token","")
            res.send("Logout was sucessfull");
    }catch(error){
        console.log(error);
    }
}

