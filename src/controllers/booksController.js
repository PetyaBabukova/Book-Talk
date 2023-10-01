const router = require('express').Router();
const booksManager = require('../managers/booksManager');
const Book = require('../models/Book');
const { getErrorMessage } = require('../utils/errorHelpers');


router.get('/', async (req, res) => {

    await booksManager.getAll().lean()
        .then((books) => {
            res.render('books', { books })
        });

});

router.get('/create', (req, res) => {
    res.render('books/create');
});

router.post('/create', async (req, res) => {
    const bookData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await booksManager.create(bookData)
            .then(() => res.redirect('/books'))

    } catch (error) {
        res.render('books/create', {
            error: getErrorMessage(error),  // Fixed the error variable name
            data: bookData  // Sending the entered data back to the view
        });
    }
});


router.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await booksManager.getOne(bookId).lean();

    if (!book) {
        res.status(404).send("Book not found");
        return;
    }

    const stringifiedWishList = book.wishingList.map(id => id.toString());
    let hasWished = stringifiedWishList.includes(req.user?._id.toString());

    const isOwner = req.user?._id.toString() === book.owner._id.toString();
    const isLogged = Boolean(req.user);

    res.render('books/details', { book, isOwner, isLogged, hasWished });
});


router.get('/:bookId/wish', async (req, res) => {
    const bookId = req.params.bookId;
    const user = req.user;
    const book = await booksManager.getOne(bookId).lean();

    const isOwner = req.user?._id.toString() === book.owner._id.toString();
    const isLogged = Boolean(req.user);

    if (isLogged && !isOwner) {
        try {
            await booksManager.wish(bookId, user._id);
            res.redirect(`/books/${bookId}/details`);
        } catch (err) {
            res.render('books/details', {
                error: 'You cannot add this book to the wishlist',
                isOwner,
                isLogged,
            });
        }
    } else {
        res.redirect(`/books/${bookId}/details`);
    }
});

router.get('/:bookId/delete', async (req, res) => {

    try {
        const bookId = req.params.bookId;
        await booksManager.delete(bookId);
        res.redirect('/books')

    } catch (error) {
        res.redirect(`/books/${bookId}/details`, { error: 'Unsuccessful deletion' })
    }

})

router.get('/:bookId/edit', async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const book = await booksManager.getOne(bookId).lean();
        res.render('books/edit', { book })

    } catch (error) {
        res.render('/404')
    }
});

router.post('/:bookId/edit', async (req, res) =>{
    const bookId = req.params.bookId;
    const bookData = req.body

    try {
        const book = await booksManager.edit(bookId, bookData);
        res.redirect('/books');
    } catch (error) {
        res.render('books/edit', { error: 'Unable to update book', ...bookData })
    }

})




module.exports = router;
