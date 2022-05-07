import asyncHandler from "express-async-handler";
import Message from '../model/MessageModel.js'


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

const getMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id

        })
        res.status(200).json(messages)
    } catch (error) {

    }

})
export {
    addMessages,
    getMessages
}