
import asyncHandler from "express-async-handler";
import trainers from "./trainers.js";
import Trainer from '../model/trainerSchema.js'
import generateToken from '../util/generateToken.js'

const getFamousTrainors = asyncHandler(async (req, res) => {
    res.json(trainers)
})

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

const authtrainer = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const trainer = await Trainer.findOne({ username: username })
    console.log(trainer);
    console.log(password);
    if (trainer && trainer.matchPassword(password)) {
        console.log("iff  conditon");
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
        console.log("else");
        res.status(401)
        throw new Error("Invalid Username or Password")
    }

})





export { getFamousTrainors, SignupTrainers, authtrainer }

