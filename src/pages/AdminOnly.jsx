import React from 'react';

const AdminOnly = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700">Admin Only Page</h1>
      <p className="mt-4">This page is restricted to admin users.</p>
    </div>
  );
};

export default AdminOnly;
