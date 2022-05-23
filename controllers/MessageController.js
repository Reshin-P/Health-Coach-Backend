import asyncHandler from "express-async-handler";
import Message from '../model/MessageModel.js'
import User from '../model/userSchema.js'
import Trainer from '../model/trainerSchema.js'


// @desc Post  Add Messages
// @route Post /api/message
// @access Trainer User
const addMessages = asyncHandler(async (req, res) => {
    const { text, sender, conversationId } = req.body
    try {
        const savedMessage = await Message.create({
            text,
            sender,
            conversationId
        })
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }

})


// @desc Get  Get Message
// @route GET /api/message
// @access Trainer User

const getMessages = asyncHandler(async (req, res) => {

    try {
        const messages = await Message.find({
            conversationId: req.params.id

        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error);
        throw new Error('Get Messages Errors')

    }
})



// @desc Post  Add Programs
// @route Post /api/programs
// @access Admin

const getReceiver = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {

        res.json(user).status(200)
    }
    else {
        const data = await Trainer.findById(req.params.id)

        if (data) {

            res.json(data).status(200)
        }
        else {
            throw new Error("not reciever found")

        }
    }
})
export {
    getReceiver,
    addMessages,
    getMessages
}