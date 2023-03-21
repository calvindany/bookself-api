const { addBook, getBooks, getBooksById } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksById,
    }
]

module.exports = { routes };