const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.wish = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    if (!book.wishingList.includes(userId.toString())) {
        book.wishingList.push(userId);
        await book.save();
    }
    return book;
};

exports.delete = (bookId,) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);
