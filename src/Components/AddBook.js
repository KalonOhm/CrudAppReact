import React from 'react';
import BookForm from './BookForm';

const AddBook = () => {
    const handleOnSubmit = (book) => {
        console.log(book);
    };

    return(
        <>
            <BookForm handleOnSubmit={handleOnSubmit} />       
        </>
    );
}