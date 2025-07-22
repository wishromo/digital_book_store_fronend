import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useAuth from '../hooks/useAuth';

const MemberDetailsPage = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth?.loading) {
      fetchMemberDetails();
    }
  }, [auth?.loading, auth?.accessToken]);

  const fetchMemberDetails = async () => {
    try {
      const res = await axiosInstance.get(`/members/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      });
      setMember(res.data);
    } catch (err) {
      console.error('Error fetching member details:', err.response?.data || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert('You are not authorized to view this member.');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading member details...</div>;
  if (!member) return <div className="text-center mt-8 text-gray-600">Member not found.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Member Details</h2>

      {member.profileImage ? (
        <img
          src={`${import.meta.env.VITE_STATIC_URL}/uploads/${member.profileImage}`}
          alt={member.name}
          className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      ) : (
        <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center rounded-full mb-4 text-gray-500">
          No Photo
        </div>
      )}

      <div className="space-y-2 text-center">
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Role:</strong> {member.role}</p>
        <p className="text-sm text-gray-500">
          <strong>Created At:</strong> {new Date(member.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Last Updated:</strong> {new Date(member.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
