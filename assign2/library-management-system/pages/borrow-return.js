import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BorrowReturn = () => {
  const [books, setBooks] = useState([]);
  const [userID, setUserID] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (bookID) => {
    try {
      const response = await axios.post('/api/transactions/borrow', { bookID, userID });
      if (response.data) {
        setMessage('Book borrowed successfully');
      }
    } catch (error) {
      setMessage('Failed to borrow book, it might already be borrowed.');
    }
  };

  const handleReturn = async (bookID) => {
    try {
      const response = await axios.post('/api/transactions/return', { bookID, userID });
      if (response.data) {
        setMessage('Book returned successfully');
      }
    } catch (error) {
      setMessage('Failed to return book. Please check the transaction.');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Borrow/Return a Book</h1>

      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/borrow-return" className="nav-link">Borrow/Return</Link>
          </li>
        </ul>
      </nav>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your User ID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
        />
      </div>
      <p>{message}</p>
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Borrow</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleBorrow(book._id)}
                >
                  Borrow
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleReturn(book._id)}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowReturn;
