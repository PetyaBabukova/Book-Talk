const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const booksController = require('./controllers/booksController');

router.use(homeController);
router.use('/users', userController);
router.use('/books', booksController);


// router.get('*', (req, res)=>{
//     res.redirect('/404')
// });

module.exports = router;