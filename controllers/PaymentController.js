import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid';
import Subscribe from "../model/SubcribeModel.js";

const stripe = new Stripe('sk_test_51KuA1JSAlmynsLgOtQ8ZniN3WbpdovC9Mc8DnXrmEEkEWr4ustHLXsMdU7uLstuWa192gy75sIfiPa5QFBpSfLG400UhgGiNnn');


const payment = asyncHandler(async (req, res) => {

    try {
        const { item, paymentdetails } = req.body
        item.price = parseInt(item.price)

        const data = await Subscribe.create({
            user: req.user._id,
            paymentdetails: {
                description: paymentdetails.paymentMethodData.description,
                type: paymentdetails.paymentMethodData.type,
                info: paymentdetails.paymentMethodData.info
            },
            workout: item
        })
        res.json({ data }).status(200)

    } catch (error) {
        throw new Error("something went wrong")
    }




})

export {
    payment
}