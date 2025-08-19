import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/api/books");
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/api/books">Home</Link>
      <div>
        {token ? (
          <>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-2 mr-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
