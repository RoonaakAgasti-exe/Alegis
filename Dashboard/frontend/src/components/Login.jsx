import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      
      {}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500 blur-[150px] opacity-20 rounded-full"></div>

      <div className="relative bg-[#0f172a] p-8 rounded-2xl shadow-2xl w-[400px] border border-cyan-500/30">

        <h1 className="text-3xl font-bold text-cyan-400 text-center mb-6">
          ALEGIS LOGIN
        </h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full mb-4 p-3 rounded-lg bg-black text-white border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full mb-6 p-3 rounded-lg bg-black text-white border border-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
            Secure Login
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account? <span className="text-cyan-400 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}