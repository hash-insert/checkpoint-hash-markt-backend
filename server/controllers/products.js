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

exports.getProducts=async(req,res)=>{
    try{
        const products= await Product.find();
        res.send(products)

    }catch(error){
        console.log(error)

    }
   
}

exports.getById=async(req,res)=>{
    try{
        const id=req.params.id;
        const products=await Product.findOne({_id:id});
        res.json(products)

    }catch(error){
        console.log(error)

    }

}

exports.getByCategory=async(req,res)=>{
    try{
        const category=req.params.category;
        const products=await Product.findOne({category:category});
        res.json(products)

    }catch(error){
        console.log(error)

    }

}

