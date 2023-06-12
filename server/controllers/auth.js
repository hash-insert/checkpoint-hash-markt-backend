const User = require("../model/User");
const jwt=require('jsonwebtoken')
 require('dotenv/config')



exports.signin = async(req, res) => {
    try{
        console.log('in signin')
        const {name,email,password}=req.body;

        const userObj=new User({
           name:name,
           email:email,
           password:password
        })
          userObj.save();
        let jwtToken=jwt.sign({email:email},process.env.secret);
       res.cookie("user",jwtToken);
        res.json(userObj)

    }catch(error){
        console.log(error)
    }
   
    

    

};

exports.login = async (req, res) => {

    try{
        const {username,password}=req.body;

    let verify1=await User.findOne({name:username});
    let verify2=await User.findOne({password:password});
    if(verify1 && !verify2){
        res.send('check your password')
    }
    if(!verify1 && verify2){
        res.send('check your username')
    }
    if(verify1 && verify2){
        let jwtToken=jwt.sign({username},process.env.secret);
        res.cookie("user",jwtToken);
        res.send('logged in!!')
    }else{

  
    
   

    }
    
    

    

}catch(error){
    console.log(error)
}
}
    



exports.logout = (req, res) => {
    try{
        res.cookie("user","")
        res.send('user loggedout')

    }catch(error){
        console.log(error)

    }
   

  
    
   
    

    

};





