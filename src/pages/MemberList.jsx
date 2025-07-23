import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const { accessToken, getUserRole } = useAuth();

  const fetchMembers = async () => {
    try {
      const res = await axiosInstance.get("/members/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMembers(res.data.members);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axiosInstance.delete(`/members/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMembers(members.filter((member) => member._id !== id));
    } catch (err) {
      console.error("Failed to delete member:", err);
    }
  };

  const promoteToAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to promote this member to admin?")) return;
    try {
      await axiosInstance.put(
        `/members/${id}/promote`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Remove promoted admin from member list
      setMembers(members.filter((member) => member._id !== id));
    } catch (err) {
      console.error("Failed to promote member:", err);
    }
  };

  useEffect(() => {
    const role = getUserRole();
    if (role !== "admin") {
      navigate("/unauthorized");
    } else {
      fetchMembers();
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Members List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            {member.profileImage && (
              <img
                 src={`${import.meta.env.VITE_STATIC_URL}/uploads/${member.profileImage}`}
                alt={member.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.email}</p>
            <p className="text-sm text-gray-400 italic">Role: {member.role}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded"
                onClick={() => navigate(`/members/${member._id}`)}
              >
                View
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-black px-3 py-1 rounded"
                onClick={() => navigate(`/edit-member/${member._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-black px-3 py-1 rounded"
                onClick={() => deleteMember(member._id)}
              >
                Delete
              </button>
              {member.role !== "admin" && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
                  onClick={() => promoteToAdmin(member._id)}
                >
                  Promote to Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
