
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      console.log("API Response:", response.data);
      if (response.data && response.data.books && response.data.books.length > 0) {
        setBooks(response.data.books);
      } else {
        setError('No books found');
      }
    })
    .catch(error => {
      console.error("API Error:", error);
      if (error.response && error.response.status === 404) {
        setError('Error 404: Resource not found');
      } else {
        setError('An error occurred while fetching the data');
      }
    });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (books.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Books List</h1>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <img src={book.imageLinks && book.imageLinks.thumbnail} alt={book.title} />
          <p>{book.description}</p>
          <p>Authors: {book.authors && book.authors.join(', ')}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookList;
