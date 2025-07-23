




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/AxiosInstance";
import useAuth from "../hooks/useAuth";

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accessToken, getUserRole } = useAuth();

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });
  const [existingImage, setExistingImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "admin") {
      navigate("/unauthorized");
      return;
    }

    const fetchMember = async () => {
      try {
        const res = await axiosInstance.get(`/members/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setInitialValues({
          name: res.data.name || "",
          email: res.data.email || "",
          role: res.data.role || "user",
          password: "", // Do not prefill password
        });
        setExistingImage(res.data.profileImage);
      } catch (err) {
        console.error("Failed to fetch member:", err);
      }
    };

    fetchMember();
  }, [id, accessToken, getUserRole, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string()
      .oneOf(["user", "member", "admin"], "Invalid role")
      .required("Role is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("role", values.role);
    if (values.password) {
      formData.append("password", values.password);
    }
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      await axiosInstance.put(`/members/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/members");
    } catch (err) {
      console.error("Failed to update member:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Member</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Role</label>
              <Field as="select" name="role" className="w-full border px-3 py-2 rounded">
                <option value="user">User</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">New Password</label>
              <Field
                type="password"
                name="password"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {existingImage && (
              <div>
                <label className="block font-medium mb-1">Current Image</label>
                <img
                 src={`${import.meta.env.VITE_STATIC_URL}/uploads/${existingImage}`}
                  alt="Current"
                  className="h-32 object-cover rounded"
                />
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">New Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setSelectedFile(event.currentTarget.files[0]);
                  setFieldValue("profileImage", event.currentTarget.files[0]);
                }}
              />
              {selectedFile && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="h-32 mt-2 object-cover rounded"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Member
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditMember;
