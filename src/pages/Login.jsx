// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/AxiosInstance";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   // We now destructure `setAuthTokens` as the function to update auth state
//   const { setAuthTokens } = useContext(AuthContext); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axiosInstance.post("/auth/login", {
//         email,
//         password,
//       });

//       // Assuming your backend sends accessToken and refreshToken
//       const { accessToken, refreshToken } = res.data; 

//       // ✅ Use the `setAuthTokens` function from AuthContext to update state and localStorage
//       // Pass both access and refresh tokens if your AuthContext manages both
//       setAuthTokens(accessToken, refreshToken); 

//       // Remove the old localStorage.setItem("user", ...) as AuthContext now handles user derivation
//       // localStorage.setItem("user", JSON.stringify(res.data.user)); // <-- REMOVE THIS LINE

//       setSuccessMsg("Login successful!");

//       setTimeout(() => {
//         // You can add more specific navigation here if needed,
//         // e.g., navigate(auth.user?.role === 'admin' ? '/admin/dashboard' : '/');
//         navigate("/");
//       }, 1000);
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       setErrorMsg(err.response?.data?.message || "Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded shadow-md w-80 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//           required
//         />

//         {errorMsg && (
//           <p className="text-red-500 text-sm text-center">{errorMsg}</p>
//         )}

//         {successMsg && (
//           <p className="text-green-600 text-sm text-center">{successMsg}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

//  export default Login;



import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  // We now destructure `setAuthTokens` as the function to update auth state
  const { setAuthTokens } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // Assuming your backend sends accessToken and refreshToken
      const { accessToken, refreshToken } = res.data; 

      // ✅ Use the `setAuthTokens` function from AuthContext to update state and localStorage
      // Pass both access and refresh tokens if your AuthContext manages both
      setAuthTokens(accessToken, refreshToken); 

      // Remove the old localStorage.setItem("user", ...) as AuthContext now handles user derivation
      // localStorage.setItem("user", JSON.stringify(res.data.user)); // <-- REMOVE THIS LINE

      setSuccessMsg("Login successful!");

      setTimeout(() => {
        // You can add more specific navigation here if needed,
        // e.g., navigate(auth.user?.role === 'admin' ? '/admin/dashboard' : '/');
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setErrorMsg(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />

        {errorMsg && (
          <p className="text-red-500 text-sm text-center">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 text-sm text-center">{successMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;