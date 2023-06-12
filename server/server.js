import express from "express";
import dotenv from "dotenv";
import ConnectToDB from "./config/DBconn.js";
import route from "./routes/user.js";

const app = express();

dotenv.config();
const port = 8080;

ConnectToDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", route);

app.get("/", (req, res) => {
  res.send("Hello you created a running server");
});

app.listen(port, () => {
  console.log(`server is running perefectly`);
});
