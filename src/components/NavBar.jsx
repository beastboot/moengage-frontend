import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    location.reload()
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/search"
            className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
          >
            Search Page
          </Link>
          <Link
            to="/lists"
            className="text-white hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
          >
            Lists Page
          </Link>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
