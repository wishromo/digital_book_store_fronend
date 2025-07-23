import { Link } from 'react-router-dom';
import AdminList from './AdminList'; // Adjust path based on your structure

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <li>
            <Link
              to="/books"
              className="block w-full text-center bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
            >
              📚 View All Books
            </Link>
          </li>
          <li>
            <Link
              to="/books/add"
              className="block w-full text-center bg-green-500 text-white py-3 rounded hover:bg-green-600"
            >
              ➕ Add New Book
            </Link>
          </li>
          <li>
            <Link
              to="/members"
              className="block w-full text-center bg-purple-500 text-white py-3 rounded hover:bg-purple-600"
            >
              👥 View Members
            </Link>
          </li>
          <li>
            <Link
              to="/admins"
              className="block w-full text-center bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600"
            >
              👑 View Admins Page
            </Link>
          </li>
        </ul>

        {/* Directly render AdminList below dashboard links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Admins:</h2>
          <AdminList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
