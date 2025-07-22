// // src/pages/DeleeteBooks.jsx

// import React, { useState, useEffect } from 'react';
// import useAuth from '../hooks/useAuth';

// // Define your backend API base URL
// const API_BASE_URL = 'http://localhost:5000/api/books';

// const DeleeteBooks = () => {
//   const { auth } = useAuth(); // Get the auth object from useAuth
//   const [books, setBooks] = useState([]);
//   const [selectedBookId, setSelectedBookId] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });

//   // Debugging: Log auth state on component render
//   console.log('DeleeteBooks Render - Current auth state:', auth);
//   console.log('DeleeteBooks Render - auth.loading:', auth?.loading);
//   console.log('DeleeteBooks Render - auth.accessToken:', auth?.accessToken);

//   // Function to display messages to the user
//   const displayMessage = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => {
//       setMessage({ text: '', type: '' });
//     }, 5000);
//   };

//   // Function to fetch all books from the backend
//   const fetchBooks = async () => {
//     setLoading(true);
//     setMessage({ text: '', type: '' });

//     // Debugging: Check token right before fetch
//     console.log('fetchBooks function called. Access Token before fetch:', auth?.accessToken);

//     if (!auth?.accessToken) {
//       displayMessage('Authentication token not found. Please log in.', 'error');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch(API_BASE_URL, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${auth.accessToken}`,
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: response.statusText }));
//         throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message}`);
//       }
//       const data = await response.json();
//       setBooks(data);
//       if (data.length > 0) {
//         setSelectedBookId(data[0]._id);
//       } else {
//         setSelectedBookId('');
//         displayMessage('No books available to delete.', 'info');
//       }
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       displayMessage(`Failed to load books: ${error.message}`, 'error');
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Effect hook to fetch books when the component mounts or auth state changes
//   useEffect(() => {
//     // Debugging: Log useEffect trigger conditions
//     console.log('DeleeteBooks useEffect triggered. auth.loading:', auth?.loading, 'auth.accessToken:', auth?.accessToken);

//     // Only fetch books if authentication token is available and not in a loading state
//     if (!auth?.loading && auth?.accessToken) {
//       console.log('DeleeteBooks useEffect: Conditions met to fetch books.');
//       fetchBooks();
//     } else if (!auth?.loading && !auth?.accessToken) {
//         // If not loading and no token, show message
//         console.log('DeleeteBooks useEffect: Not authenticated and not loading. Showing message.');
//         displayMessage('You must be logged in to view and delete books.', 'info');
//         setLoading(false);
//     }
//     // Note: If auth.loading is true, it means AuthContext is still determining the state.
//     // We wait for it to become false.
//   }, [auth?.loading, auth?.accessToken]); // Re-run when auth loading or token changes


//   // Handle dropdown selection change
//   const handleSelectChange = (event) => {
//     setSelectedBookId(event.target.value);
//   };

//   // Handle delete button click
//   const handleDelete = async () => {
//     if (!selectedBookId) {
//       displayMessage('Please select a book to delete.', 'info');
//       return;
//     }

//     const confirmation = window.confirm('Are you sure you want to delete this book? This action cannot be undone.');
//     if (!confirmation) {
//       return;
//     }

//     setDeleting(true);
//     displayMessage('Deleting book...', 'info');

//     // Debugging: Check token right before delete fetch
//     console.log('handleDelete function called. Access Token before delete fetch:', auth?.accessToken);

