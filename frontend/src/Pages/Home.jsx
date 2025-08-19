import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // adjust path

const Home = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authorFilter, setAuthorFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const { token, role } = useContext(AuthContext);
  const isAdmin = role === "admin";

  useEffect(() => {
    axios.get("/api/authors").then((res) => setAuthors(res.data)).catch(console.error);
    axios.get("/api/book-genres").then((res) => setGenres(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    axios.get("/api/books").then((res) => setBooks(res.data.books || [])).catch(console.error);
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("/api/books", {
        params: {
          title: search,
          author: authorFilter || undefined,
          genre: genreFilter || undefined,
        },
      });
      setBooks(res.data.books || []);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      fetchBooks();
    }, 500);
    return () => clearTimeout(delayBounce);
  }, [search, authorFilter, genreFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete book.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📚 Book Collection</h1>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none w-full md:w-1/3 mb-3 md:mb-0"
          />

          <select
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Authors</option>
            {authors.map((author, idx) => (
              <option key={idx} value={author}>
                {author}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setGenreFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Genres</option>
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Add Book (Admin only) */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <Link to="/add">
              <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
                ➕ Add Book
              </button>
            </Link>
          </div>
        )}

        {/* Book List */}
        {books.length === 0 ? (
          <p className="text-gray-500">No books found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
              >
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                <p className="text-gray-600">👤 {book.author}</p>
                <p className="text-gray-600">📖 {book.genre}</p>
                <p className="text-gray-800 font-medium mt-2">${book.price}</p>
                <p className="text-sm text-gray-500">Published: {book.publisher_year}</p>
                <p className="text-sm text-gray-500">Publisher: {book.publisher}</p>
                <p className="text-sm text-gray-500">Pages: {book.pages}</p>
                <p className="text-gray-700 mt-2">{book.description}</p>

                <a
                  href={book.buy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 block"
                >
                  Buy this book →
                </a>

                {isAdmin && (
                  <div className="flex space-x-2 mt-4">
                    <Link to={`/edit/${book._id}`}>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
