const express = require("express");
const userRouter = express.Router();
const { body, validationResult } = require('express-validator');
const UserModel = require("../models/UserModel")


// Create a User Using POST Method on "/api/auth/createUser" . No Login is required
userRouter.post('/createUser', [
    body('name', 'Enter a Valid Name of Lenght at least 3').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Lenght should be atleast 5').isLength({ min: 5 }),
], async (req, res) => {
    // Validation Checks and Returning Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });
    }

    try {
        // Check weather the user with this email exixts already
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ error: "Sorry a User with this email already exists" })

        // Creating a New User //
        user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }

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

module.exports = userRouter; 