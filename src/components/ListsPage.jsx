import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../utils/parcejwt';
import { isAuthenticated } from '../../auth';
import EditListForm from './EditListForm';
import NavBar from './NavBar';

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      fetchLists();
    }
  }, [navigate]);

  const fetchLists = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const decodedToken = parseJwt(token);
    if (!decodedToken) {
      console.error('Invalid token');
      return;
    }

    const userId = decodedToken.id;

    try {
      const response = await axios.get('https://moengage-backend-stqp.onrender.com/api/lists', {
        params: { userId }
      });
      setLists(response.data);
    } catch (error) {
      console.error('Error fetching lists', error);
    }
  };

  const handleSelectList = (list) => {
    setSelectedList(list);
    setIsEditing(false);
  };

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`https://moengage-backend-stqp.onrender.com/api/lists/${id}`);
      fetchLists();
      setSelectedList(null);
    } catch (error) {
      console.error('Error deleting list', error);
    }
  };

  const handleEditList = () => {
    setIsEditing(true);
  };

  const handleSaveList = async (updatedList) => {
    try {
      const response = await axios.put(`https://moengage-backend-stqp.onrender.com/api/lists/${updatedList._id}`, updatedList);
      fetchLists();
      setSelectedList(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving list', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Your Lists</h1>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 py-6 mb-8">
          {lists.map(list => (
            <div key={list._id} className="mb-4">
              <div className="flex justify-between items-center mb-2 bg-gray-200 p-4 rounded-lg shadow-sm">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{list.name}</h2>
                  <p className="text-sm text-gray-600">Created at: {new Date(list.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSelectList(list)}
                    className="text-lg font-medium text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteList(list._id)}
                    className="text-lg font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedList && (
          <div className="w-full max-w-lg bg-white shadow-lg rounded-lg px-8 py-6">
            <h2 className="text-2xl font-bold mb-4">{selectedList.name}</h2>
            {!isEditing ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {selectedList.images.map((img, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded-lg shadow-md">
                      <img src={img.url} alt={`Dog for response code`} className="w-full h-32 object-cover rounded-lg" />
                      <p className="text-center mt-2 text-sm text-gray-700">Code: {img.code}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleEditList}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Edit List
                </button>
              </>
            ) : (
              <EditListForm
                list={selectedList}
                onSave={handleSaveList}
                onCancel={() => setIsEditing(false)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ListsPage;
