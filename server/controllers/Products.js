const productSchema = require('../model/Products.js')

exports.Postproducts = async(req,res) =>{
    const product = req.body;
    await productSchema.insertMany(product);
    res.send("products data saved to DB.")
}