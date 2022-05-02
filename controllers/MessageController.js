import asyncHandler from "express-async-handler";
import Message from '../model/MessageModel.js'


const addMessages = asyncHandler(async (req, res) => {
    const { text, sender, conversationId } = req.body
    try {
        console.log("try");
        const savedMessage = await Message.create({
            text,
            sender,
            conversationId
        })
        console.log(savedMessage);
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }

})

const getMessages = asyncHandler(async (req, res) => {
    console.log("reached here");
    console.log(req.params.id);
    try {
        const messages = await Message.find({
            conversationId: req.params.id

        })
        console.log(messages);
        res.status(200).json(messages)
    } catch (error) {

    }

})
export {
    addMessages,
    getMessages
}