import mongoose from "mongoose";


const bannerScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    titlecolor: {
        type: String,
        required: true
    },
    subtitlecolor: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const Banner = mongoose.model('banner', bannerScheme)


export default Banner