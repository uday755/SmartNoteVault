const express = require("express");
const cors = require("cors")
const { connection } = require("./database");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const port = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);

app.get("/",(req,res)=>{
    res.send({
        message : "API is Working Now"
    })
})

app.listen(port, async()=>{
    try {
        await connection;
        console.log("Database is Connected");
    } catch (error) {
        console.log(error);
    }

    console.log("Server is Running on Port Number : " , port);
})