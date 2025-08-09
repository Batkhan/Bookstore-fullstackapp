import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const[search, setsearch] = useState('');

  useEffect(() => {
    axios.get('/api/books') 
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err);
      });
  }, []);

  const fetchbooks = async () => {
    try{
      const res1 = await axios.get(`/api/books?title=${search}`);
      setBooks(res1.data);
    }
    catch(err) {
      console.error('Error fetching books', err);
    }
  }

  useEffect(() => {
    fetchbooks();
  }, [search]);

  return (
    <div>
    <input type = "text"
    placeholder='Search books...'
    value={search}
    onChange={(e) => setsearch(e.target.value)}
    style={{ padding: '8px', margin: '10px 0', width: '300px' }}
    />
    <div style={{ padding: '20px' }}>
      <h1>Book Collection</h1>
      {books.length === 0 ? (
        <p>Loading books...</p>
      ) : (
        books.map((book) => (
          <div key={book._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '20px' }}>
            <h2>{book.title}</h2>
            <img
              src={book.image_url}
              alt={book.title}
              style={{ width: '150px', height: 'auto', display: 'block', marginBottom: '10px' }}
            />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p>{book.description}</p>
            <a href={book.buy_url} target="_blank" rel="noopener noreferrer">Buy this book</a>
          </div>
        ))
      )}
    </div>
  </div>
  );
};

export default Home;
