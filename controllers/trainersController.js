
import asyncHandler from "express-async-handler";
import trainers from "./trainers.js";
import Trainer from '../model/trainerSchema.js'
import generateToken from '../util/generateToken.js'
import Subscribe from "../model/SubcribeModel.js";
import mongoose from "mongoose";




//@desc Get All Trainers
//@route GET /api/traienrs
//@access Public

const getFamousTrainors = asyncHandler(async (req, res) => {
    res.json(trainers)
})


//@desc Signup trainers
//@route GET /api/programs
//@access Public

const SignupTrainers = asyncHandler(async (req, res) => {
    let {
        name,
        username,
        email,
        password,
        phone,
        certifications,
        streams
    } = req.body
    const trainerEmail = await Trainer.findOne({ email: email })
    if (trainerEmail) {
        res.status(400)
        throw new Error("Email Id Already Used")
    }
    const trainerUsername = await Trainer.findOne({ username: username })

    if (trainerUsername) {
        res.status(400)
        throw new Error('Username Already used')
    }
    const trainer = await Trainer.create({
        name,
        username,
        email,
        phone,
        password,
        certifications,
        streams
    })
    if (trainer) {
        res.status(201).json({
            id: trainer._id,
            name: trainer.name,
            email: trainer.email,
            token: generateToken(trainer._id)
        })
    }
})


//@desc Post Auth-Trainer
//@route GET /api/trainerlogin
//@access Public



const authtrainer = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(password);
    const trainer = await Trainer.findOne({ username: username })
    if (trainer && (await trainer.matchPassword(password))) {
        console.log("passed");
        if (trainer.isBlocked) {
            res.status(401)
            throw new Error("Account Blocked")
        }
        if (trainer.isAccept) {
            res.status(401)
            throw new Error("Admin not  aprooved ")
        }
        res.json({
            _id: trainer._id,
            name: trainer.name,
            username: trainer.username,
            email: trainer.email,
            phone: trainer.phone,
            certifications: trainer.certifications,
            streams: trainer.streams,
            token: generateToken(trainer._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Username or Password")
    }

})


const getUser = asyncHandler(async (req, res) => {
    req.params.id = mongoose.Types.ObjectId(req.params.id)
    console.log(req.params.id);

    let user = await Subscribe.find({ "workout.trainerid": req.params.id })
    console.log(user);
    if (user.length != 0) {

        res.json(user)
    }
    else {
        throw new Error("No user purchased workouts")
    }
})


const userWorkouts = asyncHandler(async (req, res) => {
    console.log("hitted user workouts");
    console.log(req.trainer._id);
    const data = await Subscribe.find({ $and: [{ user: req.params.id }, { "workout.trainerid": req.trainer._id }] })
    console.log(data);
    if (data.length == 0) {
        throw new Error("No data found")
    }
    else {
        res.status(200).json(data)
    }
})

export {
    getFamousTrainors,
    SignupTrainers,
    authtrainer,
    getUser,
    userWorkouts
}

