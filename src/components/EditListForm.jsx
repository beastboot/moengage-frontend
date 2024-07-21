import React, { useState } from 'react';
import NavBar from './NavBar';

const EditListForm = ({ list, onSave, onCancel }) => {
  const [name, setName] = useState(list.name);
  const [filter, setFilter] = useState(list.filter);
  const [images, setImages] = useState(list.images.map(img => img.url));

  const handleSave = () => {
    const updatedList = {
      ...list,
      name,
      filter,
      images: images.map((url, index) => ({ url, code: list.images[index].code }))
    };
    onSave(updatedList);
  };

  return (
    <>
    
    <div className="w-full max-w-lg bg-white shadow-md rounded px-8 py-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Edit List</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
      </div>
     
      
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          Cancel
        </button>
      </div>
    </div>
    </>
  );
};

export default EditListForm;
