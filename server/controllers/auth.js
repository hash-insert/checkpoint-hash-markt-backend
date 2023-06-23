const User = require("../model/User");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
 require('dotenv/config')



exports.signin = async(req, res) => {
    try{
        console.log('in signin')
        const {name,email,password}=req.body;
        const data= await User.findOne({email:email})
        if(data){
            res.send('Email already exists')
        }else{
            const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);


        const userObj=new User({
           name:name,
           email:email,
           password:hashedPassword
        })
          userObj.save();
        let jwtToken=jwt.sign({email:email},process.env.secret);
       res.cookie("user",jwtToken);
        res.json(userObj)


        }
        
    }catch(error){
        console.log(error)
    }
   
    

    

};

exports.login = async (req, res) => {

    try{
        const {email,password}=req.body;

    let verify1=await User.findOne({email:email});
    if(!verify1){
        res.send('check your details')
        return;

    }
    let verify2=await bcrypt.compare(password,verify1.password);
    if(!verify2){
        res.send('check your details')
        return
    }
   
    
    if(verify1 && verify2){
        let jwtToken=jwt.sign({email},process.env.secret);
        let userData = await User.find({email:email})
        console.log(userData)
        res.cookie("user",jwtToken);
        res.json(userData)
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





