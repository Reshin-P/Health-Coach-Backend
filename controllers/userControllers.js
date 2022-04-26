
import asyncHandler from 'express-async-handler';
import Program from '../model/programModel.js';
import User from '../model/userSchema.js';
import generateToken from '../util/generateToken.js';



const authUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    if (user && (await user.matchPassword(password))) {
        if (user.isBlocked) {
            res.status(403)
            throw new Error("User Blocked")
        }
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(401)
        throw new Error("invalid email or password")
    }
})

const getUserprofile = asyncHandler(async (req, res) => {
    res.send("success")
})


const homepage = asyncHandler(async (req, res) => {
    const sample = await Program.find()
    res.json({ sample, trainers })
})














const signUp = asyncHandler(async (req, res) => {

    let { name, email, username,
        age,
        phone,
        height,
        weight,
        healthcondition,
        password } = req.body;
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('Email Id already Used')
    }
    const user = await User.create({
        name,
        username,
        email,
        age,
        phone,
        height,
        weight,
        healthcondition,
        password
    })

    if (user) {

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})


const addworkout = asyncHandler(async (req, res) => {

})



export {
    signUp,
    authUser,
    getUserprofile,
    homepage,
    addworkout
};
