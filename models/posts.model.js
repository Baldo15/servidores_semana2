const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    text: {
        type: String,
        required: true,
        minlength: 10,
    },
    author: {
        type: String,
        required: true,
    },
}, { timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;