const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
});

const comment = mongoose.models.comment || mongoose.model('comment', commentSchema);
module.exports = comment