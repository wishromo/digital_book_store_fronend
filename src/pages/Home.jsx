// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/books");
        console.log("Fetched books:", res.data); // ✅ Debug log
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error.response?.data || error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Books List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {book.coverImage && (
                <img
                  src={`http://localhost:5000/uploads/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
                <p className="text-sm text-gray-600 mb-1">Price: ${book.price}</p>
                <p className="text-sm text-gray-800 mb-2">{book.description}</p>
                <Link
                  to={`/book/${book._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
