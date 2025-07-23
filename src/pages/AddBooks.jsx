// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import useAuth from '../hooks/useAuth';
// // import axiosInstance from '../utils/AxiosInstance';

// // const AddBook = () => {

// //   const { auth } = useAuth();
// //   const navigate = useNavigate();

// //   if (auth?.user?.role !== 'admin') {
// //     return <div className="text-red-500 text-center mt-8">Unauthorized: Admins only</div>;
// //   }

// //   const formik = useFormik({
// //     initialValues: {
// //       title: '',
// //       author: '',
// //       description: '',
// //       genre: '',
// //       price: '',
// //       coverImage: null, // for file
// //     },
// //     validationSchema: Yup.object({
// //       title: Yup.string().required('Title is required'),
// //       author: Yup.string().required('Author is required'),
// //       description: Yup.string().required('Description is required'),
// //       genre: Yup.string().required('Genre is required'),
// //       price: Yup.number().required('Price is required'),
// //     }),
// //     onSubmit: async (values, { resetForm }) => {
// //       try {
// //         const formData = new FormData();
// //         formData.append('title', values.title);
// //         formData.append('author', values.author);
// //         formData.append('description', values.description);
// //         formData.append('genre', values.genre);
// //         formData.append('price', values.price);
// //         formData.append('coverImage', values.coverImage);

// //         await axiosInstance.post(`${import.meta.env.VITE_API_URL}/books`, formData, {
// //           headers: {
// //             'Content-Type': 'multipart/form-data',
// //             Authorization: `Bearer ${auth?.accessToken}`,
// //           },
// //         });

// //         resetForm();
// //         navigate('/books');
// //       } catch (err) {
// //         console.error('Error adding book:', err);
// //       }
// //     },
// //   });

// //   return (
// //     <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
// //       <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
// //       <form onSubmit={formik.handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           name="title"
// //           placeholder="Title"
// //           onChange={formik.handleChange}
// //           value={formik.values.title}
// //           className="w-full border p-2 rounded"
// //         />
// //         <input
// //           type="text"
// //           name="author"
// //           placeholder="Author"
// //           onChange={formik.handleChange}
// //           value={formik.values.author}
// //           className="w-full border p-2 rounded"
// //         />
// //         <textarea
// //           name="description"
// //           placeholder="Description"
// //           onChange={formik.handleChange}
// //           value={formik.values.description}
// //           className="w-full border p-2 rounded"
// //         />
// //         <input
// //           type="text"
// //           name="genre"
// //           placeholder="Genre"
// //           onChange={formik.handleChange}
// //           value={formik.values.genre}
// //           className="w-full border p-2 rounded"
// //         />
// //         <input
// //           type="number"
// //           name="price"
// //           placeholder="Price"
// //           onChange={formik.handleChange}
// //           value={formik.values.price}
// //           className="w-full border p-2 rounded"
// //         />
// //         <input
// //           type="file"
// //           name="coverImage"
// //           accept="image/*"
// //           onChange={(event) => {
// //             formik.setFieldValue('coverImage', event.currentTarget.files[0]);
// //           }}
// //           className="w-full"
// //         />
// //         <input
// //         type="file"
// //         name="bookpdf"
// //         accept="pdf/*"
// //         onChange={(event)=>{
// //           formik.setValues
// //         }}/>

// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           Add Book
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddBook;






// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import axiosInstance from '../utils/AxiosInstance';

// const AddBook = () => {
//   const { auth } = useAuth();
//   const navigate = useNavigate();

//   if (auth?.user?.role !== 'admin') {
//     return <div className="text-red-500 text-center mt-8">Unauthorized: Admins only</div>;
//   }

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       author: '',
//       description: '',
//       genre: '',
//       price: '',
//       coverImage: null,
//       bookpdf: null,
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       author: Yup.string().required('Author is required'),
//       description: Yup.string().required('Description is required'),
//       genre: Yup.string().required('Genre is required'),
//       price: Yup.number().required('Price is required'),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const formData = new FormData();
//         formData.append('title', values.title);
//         formData.append('author', values.author);
//         formData.append('description', values.description);
//         formData.append('genre', values.genre);
//         formData.append('price', values.price);
//         formData.append('coverImage', values.coverImage);
//         if (values.bookpdf) {
//           formData.append('bookpdf', values.bookpdf);
//         }

//         await axiosInstance.post(`${import.meta.env.VITE_API_URL}/books`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${auth?.accessToken}`,
//           },
//         });

//         resetForm();
//         navigate('/books');
//       } catch (err) {
//         console.error('Error adding book:', err);
//       }
//     },
//   });

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           onChange={formik.handleChange}
//           value={formik.values.title}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           onChange={formik.handleChange}
//           value={formik.values.author}
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={formik.handleChange}
//           value={formik.values.description}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="genre"
//           placeholder="Genre"
//           onChange={formik.handleChange}
//           value={formik.values.genre}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           onChange={formik.handleChange}
//           value={formik.values.price}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="file"
//           name="coverImage"
//           accept="image/*"
//           onChange={(event) => {
//             formik.setFieldValue('coverImage', event.currentTarget.files[0]);
//           }}
//           className="w-full"
//         />
//         <input
//           type="file"
//           name="bookpdf"
//           accept="application/pdf"
//           onChange={(event) => {
//             formik.setFieldValue('bookpdf', event.currentTarget.files[0]);
//           }}
//           className="w-full"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Book
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;



import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../utils/AxiosInstance';

const AddBook = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth?.user?.role !== 'admin') {
    return <div className="text-red-500 text-center mt-8">Unauthorized: Admins only</div>;
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      description: '',
      genre: '',
      price: '',
      coverImage: null,
      bookpdf: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      author: Yup.string().required('Author is required'),
      description: Yup.string().required('Description is required'),
      genre: Yup.string().required('Genre is required'),
      price: Yup.number().required('Price is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('author', values.author);
        formData.append('description', values.description);
        formData.append('genre', values.genre);
        formData.append('price', values.price);
        formData.append('coverImage', values.coverImage);
        if (values.bookpdf) {
          formData.append('bookpdf', values.bookpdf);
        }

        await axiosInstance.post(`${import.meta.env.VITE_API_URL}/books`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        resetForm();
        navigate('/books');
      } catch (err) {
        console.error('Error adding book:', err);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={formik.handleChange}
            value={formik.values.author}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            onChange={formik.handleChange}
            value={formik.values.genre}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="w-full border p-2 rounded"
          />
          <p>Cover Image:</p>
          <input
            type="file"
            name="coverImage"
            placeholder="Cover Image"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('coverImage', event.currentTarget.files[0]);
            }}
            className="w-full"
          />
          <p>Book Pdf:</p>
          <input
            type="file"
            name="bookpdf"
            placeholder='BookPdf'
            accept="application/pdf"
            onChange={(event) => {
              formik.setFieldValue('bookpdf', event.currentTarget.files[0]);
            }}
            className="w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
