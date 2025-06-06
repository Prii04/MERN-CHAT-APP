const express=require("express");
const dotenv=require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes= require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

console.log('Environment Variables:', {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
});


connectDB();
const app=express();
app.use(express.json()); //to accept json data in the request body since we are taking the values from the user(frontend) in json format

app.get('/',(req,res)=> {
    res.send("Api is running successfully");
});


app.use('/api/user',userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.yellow.bold));  