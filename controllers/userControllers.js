
import asyncHandler from 'express-async-handler';
import Program from '../model/programModel.js';
import User from '../model/userSchema.js';
import generateToken from '../util/generateToken.js';


//@desc  Auth-user
//@route POST /api/user
//@access Public

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
            profilephoto: user.profilephoto,
            healthcondition: user.healthcondition,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("invalid email or password")
    }
})





const homepage = asyncHandler(async (req, res) => {
    const sample = await Program.find()
    res.json({ sample, trainers })
})


//@desc  Update-user    
//@route PUT /api/user/:id
//@access User


const updataUser = asyncHandler(async (req, res) => {
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


//@desc  Register-user
//@route POST /api/user/
//@access Public

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


//@desc  Update-Weight
//@route PUT /api/user/:id
//@access User



const updateWeight = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.weight = req.body.weight
        user.save()
        res.json("sucessfully updated").status(200)
    } else {
        throw new Error("update weight error")
    }

})
//Get Single user
//@route post /api/user/:id
//@access User


const getSingleUser = asyncHandler(async (req, res) => {
    let user = await User.findById(req.params.id)
    if (user) {
        res.status(200).json(user)
    }
    else {
        throw new Error("No User found")
    }
})

//@desc  Update-profile-photo
//@route patch /api/user/proflephoto
//@access User


const uploadPhoto = asyncHandler(async (req, res) => {

    try {
        const user = await User.findById(req.user._id)
        user.profilephoto = req.file.path
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            weight: user.weight,
            height: user.height,
            age: user.age,
            profilephoto: user.profilephoto,
            healthcondition: user.healthcondition,
            token: generateToken(user._id)
        })

    } catch (error) {
        throw new Error("user not found in database")
    }

})






const allUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    if (users) {
        res.status(200).json(users)
    } else {
        throw new Error("something went wrong")
    }
})



const test = asyncHandler(async (req, res) => {
    console.log("test");
    res.status(200).json({ message: "Api Working" })
})

export {
    allUsers,
    signUp,
    authUser,
    homepage,
    updataUser,
    updateWeight,
    getSingleUser,
    uploadPhoto,
    test
};

