// // src/pages/Home.jsx
// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axiosInstance.get("/books");
//         console.log("Fetched books:", res.data); // ✅ Debug log
//         setBooks(res.data);
//       } catch (error) {
//         console.error("Error fetching books:", error.response?.data || error.message);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Books List</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
//               {book.coverImage && (
//                 <img
//                   src={`${import.meta.env.VITE_STATIC_URL}/uploads/${book.coverImage}`}
//                   alt={book.title}
//                   className="w-full h-48 object-cover"
//                 />
//               )}
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
//                 <p className="text-sm text-gray-600 mb-1">Author: {book.author}</p>
//                 <p className="text-sm text-gray-600 mb-1">Genre: {book.genre}</p>
//                 <p className="text-sm text-gray-600 mb-1">Price: ${book.price}</p>
//                 <p className="text-sm text-gray-800 mb-2">{book.description}</p>
//                 <Link
//                   to={`/book/${book._id}`}
//                   className="text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No books found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;






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
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Books List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                {book.coverImage && (
                  <img
                    src={`${import.meta.env.VITE_STATIC_URL}/uploads/${book.coverImage}`}
                    alt={book.title}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 truncate">{book.title}</h2>
                  <p className="text-md text-gray-600 mb-1">
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                  <p className="text-md text-gray-600 mb-1">
                    <span className="font-semibold">Genre:</span> {book.genre}
                  </p>
                  <p className="text-lg font-bold text-gray-800 mb-2">
                    <span className="text-gray-600 font-normal">Price:</span> ${book.price}
                  </p>
                  <p className="text-sm text-gray-800 mb-4 line-clamp-3">{book.description}</p>
                  <Link
                    to={`/book/${book._id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-64">
              <p className="text-xl text-gray-500">No books found. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;