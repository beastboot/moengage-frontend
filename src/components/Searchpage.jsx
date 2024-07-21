import React, { useState } from 'react';
import { parseJwt } from '../utils/parcejwt';
import axios from 'axios';
import NavBar from './NavBar';

const SearchPage = () => {
  const [filter, setFilter] = useState('');
  const [images, setImages] = useState([]);
  const [listName, setListName] = useState('');
  const [responseCodes, setResponseCodes] = useState([]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const fetchImages = () => {
    const regex = new RegExp(`^${filter.replace(/x/g, '\\d')}$`);
    const codes = Array.from({ length: 600 }, (_, i) => i).filter(code => regex.test(code.toString()));
    const imageUrls = codes.map(code => `https://http.dog/${code}.jpg`);
    setImages(imageUrls.map(url => ({ url })));
    setResponseCodes(codes);
  };

  const handleSaveList = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    const decodedToken = parseJwt(token);
    if (!decodedToken) {
      alert('Invalid token');
      return;
    }

    const userId = decodedToken.id;

    const newList = {
      name: listName,
      filter,
      images: images.map((img, index) => ({ code: responseCodes[index], url: img.url })),
      userId
    };

    try {
      await axios.post('https://moengage-backend-stqp.onrender.com/api/lists', newList);
      setListName('');
      setImages([]);
      setFilter('');
      alert('List saved successfully!');
    } catch (error) {
      console.error('Error saving list', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-100 via-green-300 to-blue-100 py-8">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Search Page</h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 py-6 mb-8">
          <input
            type="text"
            placeholder="Enter response code (e.g., 203, 2xx, 20x, 21x)"
            value={filter}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <button
            onClick={fetchImages}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Filter
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {images.map((img, index) => (
            <img key={index} src={img.url} alt={`Dog for response code`} className="w-32 h-32 object-cover rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105" />
          ))}
        </div>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 py-6">
          <input
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 transition duration-300 ease-in-out transform hover:scale-105"
          />
          <button
            onClick={handleSaveList}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save List
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
