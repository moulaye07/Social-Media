const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
        ConversationId: {
            type: String,
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('Message', MessageSchema);