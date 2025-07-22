// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/AxiosInstance';
// import useAuth from '../hooks/useAuth';

// const BooksList = () => {
//   const [books, setBooks] = useState([]);
//   const auth = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books`);
//       setBooks(res.data);
//     } catch (err) {
//       console.error('Error fetching books:', err.message);
//     }
//   };

//   const handleDelete = async (bookId) => {
//     if (!window.confirm('Are you sure you want to delete this book?')) return;

//     try {
//       await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
//         headers: {
//           Authorization: `Bearer ${auth?.auth?.accessToken}`,
//         },
//       });
//       setBooks((prev) => prev.filter((book) => book._id !== bookId));
//     } catch (err) {
//       console.error('Error deleting book:', err.message);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <h2 className="text-2xl font-bold mb-6">Books</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <div key={book._id} className="bg-white shadow-md rounded p-4">
//             {book.coverImage && (
//               <img
//                 src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${book.coverImage}`}
//                 alt={book.title}
//                 className="w-full h-48 object-cover mb-2 rounded"
//                 onError={(e) => (e.target.src = '/default-cover.png')} // Optional fallback
//               />
//             )}
//             <h3 className="text-lg font-semibold">{book.title}</h3>
//             <p className="text-gray-600">Author: {book.author}</p>
//             <p className="text-gray-500 text-sm mb-2">Genre: {book.genre}</p>

//             {auth?.auth?.user?.role === 'admin' && (
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => navigate(`/books/edit/${book._id}`)}
//                   className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(book._id)}
//                   className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BooksList;




// src/components/BookList.jsx
// src/components/BookList.jsx

// src/pages/BooksList.jsx

// import { useEffect, useState, useCallback } from 'react'; // Added useCallback for fetchBooks
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/AxiosInstance';
// import useAuth from '../hooks/useAuth';

// const BooksList = () => {
//   console.log("BooksList component is rendering."); // LOG 1: Component start

//   const [books, setBooks] = useState([]);
//   const { auth } = useAuth(); // Destructure auth from useAuth hook
//   const navigate = useNavigate();

//   // State for loading books (separate from useAuth's loading)
//   const [booksLoading, setBooksLoading] = useState(true);
//   const [booksError, setBooksError] = useState(null);

//   // Function to fetch all books from the backend
//   const fetchBooks = useCallback(async () => {
//     console.log("fetchBooks function called."); // LOG 3: fetchBooks invoked
//     console.log("Current auth state in fetchBooks:", auth); // LOG 4: Check auth object here

//     setBooksLoading(true); // Start loading state for books
//     setBooksError(null);   // Clear previous errors

//     // Check for auth token before making the request
//     if (!auth?.accessToken) {
//       console.log("No access token found, skipping fetchBooks.");
//       setBooksError('Authentication token not found. Please log in.');
//       setBooksLoading(false);
//       return;
//     }

//     try {
//       const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books`, {
//         headers: {
//           Authorization: `Bearer ${auth.accessToken}`, // Use auth.accessToken directly
//         },
//       });
//       setBooks(res.data);
//       console.log("Books fetched successfully:", res.data); // LOG 5: Data received
//     } catch (err) {
//       console.error('Error fetching books in BooksList:', err); // LOG 6: Error object for detailed info
//       if (err.response) {
//         console.error('Error response data:', err.response.data);
//         console.error('Error response status:', err.response.status);
//       }
//       setBooksError('Failed to load books. Please try again.');
//     } finally {
//       setBooksLoading(false); // End loading state for books
//     }
//   }, [auth?.accessToken]); // Depend on auth.accessToken to re-fetch if auth state changes

//   useEffect(() => {
//     console.log("BooksList useEffect is running."); // LOG 2: useEffect triggered
//     // Ensure auth state is fully loaded before attempting to fetch
//     if (!auth?.loading) {
//         fetchBooks();
//     }
//     // If not authenticated after loading, redirect to login
//     if (!auth?.loading && !auth?.accessToken) {
//         navigate('/login', { state: { from: window.location.pathname }, replace: true });
//     }
//   }, [auth?.loading, auth?.accessToken, fetchBooks, navigate]); // Add auth.loading and fetchBooks to dependencies

//   // --- DELETE FUNCTIONALITY ADDED HERE ---
//   const handleDelete = async (bookId) => {
//     if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
//       return; // If user cancels, stop
//     }

//     try {
//       // Ensure the user is an admin before attempting to delete
//       if (auth?.user?.role !== 'admin') {
//         setBooksError('Unauthorized: Only admins can delete books.');
//         return;
//       }

//       console.log(`Attempting to delete book with ID: ${bookId}`);
//       await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
//         headers: {
//           Authorization: `Bearer ${auth?.accessToken}`,
//         },
//       });
//       console.log(`Book with ID ${bookId} deleted successfully.`);

