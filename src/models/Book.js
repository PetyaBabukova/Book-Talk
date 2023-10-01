const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    review: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true,
    },

    stars: {
        type: Number,
        min: 1,
        max: 5,
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