import React, { useState } from 'react';
import {Form, Button, FormGroup} from 'react-bootstrap'
import { v4 as uuidv4} from 'uuid'; //"universal unique identifier generator, current version 4"

const Bookform = (props) => {
    const [book, setBook] = useState({
        bookname: props.book ? props.book.bookname : '',
        author: props.book ? props.book.author : '',
        quantity: props.book ? props.book.quantity : '',
        price: props.book ? props.book.price : '',
        date: props.book ? props.book.date : ''
    });
    
    const [errorMsg, setErrorMsg] = useState('');
    const {bookname, author, price, quantity} = book;

    const handleOnSubmit = (event) => {
        event.preventDefault();//prevent reload on submit
        const values = [bookname, author, price, quantity];
        let errorMsg = '';
        //check if all fields are filled, disallowing submit if emptyfields present
        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !==0; //return values not equal to 0 or undefined 
        });
        //if all fields are filled, create a book object assigned a unique identifier
        if (allFieldsFilled) {
            const book = {
                id: uuidv4(),
                bookname,
                author,
                price,
                quantity,
                date: new Date()
            };
            props.handleOnSubmit(book);
        } else {
            errorMsg = 'Please fill out all fields.';
        }
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        switch (name) {
            case 'quantity'://prevent decimal numbers. Can't have 0.37 of a book
                if (value === '' || parseInt(value) === +value){
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            case 'price'://acept decimals to 2 plages using Regular Expresions. 
                if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            default:
                setBook((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };

    return (
        <div className="main-form">
            _{errorMsg && <p className='errorMsg'>{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control 
                        className="input-control"
                        type="text"
                        name="bookname"
                        value={bookname}
                        placeholder="Enter book name"
                        onChange={handleInputChange}
                        /> 
                </Form.Group>
                <FormGroup controlId="author">
                    <Form.Label>Book Author</Form.Label>
                    <Form.Control 
                        className="input-control"
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Enter author name"
                        onChange={handleInputChange}
                       />
                   </FormGroup>
                    <FormGroup controlId="quantity">
                        <Form.Control
                        className="input-control"
                        type="number"
                        name="quantity"
                        value={quantity}
                        placeholder="Enter Available quantity"
                        onChange={handleInputChange}
                        />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control 
                    className="input-control"
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Enter book price"
                    onChange={handleInputChange}
                    />
                </FormGroup>
                <Button variant="primary" type="submit" className="submit-btn">
                    submit
                </Button>
            </Form>
        </div>
    );
}

export default Bookform