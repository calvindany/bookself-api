const { nanoid } = require('nanoid');
const Books = require('./books');

exports.addBook = (request, h) => {
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    if( readPage > pageCount ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);

        return response;
    }

    if( name == undefined ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);

        return response;
    }


    const id = nanoid(16);
    const finished = (pageCount === readPage) ? true  : false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBooks = {
        id,
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount,
        readPage, 
        finished,
        reading, 
        insertedAt, 
        updatedAt
    }

    Books.push(newBooks);

    const isSuccess = Books.filter( (book) => book.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
        response.code(201);
        
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });
    response.code(404);

    return response;
}

exports.getBooks = (request, h) => {
    
    if(Books.length > 0){
        const response = h.response({
            status: 'success',
            data: {
                books: Books,
            }
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            books: [],
        }
    });

    response.code(200);
    return response;
}

exports.getBooksById = (request, h) => {
    const { bookId } = request.params;

    const book = Books.filter( (book) => book.id === bookId )[0];

    if(book){
        const response = h.response({
            status: 'success',
            data: {
                book,
            }
        })
        response.code(200);

        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);

    return response;
}

exports.updateBookById = (request, h) => {
    const { bookId } = request.params;
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    if(!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);

        return response;
    } else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);

        return response;
    }

    const selectedBookIndex = Books.findIndex((book) => book.id === bookId);
    
    if(selectedBookIndex !== -1){
        Books[selectedBookIndex] = {
            ...Books[selectedBookIndex],
            name, 
            year, 
            author, 
            summary, 
            publisher,
            pageCount,
            readPage,
            reading,
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);

        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    
    return response;
}