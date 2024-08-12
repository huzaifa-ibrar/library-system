import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
  });
  const [editingBook, setEditingBook] = useState(null);

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

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await handleUpdateBook();
      return;
    }
    try {
      const response = await axios.post('/api/books', newBook);
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '', isbn: '' });
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
    });
  };

  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(`/api/books/${editingBook._id}`, newBook);
      setBooks(
        books.map((book) =>
          book._id === editingBook._id ? response.data : book
        )
      );
      setNewBook({ title: '', author: '', isbn: '' });
      setEditingBook(null);
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Library Management System</h1>

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

      <form onSubmit={handleAddBook} className="my-4">
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              value={newBook.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              name="author"
              value={newBook.author}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              name="isbn"
              value={newBook.isbn}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEditBook(book)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
