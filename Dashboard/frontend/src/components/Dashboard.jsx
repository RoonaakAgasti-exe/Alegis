import { useState, useEffect } from 'react';

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      
      setUser({ username: 'User' }); 
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="absolute w-[500px] h-[500px] bg-purple-500 blur-[150px] opacity-20 rounded-full"></div>
      <div className="relative bg-[#0f172a] p-8 rounded-2xl shadow-2xl w-[600px] border border-purple-500/30 text-center">
        <h1 className="text-3xl font-bold text-purple-400 mb-6">Cybersecurity Dashboard</h1>
        <p className="text-gray-300 mb-4">Welcome, {user?.username}!</p>
        <p className="text-gray-400 mb-6">Your secure dashboard is ready.</p>
        <button 
          onClick={onLogout} 
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;