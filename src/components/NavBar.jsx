// src/components/Navbar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [showBooksDropdown, setShowBooksDropdown] = useState(false);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);

  // Refs for each dropdown to detect outside clicks
  const booksDropdownRef = useRef(null);
  const membersDropdownRef = useRef(null);

  if (auth?.loading) {
    return null;
  }

  const role = auth?.user?.role;
  const isAuthenticated = auth?.isAuthenticated;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (booksDropdownRef.current && !booksDropdownRef.current.contains(event.target)) {
        setShowBooksDropdown(false);
      }
      if (membersDropdownRef.current && !membersDropdownRef.current.contains(event.target)) {
        setShowMembersDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    if (dropdownName === 'books') {
      setShowBooksDropdown(!showBooksDropdown);
      setShowMembersDropdown(false); // Close other dropdown
    } else if (dropdownName === 'members') {
      setShowMembersDropdown(!showMembersDropdown);
      setShowBooksDropdown(false); // Close other dropdown
    }
  };

  return (
    <nav className="bg-blue-100 p-4 flex justify-between items-center shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-bold text-blue-700 hover:text-blue-900 transition-colors duration-200">
          Book App
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
          Home
        </Link>

        {isAuthenticated ? (
          <>
            <div className="relative" ref={booksDropdownRef}>
              <button
                onClick={() => toggleDropdown('books')}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
              >
                Books
              </button>
              {showBooksDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/books" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md" onClick={() => setShowBooksDropdown(false)}>
                    Book List
                  </Link>
                  {role === 'admin' && (
                    <>
                      <Link to="/books/add" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md" onClick={() => setShowBooksDropdown(false)}>
                        Add New Book
                      </Link>
                      {/* Removed "Edit Books" link as requested */}
                      {/* Removed "Delete Books" link as it's typically managed from a list */}
                    </>
                  )}
                </div>
              )}
            </div>

            {role === 'admin' && (
              <>
                <div className="relative" ref={membersDropdownRef}>
                  <button
                    onClick={() => toggleDropdown('members')}
                    className="text-gray-700 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
                  >
                    Members
                  </button>
                  {showMembersDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link to="/members" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md" onClick={() => setShowMembersDropdown(false)}>
                        Member List
                      </Link>
                      {/* Removed "Edit Member" link as it's typically managed from a list */}
                      <Link
                        to="/register" // Changed to navigate to /register as requested
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                        onClick={() => setShowMembersDropdown(false)}
                      >
                        Add Member
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/dashboard" className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  Dashboard
                </Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-black rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;