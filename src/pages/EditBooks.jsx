// import { useEffect, useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate, useParams } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import axiosInstance from '../utils/AxiosInstance';

// const EditBook = () => {
//   const { id } = useParams();
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // ✅ Only admins can access this page
//   if (auth?.auth?.user?.role !== 'admin') {
//     return <div className="text-red-500 text-center mt-8">Unauthorized: Admins only</div>;
//   }

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       author: '',
//       description: '',
//       image: '',
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       author: Yup.string().required('Author is required'),
//       description: Yup.string().required('Description is required'),
//       image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         await axiosInstance.put(`${import.meta.env.VITE_API_URL}/api/books/${id}`, values, {
//           headers: {
//             Authorization: `Bearer ${auth?.auth?.accessToken}`,
//           },
//         });
//         navigate('/books');
//       } catch (error) {
//         console.error('Error updating book:', error.message);
//       }
//     },
//   });

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
//         const { title, author, description, image } = res.data;
//         formik.setValues({ title, author, description, image });
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching book:', error.message);
//         setLoading(false);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center mt-8">Loading book data...</div>;
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             name="title"
//             className="w-full border p-2 rounded"
//             {...formik.getFieldProps('title')}
//           />
//           {formik.touched.title && formik.errors.title && (
//             <p className="text-red-500 text-sm">{formik.errors.title}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-gray-700">Author</label>
//           <input
//             type="text"
//             name="author"
//             className="w-full border p-2 rounded"
//             {...formik.getFieldProps('author')}
//           />
//           {formik.touched.author && formik.errors.author && (
//             <p className="text-red-500 text-sm">{formik.errors.author}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             name="description"
//             className="w-full border p-2 rounded"
//             rows="3"
//             {...formik.getFieldProps('description')}
//           ></textarea>
//           {formik.touched.description && formik.errors.description && (
//             <p className="text-red-500 text-sm">{formik.errors.description}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-gray-700">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             className="w-full border p-2 rounded"
//             {...formik.getFieldProps('image')}
//           />
//           {formik.touched.image && formik.errors.image && (
//             <p className="text-red-500 text-sm">{formik.errors.image}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Update Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBook;



// src/pages/EditBook.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/AxiosInstance';
// import useAuth from '../hooks/useAuth'; // <-- Import useAuth

// const EditBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { auth } = useAuth(); // <-- Get auth context
//   const [bookData, setBookData] = useState({
//     title: '',
//     author: '',
//     description: '',
//     genre: '',
//     price: '',
//     coverImage: '', // To store the existing image filename
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(true); // Added loading state

//   // ✅ IMPORTANT: Check for admin role first
//   if (auth?.loading) { // Render nothing or a loader while auth state is being determined
//     return <div className="text-center mt-8">Loading authentication...</div>;
//   }

//   if (auth?.user?.role !== 'admin') { // Check if user is an admin
//     return <div className="text-red-500 text-center mt-8">Unauthorized: Admins only</div>;
//   }

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         // Correct URL and add Authorization header for GET request
//         const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
//           headers: {
//             Authorization: `Bearer ${auth?.accessToken}`, // Pass token for authentication
//           },
//         });
//         setBookData(res.data);
//         setLoading(false); // Data loaded
//       } catch (error) {
//         console.error('Error fetching book:', error.response?.data || error.message);
//         // Navigate away or show error if fetch fails (e.g., book not found, unauthorized)
//         alert('Failed to fetch book data. Check console for details.');
//         navigate('/books'); // Redirect back to book list
//         setLoading(false); // Stop loading
//       }
//     };
//     fetchBook();
//   }, [id, auth?.accessToken, navigate]); // Add auth.accessToken and navigate to dependencies

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     // Append all current bookData fields
//     for (const key in bookData) {
//         // Exclude coverImage if it's just the filename and not a new file
//         if (key === 'coverImage' && !file) {
//             continue; // Skip appending old coverImage if no new file is selected
//         }
//         formData.append(key, bookData[key]);
//     }
//     // Append the new file if one was selected
//     if (file) {
//       formData.append('coverImage', file); // Use 'coverImage' as expected by Multer
//     }

//     try {
//       // Ensure the correct PUT URL and Content-Type header
//       await axiosInstance.put(`${import.meta.env.VITE_API_URL}/books/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Essential for sending files
//           Authorization: `Bearer ${auth?.accessToken}`, // Pass token for authentication
//         },
//       });
//       navigate('/books');
//     } catch (error) {
//       console.error('Update failed:', error.response?.data || error.message);
//       alert('Failed to update book. Check console for details.');
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-8 text-black">Loading book data...</div>;
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold text-black mb-4">Edit Book</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 text-black">
//         <input
//           type="text"
//           name="title"
//           value={bookData.title}
//           onChange={handleChange}
//           placeholder="Title"
//           className="w-full border p-2 rounded text-gray-800"
//           required
//         />
//         <input
//           type="text"
//           name="author"
//           value={bookData.author}
//           onChange={handleChange}
//           placeholder="Author"
//           className="w-full border p-2 rounded text-gray-800"
//         />
//         <textarea
//           name="description"
//           value={bookData.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="w-full border p-2 rounded text-gray-800"
//         />
//         <input
//           type="text"
//           name="genre"
//           value={bookData.genre}
//           onChange={handleChange}
//           placeholder="Genre"
//           className="w-full border p-2 rounded text-gray-800"
//         />
//         <input
//           type="number"
//           name="price"
//           value={bookData.price}
//           onChange={handleChange}
//           placeholder="Price"
//           className="w-full border p-2 rounded text-gray-800"
//         />

