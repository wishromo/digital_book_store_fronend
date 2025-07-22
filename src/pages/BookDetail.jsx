// src/pages/BookDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axiosInstance from '../utils/AxiosInstance';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();

    const [book, setBook] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("BookDetail: Component rendering. ID from URL:", id); // LOG 1

    useEffect(() => {
        console.log("BookDetail: useEffect triggered for ID:", id); // LOG 2
        const fetchBookDetailsAndPdf = async () => {
            setLoading(true);
            setError(null);

            console.log("BookDetail: fetchBookDetailsAndPdf started."); // LOG 3
            console.log("BookDetail: Current auth.accessToken:", auth?.accessToken); // LOG 4

            try {
                if (!auth?.accessToken) {
                    console.warn("BookDetail: No access token found. Redirecting to login."); // LOG 5
                    setTimeout(() => navigate('/login', { state: { from: location.pathname }, replace: true }), 100);
                    setLoading(false);
                    return;
                }

                // 1. Fetch book details (metadata)
                const bookResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                });
                setBook(bookResponse.data);
                console.log("BookDetail: Book metadata fetched:", bookResponse.data); // LOG 6

                if (!bookResponse.data.bookpdf) {
                    setError("No PDF file specified for this book in the database.");
                    setLoading(false);
                    console.warn("BookDetail: No bookpdf field in fetched book data."); // LOG 7
                    return;
                }

                // 2. Fetch the actual PDF file as a Blob
                console.log("BookDetail: Attempting to fetch PDF file..."); // LOG 8
                const pdfResponse = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/books/${id}/pdf`, {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                });

                const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfFile(pdfUrl); // <--- This updates pdfFile state
                console.log("BookDetail: PDF Blob URL created:", pdfUrl); // LOG 9

            } catch (err) {
                console.error("BookDetail: Error fetching book details or PDF:", err); // LOG 10
                if (err.response) {
                    console.error('BookDetail: Error response data:', err.response.data);
                    console.error('BookDetail: Error response status:', err.response.status);
                    if (err.response.status === 401) {
                        setError("Unauthorized: Please log in to view this content.");
                        setTimeout(() => navigate('/login', { state: { from: location.pathname }, replace: true }), 100);
                    } else if (err.response.status === 403) {
                        setError("Access Denied: Your account type cannot view this book.");
                        setTimeout(() => navigate('/unauthorized', { replace: true }), 100);
                    } else if (err.response.status === 404) {
                        setError("Book or PDF not found.");
                    } else {
                        setError(`An error occurred: ${err.response.status} - ${err.response.data.message || err.message}`);
                    }
                } else {
                    setError("Network error or server unreachable. Please try again.");
                }
            } finally {
                setLoading(false);
                console.log("BookDetail: fetchBookDetailsAndPdf finished. Loading set to false."); // LOG 11
            }
        };

        // If pdfFile already exists, it means the PDF was already loaded, no need to fetch again
        // unless 'id' or 'auth?.accessToken' changes. This prevents re-fetching on parent re-renders.
        if (!pdfFile || pdfFile.includes(id)) { // Added check to prevent re-fetching if PDF is already loaded for this ID
             fetchBookDetailsAndPdf();
        }


        return () => {
            if (pdfFile) {
                URL.revokeObjectURL(pdfFile);
                console.log("BookDetail: Revoked PDF Blob URL on unmount."); // LOG 12
            }
        };
    // Corrected dependencies: Removed pdfFile to prevent infinite loop
    }, [id, auth?.accessToken, navigate, location.pathname]); // <--- CORRECTED DEPENDENCY ARRAY

    // --- Conditional Rendering ---
    if (loading) {
        console.log("BookDetail: Rendering Loading state."); // LOG 13
        return <div className="text-center mt-8 text-lg font-medium">Loading book details...</div>;
    }

    if (error) {
        console.log("BookDetail: Rendering Error state:", error); // LOG 14
        return <div className="text-red-600 text-center mt-8 text-lg font-medium">{error}</div>;
    }

    if (!book) {
        console.log("BookDetail: Rendering 'Book details could not be loaded' state."); // LOG 15
        return <div className="text-center mt-8 text-lg">Book details could not be loaded.</div>;
    }

    // Main content rendering
    console.log("BookDetail: Rendering main content. PDF file state:", pdfFile); // LOG 16
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">{book.title}</h1>
            <p className="text-lg text-gray-700 mb-2"><strong>Author:</strong> {book.author}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Genre:</strong> {book.genre}</p>
            <p className="text-lg text-gray-700 mb-4"><strong>Price:</strong> ${book.price?.toFixed(2)}</p>
            <p className="text-gray-800 mb-8 leading-relaxed">{book.description}</p>

            {book.coverImage && (
                <div className="mb-8 border p-4 rounded-lg bg-gray-50 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cover Image</h2>
                    <img
                        src={`${import.meta.env.VITE_API_URL.replace('/api', '')}/uploads/${book.coverImage}`}
                        alt={book.title}
                        className="max-w-xs h-auto rounded-lg shadow-md border border-gray-200"
                        onError={(e) => {
                            console.error("Error loading cover image:", e.target.src);
                            e.target.src = '/default-cover.png'; // Fallback image
                        }}
                    />
                </div>
            )}

            {pdfFile ? (
                <div className="mt-10 border p-4 rounded-lg bg-gray-50 flex flex-col items-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Read Book</h2>
                    <iframe
                        src={pdfFile}
                        title={`PDF of ${book.title}`}
                        className="w-full h-[800px] border border-gray-300 rounded shadow-md"
                        allowFullScreen
                        frameBorder="0"
                    >
                        Your browser does not support iframes. You can <a href={pdfFile} download={`${book.title}.pdf`}>download the PDF here</a>.
                    </iframe>
                </div>
            ) : (
                <div className="text-gray-600 mt-10 p-4 border rounded-lg bg-gray-50 text-center">
                    {book.bookpdf ? "Loading PDF..." : "No readable PDF file available for this book."}
                </div>
            )}
        </div>
    );
};

export default BookDetail;