const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        minlength: 2,
    },

    author: {
        type: String,
        required: [true, 'Author is required'],
        minlength: 5,
    },

    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },

    review: {
        type: String,
        required: [true, 'Review is required'],
        minlength: 10
    },

    genre: {
        type: String,
        required: [true, 'Need to specify genre'],
        minlength: 3
    },

    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please give your raiting']
    },

    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;