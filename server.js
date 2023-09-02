const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const app = express()
const dotenv= require("dotenv").config(); // for loading variables in .env files

connectDb();

app.use(express.json()) // The express.json() middleware function is used to parse JSON bodies in incoming requests. It takes the raw JSON data in the request body, parses it, and makes it available on req.body.
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorHandler) // error handling using middleware

app.listen(process.env.PORT,()=>{
    console.log(`app listening at port ${process.env.PORT}`);
})