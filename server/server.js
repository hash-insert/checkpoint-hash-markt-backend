const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
// Routes
app.use("/api", auth);

// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log(`Connected to mongoDB`);
}).catch((err) => {
    console.log(err);
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));