//         {/* Display current image if available */}
//         {bookData.coverImage && (
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2">Current Cover Image:</label>
//             <img
//               src={`${import.meta.env.VITE_API_URL}/uploads/${bookData.coverImage}`}
//               alt="Current Cover"
//               className="w-32 h-32 object-cover rounded shadow"
//               onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
//             />
//           </div>
//         )}

//         <label className="block text-gray-700">Change Cover Image (optional)</label>
//         <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded text-gray-800"/>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Update Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBook;




// src/pages/EditBook.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useAuth from '../hooks/useAuth';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');

  const [currentCoverImage, setCurrentCoverImage] = useState('');
  const [currentBookPdf, setCurrentBookPdf] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [bookPdfFile, setBookPdfFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (auth?.loading) {
      setLoading(true);
      return;
    }

    if (auth?.user?.role !== 'admin') {
      setError('Unauthorized: Admins only. Redirecting to home...');
      setTimeout(() => navigate('/'), 2000);
      return;
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        const data = res.data;
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setDescription(data.description || '');
        setGenre(data.genre || '');
        setPrice(data.price || '');
        setCurrentCoverImage(data.coverImage || '');
        setCurrentBookPdf(data.bookpdf || '');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book:', err.response?.data || err.message);
        setError('Failed to fetch book data. Please try again.');
        setLoading(false);
      }
    };

    if (auth?.accessToken && !auth.loading) {
      fetchBook();
    } else if (!auth?.loading && !auth?.accessToken) {
      navigate('/login', { state: { from: window.location.pathname }, replace: true });
    }
  }, [id, auth?.accessToken, auth?.loading, auth?.user?.role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title': setTitle(value); break;
      case 'author': setAuthor(value); break;
      case 'description': setDescription(value); break;
      case 'genre': setGenre(value); break;
      case 'price': setPrice(value); break;
      default: break;
    }
  };

  const handleCoverImageChange = (e) => {
    setCoverImageFile(e.target.files[0]);
  };

  const handleBookPdfChange = (e) => {
    setBookPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('price', price);

    if (coverImageFile) {
      formData.append('coverImage', coverImageFile);
    }
    if (bookPdfFile) {
      formData.append('bookpdf', bookPdfFile);
    }

    try {
      await axiosInstance.put(`${import.meta.env.VITE_API_URL}/books/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setSuccess('Book updated successfully!');
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update book. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-black text-lg font-medium">Loading book data...</div>;
  }

  if (error && error.includes("Unauthorized")) {
    return <div className="text-red-600 text-center mt-8 text-lg font-medium">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black" encType="multipart/form-data">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700 text-sm font-bold mb-1">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="author" className="text-gray-700 text-sm font-bold mb-1">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full border p-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-700 text-sm font-bold mb-1">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded text-gray-800 h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="genre" className="text-gray-700 text-sm font-bold mb-1">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={genre}
              onChange={handleChange}
              placeholder="Genre"
              className="w-full border p-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 text-sm font-bold mb-1">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {currentCoverImage && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Current Cover Image:</label>
              <img
                src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${currentCoverImage}`}
                alt="Current Cover"
                className="w-32 h-32 object-cover rounded shadow border border-gray-200"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
              />
              <span className="text-gray-600 text-sm block mt-1">{currentCoverImage}</span>
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="coverImage" className="text-gray-700 text-sm font-bold mb-1">Change Cover Image (optional):</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleCoverImageChange}
              className="w-full border p-2 rounded text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
          </div>

          {currentBookPdf && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Current Book PDF:</label>
              <span className="text-gray-600 text-sm block">{currentBookPdf}</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/books/${id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-1 inline-block"
              >
                View Current PDF
              </a>
            </div>
          )}

          <div className="flex flex-col">
            <label htmlFor="bookpdf" className="text-gray-700 text-sm font-bold mb-1">Change Book PDF (optional):</label>
            <input
              type="file"
              id="bookpdf"
              name="bookpdf"
              onChange={handleBookPdfChange}
              className="w-full border p-2 rounded text-black-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="application/pdf"
            />
          </div>

          {error && <div className="text-red-600 text-center text-sm font-medium">{error}</div>}
          {success && <div className="text-green-600 text-center text-sm font-medium">{success}</div>}

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-black px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Book
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="bg-gray-500 text-black px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