//       // Update the local state to remove the deleted book without re-fetching all books
//       setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
//       setBooksError(null); // Clear any previous error message related to books
//     } catch (err) {
//       console.error('Error deleting book:', err.response?.data || err.message);
//       setBooksError(`Failed to delete book: ${err.response?.data?.message || err.message}`);
//     }
//   };
//   // --- END DELETE FUNCTIONALITY ---

//   console.log("Current books state (before render):", books); // LOG 7: books state before JSX render

//   // Function to handle navigation to BookDetailsPage
//   const handleViewDetails = (bookId) => {
//     console.log("handleViewDetails called for bookId:", bookId); // LOG 8: Button clicked
//     navigate(`/books/${bookId}`); // Navigate to the book detail page using the book's ID
//   };

//   // --- Loading, Error, and Empty State Handling ---
//   if (auth?.loading || booksLoading) {
//     return <div className="text-center mt-8 text-lg font-medium text-gray-700">Loading books...</div>;
//   }

//   if (booksError) {
//     return <div className="text-center mt-8 text-lg font-medium text-red-600">{booksError}</div>;
//   }

//   // If no books and auth is not loading and there's no specific booksError
//   if (books.length === 0 && !booksLoading && !booksError) {
//     return <div className="col-span-full text-center text-gray-600 text-lg py-10">No books found or loaded.</div>;
//   }


//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">Available Books</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.length > 0 ? ( // LOG 9: Check if books array has items before mapping
//           books.map((book) => (
//             <div key={book._id} className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
//               {console.log("Mapping book:", book.title, "ID:", book._id)} {/* LOG 10: Inside map loop */}
//               <div>
//                 {book.coverImage && (
//                   <img
//                     src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${book.coverImage}`}
//                     alt={book.title}
//                     className="w-full h-48 object-cover mb-2 rounded"
//                     onError={(e) => {
//                       console.error("Error loading cover image:", e.target.src);
//                       e.target.src = '/default-cover.png'; // Fallback image
//                     }}
//                   />
//                 )}
//                 <h3 className="text-lg font-semibold">{book.title}</h3>
//                 <p className="text-gray-600">Author: {book.author}</p>
//                 <p className="text-gray-500 text-sm mb-2">Genre: {book.genre}</p>
//               </div>

//               <div className="flex flex-col mt-4 space-y-2">
//                 {/* View Details button for ANY authenticated user */}
//                 {auth?.accessToken && ( // Check if any user is logged in (using direct accessToken from context)
//                     <button
//                         onClick={() => handleViewDetails(book._id)}
//                         className="bg-purple-600 text-bl px-3 py-1 rounded hover:bg-purple-700 w-full text-sm" // Changed text-black to text-white for visibility
//                     >
//                         View Details
//                     </button>
//                 )}

//                 {/* Admin-specific buttons: Edit, Delete */}
//                 {auth?.user?.role === 'admin' && ( // Check if user has admin role
//                     <div className="flex justify-between space-x-2 w-full">
//                         <button
//                             onClick={() => navigate(`/edit-book/${book._id}`)} {/* Corrected edit path, assuming it's /edit-book/:id */}
//                             className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 flex-1 text-sm" // Changed text-black to text-white
//                         >
//                             Edit
//                         </button>
//                         <button
//                             onClick={() => handleDelete(book._id)} // Call the new handleDelete function
//                             className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 flex-1 text-sm" // Changed text-black to text-white
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           // This block will now render when `books.length === 0` after `booksLoading` is false and no `booksError`
//           <div className="col-span-full text-center text-gray-600 text-lg py-10">
//             No books found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BooksList;





// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/AxiosInstance';
// import useAuth from '../hooks/useAuth';

// const BooksList = () => {
//   const { auth } = useAuth();
//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books`);
//         setBooks(res.data);
//       } catch (err) {
//         console.error('Error fetching books:', err);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/books/${id}`, {
//         headers: {
//           Authorization: `Bearer ${auth?.accessToken}`,
//         },
//       });

//       setBooks((prev) => prev.filter((book) => book._id !== id));
//     } catch (err) {
//       console.error('Error deleting book:', err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">All Books</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <div key={book._id} className="border rounded-lg shadow-md p-4 bg-white">
//             {book.coverImage && (
//               <img
//                 src={`${import.meta.env.VITE_API_URL}/${book.coverImage}`}
//                 alt={book.title}
//                 className="w-full h-40 object-cover rounded mb-3"
//               />
//             )}
//             <h2 className="text-xl font-semibold">{book.title}</h2>
//             <p className="text-sm text-gray-700">Author: {book.author}</p>
//             <p className="text-sm text-gray-600 mb-2">Genre: {book.genre}</p>
//             <p className="text-sm text-gray-600">{book.description}</p>
//             <p className="font-semibold mt-2">Price: ${book.price}</p>

