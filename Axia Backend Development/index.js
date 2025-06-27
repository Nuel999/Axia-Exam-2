const express = require("express");
const userRoutes = require ("./routes/userRoutes")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookiePareser = require ("cookie-parser");
dotenv.config()

const app = express()

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("Connection was successful"))
.catch(() => console.log("Opps something went wrong"));

app.use(express.json());
app.use(cookiePareser());

// calling my file out 
app.use(userRoutes);

const port = 5000
app.listen(port, () => {
    console.log("This is port 5000")
});