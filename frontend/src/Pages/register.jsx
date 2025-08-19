// src/Pages/Register.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", form);
      alert("Registration is successful. You can now log in");
      navigate("/login");
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none border border-white/30 focus:ring-2 focus:ring-violet-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none border border-white/30 focus:ring-2 focus:ring-violet-400"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none border border-white/30 focus:ring-2 focus:ring-violet-400"
              placeholder="Enter a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition text-white font-semibold shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-violet-300 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
