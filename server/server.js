const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

app.use(express.json());


// Routes
const auth = require("./routes/auth");
app.use("/", auth);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));


app.listen(port, () => console.log(`Server running on port ${port} 🎆`));