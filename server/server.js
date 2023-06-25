const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const auth = require("./routes/auth");
const user = require("./routes/users")

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(express.json());

//Routes
app.use("/api/auth", auth);
app.use("/api/user/:id", user)


const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DataBase"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`Server running on port ${port}`));
