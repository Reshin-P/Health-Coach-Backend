
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
            phone: user.phone,
            weight: user.weight,
            height: user.height,
            age: user.age,
            healthcondition: user.healthcondition,
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


const updataUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, phone, email, age, height, healthcondition } = req.body
    const user = await User.findById(req.params.id)
    if (!user) {
        throw new Error("no user found")
    }
    user.name = name
    user.phone = phone,
        user.email = email,
        user.age = age,
        user.height = height,
        user.healthcondition = healthcondition
    await user.save()
    res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        weight: user.weight,
        height: user.height,
        age: user.age,
        healthcondition: user.healthcondition,
        token: generateToken(user._id)

    })
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


const updateWeight = asyncHandler(async (req, res) => {

    console.log(req.params.id);
    console.log(req.body);
    console.log("reache d updare user page");
    const user = await User.findById(req.params.id)
    console.log(user);
    user.weight = req.body.weight
    user.save()
    console.log(user);
    console.log("updated");;
    res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        weight: user.weight,
        height: user.height,
        age: user.age,
        healthcondition: user.healthcondition,
        token: generateToken(user._id)

    })


})


export {
    signUp,
    authUser,
    getUserprofile,
    homepage,
    addworkout,
    updataUser,
    updateWeight
};

