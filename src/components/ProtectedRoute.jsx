// import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const ProtectedRoute = ({ allowedRoles = [], children }) => {
//   const { auth, getUserRole } = useAuth(); // Destructure the 'auth' object and 'getUserRole'

//   // Add a loading check if your auth context/hook handles asynchronous loading
//   // This prevents premature redirects while authentication state is being determined.
//   if (auth?.loading) {
//     // You can return a loading spinner or null here
//     return <div>Loading authentication...</div>;
//   }

//   // Check if accessToken exists within the auth object
//   // Assuming accessToken is directly on the auth object: auth.accessToken
//   // If it's nested deeper (e.g., auth.tokens.accessToken), adjust accordingly.
//   if (!auth?.accessToken) {
//     console.log('ProtectedRoute: Not authenticated, redirecting to login.');
//     return <Navigate to="/login" replace />;
//   }

//   const role = getUserRole(); // Get the user's role

//   // Logged in but role not allowed → go to unauthorized page
//   if (!allowedRoles.includes(role)) {
//     console.log(`ProtectedRoute: User role '${role}' not allowed for this route. Redirecting to unauthorized.`);
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // If authenticated and role is allowed, render the children
//   return children;
// };

// export default ProtectedRoute;




import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { auth, getUserRole } = useAuth(); // Destructure the 'auth' object and 'getUserRole'

  // Add a loading check if your auth context/hook handles asynchronous loading
  // This prevents premature redirects while authentication state is being determined.
  if (auth?.loading) { // <--- Checks auth.loading
    // You can return a loading spinner or null here
    return <div>Loading authentication...</div>;
  }

  // Check if accessToken exists within the auth object
  // Assuming accessToken is directly on the auth object: auth.accessToken
  // If it's nested deeper (e.g., auth.tokens.accessToken), adjust accordingly.
  if (!auth?.accessToken) { // <--- Checks auth.accessToken
    console.log('ProtectedRoute: Not authenticated, redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole(); // Get the user's role

  // Logged in but role not allowed → go to unauthorized page
  if (!allowedRoles.includes(role)) { // <--- Checks if user's role is in allowedRoles
    console.log(`ProtectedRoute: User role '${role}' not allowed for this route. Redirecting to unauthorized.`);
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and role is allowed, render the children
  return children;
};

export default ProtectedRoute;