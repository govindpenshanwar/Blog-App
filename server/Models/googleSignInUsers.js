const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    }
}, { timestamps: true });

const OAuthUsers = mongoose.models.OAuthUsers || mongoose.model('OAuthUsers', userSchema);

module.exports = OAuthUsers;