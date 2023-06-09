const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const app=express();
dotenv.config({path: './config.env'})
const port=process.env.PORT || 3000;

app.use(express.json());
require('./db/conn')

app.get('/', (req, res) =>{
    res.send('Welcome')
})


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})








//8suDlbxfMYU8cSud