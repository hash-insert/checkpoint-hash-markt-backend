import Product from "../model/Product"

export const product = async(req, res) => {
    try{
        const productData = req.body;
         const newProduct = await Product.create(productData);
         await newProduct.save();
         res.Status(201).send("Data saved successfully");
         
    }catch(error){
        console.log(error);
        res.Status(500).send("Error occured while saving data")
    }
}

export const getAllProducts = async(req,res) => {
    try{
        const data = await Product.find();
        res.Status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.Status(500).send("Error occurred while fetching data")
    }
}

export const getProductById = async(req,res) => {
    try{
        const { id } = req.params;
        const data = await Product.findById(id);
        if(!data){
            return res.Status(404).send("Data not found")
        }
        res.Status(200).json(data);
        }catch(error){
            console.log(error);
            res.Status(500).send("Error occurred while fetching data");
    }
}


export const getProductByCategory = async(req,res) => {
    try{
        const { category } = req.params;
        const data = await Product.find({ category });
        res.Status(200).json(data);
    }catch(error){
        console.log(error);
        res.Status(500).send("Error occured while fetching data");
    }
}