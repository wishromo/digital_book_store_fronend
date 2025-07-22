import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: true, // <-- IMPORTANT: Must be true initially
  });

  const updateAuthFromToken = (newAccessToken, newRefreshToken = null) => {
    let decodedUser = null;
    let isAuthenticated = false;

    if (newAccessToken) {
      try {
        const decoded = jwtDecode(newAccessToken);
        // Console log added here to see the token content
        console.log('Decoded token:', decoded); // <-- Make sure this line is here

        if (decoded.exp * 1000 > Date.now()) {
          isAuthenticated = true;
          decodedUser = {
            id: decoded.userId || decoded.sub,
            role: decoded.role,
          };
        } else {
          console.warn("Access token expired. Clearing tokens.");
          newAccessToken = null;
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        newAccessToken = null;
      }
    }

    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    setAuth({
      user: decodedUser,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      isAuthenticated: isAuthenticated,
      loading: false, // <-- IMPORTANT: Must be set to false here
    });
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    updateAuthFromToken(storedAccessToken, storedRefreshToken);
  }, []);

  const contextValue = {
    auth,
    setAuthTokens: updateAuthFromToken,
  };

  if (auth.loading) {
    return <div>Loading authentication...</div>; // Render this while loading
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;