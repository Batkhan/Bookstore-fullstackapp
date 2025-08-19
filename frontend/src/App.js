// src/App.jsx
import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import AddBook from "./Pages/addBook";
import Login from "./Pages/login";
import Register from "./Pages/register";
import EditBook from "./Pages/EditBook";
import { AuthProvider, AuthContext } from "./Pages/AuthContext";
import LayoutWithNavbar from "./Pages/LayoutWithNavbar";

function PrivateRoute({ children, roleRequired }) {
  const { token, role } = useContext(AuthContext);
  return token && role === roleRequired ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Routes that need Navbar */}
          <Route element={<LayoutWithNavbar />}>
            <Route path="/api/books" element={<Home />} />
            <Route
              path="/add"
              element={
                <PrivateRoute roleRequired="admin">
                  <AddBook />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute roleRequired="admin">
                  <EditBook />
                </PrivateRoute>
              }
            />
          </Route>

          {/* ❌ Routes without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
