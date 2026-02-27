import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="absolute w-[500px] h-[500px] bg-green-500 blur-[150px] opacity-20 rounded-full"></div>

      <div className="relative bg-[#0f172a] p-8 rounded-2xl shadow-2xl w-[400px] border border-green-500/30">

        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">
          CREATE ACCOUNT
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-4 p-3 rounded-lg bg-black text-white border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg bg-black text-white border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 p-3 rounded-lg bg-black text-white border border-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
            Create Secure Account
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account? <span className="text-green-400 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
}