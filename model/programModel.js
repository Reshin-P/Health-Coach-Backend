import mongoose from "mongoose";


const programSchema = mongoose.Schema({
    programname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: false
    }
},
    {
        timestamps: true
    })

const Program = mongoose.model('Program', programSchema)


export default Program