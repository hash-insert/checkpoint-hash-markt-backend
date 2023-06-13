const Product=require('../model/Products.js')

exports.postProducts=async(req,res)=>{
    const productsData=req.body
    try{
        await Product.insertMany(productsData);
        res.send('added')
    }catch(error){
        console.log(error)
    }


}