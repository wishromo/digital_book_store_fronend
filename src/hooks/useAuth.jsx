import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useAuth = () => {
  const { auth, setAuthTokens, accessToken} = useContext(AuthContext);

  console.log("access token",auth.accessToken)
  const logout = () => {
    setAuthTokens(null, null);
  };

  const getUserRole = () => {
    return auth.user?.role || null;
  };

  return {
    auth: auth, // Return the whole auth object
    logout,
    getUserRole,
    accessToken:auth.accessToken,
    // If you need direct access to setAuthTokens:
    // setAuthTokens,
  };
};

export default useAuth;