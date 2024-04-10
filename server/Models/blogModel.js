const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    picture: String,
    categories: [String],
    username: String,
    createdDate: { type: Date }
});

const blog = mongoose.models.blogs || mongoose.model('blog', blogSchema);

module.exports = blog;