//             {auth?.user?.role === 'admin' && (
//               <div className="mt-3 flex gap-2">
//                 {/* Corrected edit path, assuming it's /edit-book/:id */}
//                 <button
//                   onClick={() => navigate(`/edit-book/${book._id}`)}
//                   className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 flex-1 text-sm"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(book._id)}
//                   className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 flex-1 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BooksList;


// src/pages/BooksList.jsx

// src/pages/BooksList.jsx

// src/pages/BooksList.jsx

// src/pages/BooksList.jsx

import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useAuth from '../hooks/useAuth';

const BooksList = () => {
  console.log("BooksList component is rendering."); // LOG 1: Component start

  const [books, setBooks] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [booksLoading, setBooksLoading] = useState(true);
  const [booksError, setBooksError] = useState(null);

  const fetchBooks = useCallback(async () => {
    console.log("fetchBooks function called."); // LOG 3: fetchBooks invoked
    console.log("Current auth state in fetchBooks:", auth); // LOG 4: Check auth object here

    setBooksLoading(true);
    setBooksError(null);

    if (!auth?.accessToken) {
      console.log("No access token found, skipping fetchBooks.");
      setBooksError('Authentication token not found. Please log in.');
      setBooksLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setBooks(res.data);
      console.log("Books fetched successfully:", res.data); // LOG 5: Data received
    } catch (err) {
      console.error('Error fetching books in BooksList:', err); // LOG 6: Error object for detailed info
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      }
      setBooksError('Failed to load books. Please try again.');
    } finally {
      setBooksLoading(false);
    }
  }, [auth?.accessToken]);

  useEffect(() => {
    console.log("BooksList useEffect is running."); // LOG 2: useEffect triggered
    if (!auth?.loading) {
      fetchBooks();
    }
    if (!auth?.loading && !auth?.accessToken) {
      navigate('/login', { state: { from: window.location.pathname }, replace: true });
    }
  }, [auth?.loading, auth?.accessToken, fetchBooks, navigate]);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book? This action cannot be undone.")) {
      return;
    }

    try {
      if (auth?.user?.role !== 'admin') {
        setBooksError('Unauthorized: Only admins can delete books.');
        return;
      }

      console.log(`Attempting to delete book with ID: ${bookId}`);
      await axiosInstance.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      console.log(`Book with ID ${bookId} deleted successfully.`);

      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      setBooksError(null);
    } catch (err) {
      console.error('Error deleting book:', err.response?.data || err.message);
      setBooksError(`Failed to delete book: ${err.response?.data?.message || err.message}`);
    }
  };

  console.log("Current books state (before render):", books); // LOG 7: books state before JSX render

  const handleViewDetails = (bookId) => {
    console.log("handleViewDetails called for bookId:", bookId); // LOG 8: Button clicked
    navigate(`/book/${bookId}`);
  };

  if (auth?.loading || booksLoading) {
    return <div className="text-center mt-8 text-lg font-medium text-gray-700">Loading books...</div>;
  }

  if (booksError) {
    return <div className="text-center mt-8 text-lg font-medium text-red-600">{booksError}</div>;
  }

  if (books.length === 0 && !booksLoading && !booksError) {
    return <div className="col-span-full text-center text-gray-600 text-lg py-10">No books found or loaded.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
              {console.log("Mapping book:", book.title, "ID:", book._id)} {/* LOG 10: Inside map loop */}
              <div>
                {book.coverImage && (
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${book.coverImage}`}
                    alt={book.title}
                    className="w-full h-48 object-cover mb-2 rounded"
                    onError={(e) => {
                      console.error("Error loading cover image:", e.target.src);
                      e.target.src = '/default-cover.png';
                    }}
                  />
                )}
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-500 text-sm mb-2">Genre: {book.genre}</p>
              </div>

              <div className="flex flex-col mt-4 space-y-2">
                {auth?.accessToken && (
                  <button
                    onClick={() => handleViewDetails(book._id)}
                    className="bg-purple-600 text-black px-3 py-1 rounded hover:bg-purple-700 w-full text-sm"
                  >
                    View Details
                  </button>
                )}

                {auth?.user?.role === 'admin' && (
                  <div className="flex justify-between space-x-2 w-full">
                    {/* Corrected: Matches App.jsx route */}
                    <button
                      onClick={() => navigate(`/books/edit/${book._id}`)}
                      className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600 flex-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 flex-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 text-lg py-10">
            No books found.
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;
