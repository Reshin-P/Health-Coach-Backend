import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../model/userSchema.js";
import { decode } from "jsonwebtoken";
import Trainer from '../model/trainerSchema.js'


const protect = AsyncHandler(async (req, res, next) => {
    console.log("Reached User Auth Middleware");


    console.log(req.headers.authorization);

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')

            if (req.user.isBlocked) {
                res.status(403)
                throw new Error("User Blocked")
            }
            console.log(" User Auth Middleware PASSED");
            next()
        } catch (error) {
            console.log(" User Auth Middleware FAILED");

            res.status(401)
            throw new Error('Not Authorized token failed')

        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized no token")
    }

})






const protectTrainers = AsyncHandler(async (req, res, next) => {
    console.log("reached trainer middleware");
    let token
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.trainer = await Trainer.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No Authorised Traines")
    }
})

export { protect, protectTrainers }