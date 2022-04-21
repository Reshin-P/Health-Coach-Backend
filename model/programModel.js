import mongoose from "mongoose";


const programSchema = mongoose.Schema({
    programname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const Program = mongoose.model('Program', programSchema)


export default Program