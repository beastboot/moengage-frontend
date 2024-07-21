import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://moengage-backend-stqp.onrender.com/api/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful');
      navigate('/');
      location.reload()
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleSignupNavigate = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg px-8 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSignupNavigate}
              className="text-blue-500 hover:text-blue-700"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
