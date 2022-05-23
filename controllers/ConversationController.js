import asynchandler from 'express-async-handler'
import Conversation from '../model/ConversationModel.js'
const makeMembers = ({ sender, receiver }) => [sender, receiver]



// @desc Post  Add conversation
// @route Post /api/conversations
// @access Public

const createConversation = asynchandler(async (req, res) => {

    const members = [req.body.user, req.body.trainer]

    const exist = await Conversation.findOne({ members: { $all: [req.body.sender, req.body.receiver] } })
    if (exist) {
        res.json(exist)
    } else {
        const data = await Conversation.create({
            members: makeMembers({
                sender: req.body.sender,
                receiver: req.body.receiver
            })
        })
        console.log("data", data);
        res.json(data)
    }

})




export {
    createConversation,

}