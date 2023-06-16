const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log(`Connected to mongoDB`);
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose.connection;