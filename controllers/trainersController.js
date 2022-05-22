
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

    try {
        const trainers = await Trainer.find()
        res.status(200).json(trainers)
    } catch (error) {
        throw new Error("database error")
    }

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
        streams,
        about
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
        streams,
        about
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
    const trainer = await Trainer.findOne({ username: username })
    if (trainer && (await trainer.matchPassword(password))) {
        if (trainer.isBlocked) {
            res.status(401)
            throw new Error("Account Blocked")
        }
        if (!trainer.isAccept) {
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
            about: trainer.about,
            profilephoto: trainer.profilephoto,
            token: generateToken(trainer._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Username or Password")
    }

})


const getUser = asyncHandler(async (req, res) => {
    console.log("reachhhhhhhhhed");
    console.log(req.params.id);

    console.log(req.params.id);
    let user = await Subscribe.find({ "workout.trainerid": req.params.id }).populate("user", "name email age phone")
    // let user = await Subscribe.find({ "workout.trainerid": req.params.id }).populate("user", "name email age phone")


    console.log(user);
    console.log("--------------------------------");
    if (user.length != 0) {

        res.json(user)
    }
    else {
        throw new Error("No user purchased workouts")
    }
})


const userWorkouts = asyncHandler(async (req, res) => {

    const data = await Subscribe.find({ $and: [{ user: req.params.id }, { "workout.trainerid": req.trainer._id }] })
    if (data.length == 0) {
        throw new Error("No data found")
    }
    else {
        res.status(200).json(data)
    }
})



const uploadtrainerPhoto = asyncHandler(async (req, res) => {

    try {
        const trainer = await Trainer.findById(req.trainer._id)
        trainer.profilephoto = req.file.path
        await trainer.save()

        res.json({
            _id: trainer._id,
            name: trainer.name,
            username: trainer.username,
            email: trainer.email,
            phone: trainer.phone,
            certifications: trainer.certifications,
            streams: trainer.streams,
            profilephoto: trainer.profilephoto,
            token: generateToken(trainer._id)
        })

    } catch (error) {
        throw new Error("user not found in database")
    }
})



const updateTrainer = asyncHandler(async (req, res) => {
    try {
        let trainer = await Trainer.findById(req.params.id)
        const { name, phone, email, streams, certificates, about } = req.body
        trainer.name = name
        trainer.phone = phone
        trainer.email = email
        trainer.streams = streams
        trainer.certificates = certificates
        trainer.about = about
        await trainer.save()
        res.json({
            _id: trainer._id,
            name: trainer.name,
            username: trainer.username,
            email: trainer.email,
            phone: trainer.phone,
            certifications: trainer.certifications,
            streams: trainer.streams,
            about: trainer.about,
            profilephoto: trainer.profilephoto,
            token: generateToken(trainer._id)
        })
    } catch (error) {
        throw new Error("Profile Updation Failed")
    }
})

//@desc Post Trainer
//@route GET /api/trainerlogin
//@access Public


const getSingleUser = asyncHandler(async (req, res) => {

    try {
        const trainer = await Trainer.findById(req.params.id)
        res.status(200).json(trainer)
    } catch (error) {

        throw new Error("No trainer found")
    }
})


export {
    getSingleUser,
    getFamousTrainors,
    SignupTrainers,
    authtrainer,
    getUser,
    userWorkouts,
    uploadtrainerPhoto,
    updateTrainer
}

