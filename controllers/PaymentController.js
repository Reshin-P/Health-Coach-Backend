import asyncHandler from "express-async-handler";
import Stripe from 'stripe'
import { v4 as uuidv4 } from 'uuid';
import Subscribe from "../model/SubcribeModel.js";

const stripe = new Stripe('sk_test_51KuA1JSAlmynsLgOtQ8ZniN3WbpdovC9Mc8DnXrmEEkEWr4ustHLXsMdU7uLstuWa192gy75sIfiPa5QFBpSfLG400UhgGiNnn');


const payment = asyncHandler(async (req, res) => {
    console.log("payment");
    console.log("======================================");
    console.log(req.body.item);
    console.log(req.user);
    console.log("======================================");

    try {
        console.log("tyry");
        const { item, token } = req.body
        console.log("tyry");

        item.price = parseInt(item.price)
        console.log(item.price);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: item.price,
            currency: "inr",

            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log(paymentIntent);

        const data = Subscribe.create({
            user: req.user._id,
            workout: req.body.item
        })
        res.json({ data }).status(200)

    } catch (error) {

    }


    // try {
    //     const { item, token } = req.body
    //     item.price = parseInt(item.price)
    //     console.log(item.price);
    //     console.log("try");;
    //     const customer = await stripe.customers.create({
    //         email: token.email,
    //         source: token.id,
    //     });
    //     console.log("customer created");;

    //     const idempotencyKey = uuidv4();
    //     const charge = await stripe.charges.create(
    //         {
    //             amount: item.price * 100,
    //             currency: "inr",
    //             customer: customer.id,
    //             receipt_email: token.email,
    //             description: `Purchased the ${item.workout}`

    //         },
    //         {
    //             idempotencyKey,
    //         }
    //     );
    //     console.log("Charge:", { charge });

    // } catch (error) {
    //     console.error("Error:", error);
    // }
    // try {
    //     console.log("try");
    //     // await stripe.charges.create({
    //     //     source: token.id,
    //     //     amount: item.price,
    //     //     currency: 'usd'
    //     // })
    //     const paymentIntent = await stripe.paymentIntents.create({
    //         amount: item.price * 100,
    //         currency: "inr",
    //         automatic_payment_methods: {
    //             enabled: true,
    //         },
    //     });
    //     console.log(paymentIntent);
    //     if (paymentIntent) {
    //         res.json(200).json("Payment sucess")
    //     }

    // } catch (error) {
    //     throw new Error("payment error")

    // }

})

export {
    payment
}