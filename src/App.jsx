

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Page Components ---
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BooksList from './pages/BookList';
import AddBook from './pages/AddBooks';
import EditBook from './pages/EditBooks';
import DeleeteBooks from './pages/DeleeteBooks';
import MembersList from './pages/MemberList';
import EditMember from './pages/EditMmber'; // Ensure this file is named EditMmber.jsx
import MemberDetailsPage from './pages/MemberDetail'; // Ensure this file is named MemberDetail.jsx
import BookDetailsPage from './pages/BookDetail';
import Dashboard from './pages/DashBoard'; // Ensure this file is named DashBoard.jsx
import NotFound from './pages/NotFound';
import AdminOnly from './pages/AdminOnly'; // If you use this page
import AdminList from './pages/AdminList'; // Ensure this file is named AdminList.jsx

// --- Components ---
import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute'; // Your custom protected route component

function App() {
  return (
    <div className="min-h-screen bg-gray-100 font-inter"> {/* Added font-inter for consistency */}
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* --- Public Routes (Accessible to everyone) --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<BooksList />} />

          {/* --- PROTECTED BOOK DETAILS ROUTE --- */}
          {/* Accessible to 'user', 'member', and 'admin' roles */}
          <Route
            path="/book/:id" // Dynamic segment for book ID
            element={
              <ProtectedRoute allowedRoles={['user', 'member', 'admin']}>
                <BookDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* --- Admin Protected Routes (Require 'admin' role) --- */}
          {/* Dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Books Management Routes (Admin only) */}
          <Route
            path="/books/add"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/edit/:id" // Route for editing a specific book
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <EditBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/delete" // Route for deleting books (might be a list or a confirmation page)
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DeleeteBooks />
              </ProtectedRoute>
            }
          />

          {/* Members Management Routes (Admin only, except for MemberDetailsPage) */}
          <Route
            path="/members" // Route to view the list of all members
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MembersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-member/:id" // Route to edit a specific member (matches navigate in MemberList)
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <EditMember />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members/:id" // Route to view a specific member's details (matches navigate in MemberList and AdminList)
            element={
              <ProtectedRoute allowedRoles={['user', 'member', 'admin']}> {/* Allow other roles to view their own details */}
                <MemberDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* Admins List Route (Admin only) */}
          {/* This route is for the dedicated /admins page, if you click the link in Dashboard */}
          <Route
            path="/admins"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminList />
              </ProtectedRoute>
            }
          />

          {/* AdminOnly page (if you have a specific page for general admin content) */}
          {/*
          <Route
            path="/admin-only-page"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminOnly />
              </ProtectedRoute>
            }
          />
          */}

          {/* --- Fallback Route (for unmatched paths) --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;







