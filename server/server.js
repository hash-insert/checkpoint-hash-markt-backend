const express = require("express");
const dotenv = require("dotenv");
const database = require("../server/config/database")
const cookieParser = require('cookie-parser')
const auth = require("./routes/auth");
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

database.once('open', () => {
    console.log('Connected')
})

// Routes
app.use("/api", auth);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));