import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../model/userSchema.js";
import { decode } from "jsonwebtoken";
import Trainer from '../model/trainerSchema.js'


const protect =AsyncHandler(async (req,res,next)=>{
    console.log("authorissation");

    let token
    console.log(req.headers.authorization);
    if(req.headers.authorization&&req.headers.authorization.startsWith('bearer')){
        console.log("token found");
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
          req.user=await User.findById(decoded.id).select('-password')
            next()
        }catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized token failed')

        }
    }



    if(!token){
        res.status(401)
        throw new Error("Not authorized no token")
    }
   
})






const protectTrainers=AsyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.trainer=await Trainer.findById(decoded._id).select('-password')
            console.log(req.rainer);
        }catch(error){
            console.log(error);
            res.status(401)
            throw new Error('Not Authorized token failed')
        }
    }

    if(!token){
        res.status(401)
        throw new Error("No Authorised Traines")
    }
})

export {protect}