const express = require("express");
const userRouter = express.Router();
const {body, validationResult} = require('express-validator');

const  UserModel  = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/NoteModel");

userRouter.post('/', [
    body('name', 'Enter a Valid Name of Lenght at least 3').isLength({min : 3}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Lenght should be atleast 5').isLength({ min: 5 }),
], async (req, res)=>{
    // Validation Checks
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array()});
    }

    // Creating a New User //
    UserModel.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    }).then(user =>{res.json(user)})
    .catch(err =>{
        console.log(err)
        res.json({error: 'This Email ID is not Available, Try Something else'})
    })

    // res.send(req.body);
})

// // Create a User using : POST "/api/auth/" . Doesnt require authentication 
// userRouter.post("/register", async (req, res) => {
//     const { name, email, password } = req.body
//     bcrypt.hash(password, 5, async function (err, hash) {
//         if (err) return res.send({ message: "Something went Wrong", status: 0 });
//         try {
//             let user = new UserModel({ name, email, password: hash })
//             await user.save();
//             res.send({
//                 message: "User Created",
//                 status: 1
//             })
//         } catch (error) {
//             res.send({
//                 message: error.message,
//                 status: 0
//             })
//         }
//     });
// })

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