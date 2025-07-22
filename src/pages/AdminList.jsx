import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const AdminList = () => {
  const { auth } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, [auth?.accessToken]); // Depend on accessToken to re-fetch if it changes (e.g., after login)

  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get('/admin/', {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      // FIX: Access the 'admins' array directly from res.data
      // Your backend's getAdmins controller sends { admins: [...] }
      console.log("res.data:", res.data)
      setAdmins(res.data.admins); //
      console.log("Admins fetched successfully:", res.data.admins); // Log the actual array
    } catch (error) {
      console.error('Failed to fetch admins:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading admins...</div>;
  if (admins.length === 0) return <div className="text-center mt-8 text-gray-600">No admins found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Profile</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="text-center">
                <td className="px-4 py-2 border">
                  {admin.profileImage ? (
                    <img
                      src={`${import.meta.env.VITE_STATIC_URL}/uploads/${admin.profileImage}`}
                      alt="Admin"
                      className="w-12 h-12 rounded-full object-cover mx-auto"
                      onError={(e) => {
                        e.target.onerror = null; // Prevent infinite loop on error
                        e.target.src = 'https://via.placeholder.com/100?text=No+Image'; // Fallback image
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-xs text-gray-500">
                      No Photo
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 border">{admin.name}</td>
                <td className="px-4 py-2 border">{admin.email}</td>
                <td className="px-4 py-2 border capitalize text-green-700 font-semibold">{admin.role}</td>
                <td className="px-4 py-2 border">
                  <Link
                    to={`/members/${admin._id}`} // Link to the MemberDetailsPage for this admin
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;