import asynchandler from 'express-async-handler'
import Conversation from '../model/ConversationModel.js'
const makeMembers = ({ user, trainer }) => [user, trainer]

const createConversation = asynchandler(async (req, res) => {
    const members = [req.body.user, req.body.trainer]



    const exist = await Conversation.exists({ members: { $all: [req.body.user, req.body.trainer] } })
    // const exist = await Conversation.findOne({ members: makeMembers({ user: req.body.user, trainer: req.body.trainer }) })
    if (exist) {
        res.json(exist)
    } else {
        const data = await Conversation.create({
            members: makeMembers({
                user: req.body.user,
                trainer: req.body.trainer
            })
        })
        res.json(data)
    }

})




export {
    createConversation,

}