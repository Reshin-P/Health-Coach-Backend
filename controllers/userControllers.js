
import asyncHandler from 'express-async-handler'
import User from '../model/userSchema.js'
import generateToken from '../util/generateToken.js';
import Program from '../model/programModel.js'



const authUser = asyncHandler(async (req, res) => {
    console.log(req.body);
  
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    console.log(user);

    
        
    if (user && (await user.matchPassword(password))) {
        if(user.isBlocked){
            res.status(403)
            throw new Error("User Blocked")
        }
        res.json({
            _id: user._id,
            name: user.name,
            username:user.username,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(401)
        throw new Error("invalid email or password")
    }
})


const getUserprofile = asyncHandler(async (req, res) => {
    console.log("profile");
    res.send("success")
})


const homepage=asyncHandler(async(req,res)=>{
    console.log("home page");
    const sample=await Program.find()
    res.json({sample,trainers})
})














const signUp = asyncHandler(async (req, res) => {
    console.log(req.body);
    console.log("----------------------");

    let { name, email,username,
        age,
        phone,
        height,
        weight,
        healthcondition,
        password } = req.body;
     


    console.log(email);
    const userExists = await User.findOne({ email })
    console.log('userExists', userExists);
    if (userExists) {
        console.log("userexixt null condition");
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
   



    console.log(user);
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






export {
    signUp,
    authUser,
    getUserprofile,
    homepage
}