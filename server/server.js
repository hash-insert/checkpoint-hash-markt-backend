const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const app = express();

// Routes
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const userRouter = require("./routes/user");
const { errorHandler } = require("./errors/errorHandler");
const { authorization } = require("./middlewares/authentication");

// middlewares
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api", productsRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

// connect to DB and listen to server
const port = process.env.PORT || 8190;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to DB.`);
    app.listen(port, () => console.log(`Server running on port ${port} 🎆`));
  } catch (error) {
    console.log(`error connecting to server->${error}`);
  }
};

startServer();