//     if (!auth?.accessToken) {
//       displayMessage('Authentication token not found. Please log in.', 'error');
//       setDeleting(false);
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/${selectedBookId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${auth.accessToken}`,
//         },
//       });

//       if (response.status === 204) {
//         displayMessage('Book deleted successfully!', 'success');
//         await fetchBooks(); // Re-fetch books to update the dropdown
//       } else {
//         const errorData = await response.json().catch(() => ({ message: response.statusText }));
//         displayMessage(`Failed to delete book: ${errorData.message || response.statusText}. Status: ${response.status}`, 'error');
//       }
//     } catch (error) {
//       console.error('Error deleting book:', error);
//       displayMessage(`Network error or server unreachable: ${error.message}`, 'error');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const messageClass = message.type === 'success'
//     ? 'bg-green-100 text-green-800'
//     : message.type === 'error'
//       ? 'bg-red-100 text-red-800'
//       : 'bg-blue-100 text-blue-800';

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Delete a Book</h2>

//         {loading ? (
//           <div className="flex justify-center items-center mb-4 text-gray-600">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></div>
//             <span>Loading books...</span>
//           </div>
//         ) : (
//           <>
//             <label htmlFor="book-select" className="block text-left text-gray-700 text-sm font-bold mb-2">
//               Select Book to Delete:
//             </label>
//             <select
//               id="book-select"
//               className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//               value={selectedBookId}
//               onChange={handleSelectChange}
//               disabled={books.length === 0 || deleting || !auth?.accessToken}
//             >
//               {books.length === 0 ? (
//                 <option value="">No books available</option>
//               ) : (
//                 books.map((book) => (
//                   <option key={book._id} value={book._id}>
//                     {book.title} (by {book.author || 'Unknown'})
//                   </option>
//                 ))
//               )}
//             </select>

//             <button
//               onClick={handleDelete}
//               className={`w-full py-3 px-6 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out shadow-md hover:shadow-lg
//                 ${deleting || books.length === 0 || !auth?.accessToken
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
//                 }`}
//               disabled={deleting || books.length === 0 || !auth?.accessToken}
//             >
//               {deleting ? 'Deleting...' : 'Delete Selected Book'}
//             </button>
//           </>
//         )}

//         {message.text && (
//           <div className={`mt-6 p-3 rounded-lg text-sm ${messageClass}`}>
//             {message.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeleeteBooks;



// src/pages/DeleeteBooks.jsx

import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const API_BASE_URL = 'http://localhost:5000/api/books';

const DeleeteBooks = () => {
  const { auth } = useAuth();
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  console.log('DeleeteBooks Render - Current auth state:', auth);
  console.log('DeleeteBooks Render - auth.loading:', auth?.loading);
  console.log('DeleeteBooks Render - auth.accessToken:', auth?.accessToken);

  const displayMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 5000);
  };

  const fetchBooks = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    console.log('fetchBooks function called. Access Token before fetch:', auth?.accessToken);

    if (!auth?.accessToken) {
      displayMessage('Authentication token not found. Please log in.', 'error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message}`);
      }

      const data = await response.json();
      setBooks(data);

      if (data.length > 0) {
        setSelectedBookId(data[0]._id);
      } else {
        setSelectedBookId('');
        displayMessage('No books available to delete.', 'info');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      displayMessage(`Failed to load books: ${error.message}`, 'error');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('DeleeteBooks useEffect triggered. auth.loading:', auth?.loading, 'auth.accessToken:', auth?.accessToken);

    if (!auth?.loading && auth?.accessToken) {
      console.log('DeleeteBooks useEffect: Conditions met to fetch books.');
      fetchBooks();
    } else if (!auth?.loading && !auth?.accessToken) {
      console.log('DeleeteBooks useEffect: Not authenticated and not loading. Showing message.');
      displayMessage('You must be logged in to view and delete books.', 'info');
      setLoading(false);
    }
  }, [auth?.loading, auth?.accessToken]);

  const handleSelectChange = (event) => {
    setSelectedBookId(event.target.value);
  };

  const handleDelete = async () => {
    if (!selectedBookId) {
      displayMessage('Please select a book to delete.', 'info');
      return;
    }

    const confirmation = window.confirm('Are you sure you want to delete this book? This action cannot be undone.');
    if (!confirmation) return;

    setDeleting(true);
    displayMessage('Deleting book...', 'info');

    console.log('handleDelete function called. Access Token before delete fetch:', auth?.accessToken);

    if (!auth?.accessToken) {
      displayMessage('Authentication token not found. Please log in.', 'error');
      setDeleting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${selectedBookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      });

      if (response.ok && (response.status === 200 || response.status === 204)) {
        displayMessage('Book deleted successfully!', 'success');
        await fetchBooks();
      } else {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        displayMessage(`Failed to delete book: ${errorData.message || response.statusText}. Status: ${response.status}`, 'error');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      displayMessage(`Network error or server unreachable: ${error.message}`, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const messageClass = message.type === 'success'
    ? 'bg-green-100 text-green-800'
    : message.type === 'error'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Delete a Book</h2>

        {loading ? (
          <div className="flex justify-center items-center mb-4 text-gray-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></div>
            <span>Loading books...</span>
          </div>
        ) : (
          <>
            <label htmlFor="book-select" className="block text-left text-gray-700 text-sm font-bold mb-2">
              Select Book to Delete:
            </label>
            <select
              id="book-select"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={selectedBookId}
              onChange={handleSelectChange}
              disabled={books.length === 0 || deleting || !auth?.accessToken}
            >
              {books.length === 0 ? (
                <option value="">No books available</option>
              ) : (
                books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title} (by {book.author || 'Unknown'})
                  </option>
                ))
              )}
            </select>

            <button
              onClick={handleDelete}
              className={`w-full py-3 px-6 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out shadow-md hover:shadow-lg
                ${deleting || books.length === 0 || !auth?.accessToken
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-black focus:ring-red-500'
                }`}
              disabled={deleting || books.length === 0 || !auth?.accessToken}
            >
              {deleting ? 'Deleting...' : 'Delete Selected Book'}
            </button>
          </>
        )}

        {message.text && (
          <div className={`mt-6 p-3 rounded-lg text-sm ${messageClass}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleeteBooks;
