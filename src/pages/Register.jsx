import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: 'user',
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().oneOf(['user', 'member', 'admin']).required('Role is required'),
    image: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('role', values.role);
    if (values.image) {
      formData.append('profileImage', values.image); // ✅ MATCHING BACKEND
    }

    try {
      const res = await axiosInstance.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log(res.data);
      navigate('/login'); // ✅ Updated to /login path
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {serverError && <div className="text-red-600 mb-4">{serverError}</div>}

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Field type="text" name="name" className="w-full border rounded p-2" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field type="email" name="email" className="w-full border rounded p-2" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <Field type="password" name="password" className="w-full border rounded p-2" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Role</label>
              <Field as="select" name="role" className="w-full border rounded p-2">
                <option value="user">User</option>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Profile Image (optional)</label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
