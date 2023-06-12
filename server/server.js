const express = require("express");

const  app=express()
app.use(express.json())

// Routes
const auth = require("./routes/auth");
app.use("/api", auth);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port} 🎆`));