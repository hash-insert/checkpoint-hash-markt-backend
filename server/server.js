const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");

// Routes
const auth = require("./routes/auth");
app.use(cors());
app.use(bodyParser.json());
app.use(cookieparser());

app.use(express.json());
app.use("/", auth);

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the DataBase"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`Server running on port ${port}`));
