import asyncHandler from 'express-async-handler'
import sample from './sample.js'
import Program from '../model/programModel.js'




const getallprograms=asyncHandler(async(req,res)=>{
  
    const sample=await Program.find()

    res.json(sample)
    
})


export{getallprograms}