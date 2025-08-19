import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        return jwtDecode(savedToken).role || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  // Keep token in sync with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setRole(decoded.role || null);   //  decode immediately on login
    } catch {
      setRole(null);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
