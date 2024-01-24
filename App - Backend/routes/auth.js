const express = require("express");
const userRouter = express.Router();

const  UserModel  = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/NoteModel");

userRouter.post('/', (req, res)=>{
    console.log(req.body);
    // const {name, email, passsword} = req.body;
    const user = new UserModel(req.body);
    user.save();
    res.send(req.body);
})

// Create a User using : POST "/api/auth/" . Doesnt require authentication 
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 5, async function (err, hash) {
        if (err) return res.send({ message: "Something went Wrong", status: 0 });
        try {
            let user = new UserModel({ name, email, password: hash })
            await user.save();
            res.send({
                message: "User Created",
                status: 1
            })
        } catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }
    });
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let data = await UserModel.find({ email });
        if (data.lenght > 0) {
            let token = jwt.sign({ userId: data[0]._id }, "uday")
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) return res.send({ message: "Something went Wrong" + err, status: 0 })
                if (result) {
                    res.send({
                        message: "User Logged In Successfully",
                        token: token,
                        status: 1
                    })
                }
                else {
                    res.send({
                        message: "Invalid User Password",
                        // token:token,
                        status: 0
                    })
                }
            })
        } else {
            res.send({
                message: "User Does Not Exist",
                status: 0
            })
        }
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

module.exports =  userRouter; 