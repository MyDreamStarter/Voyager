import React, { useState } from 'react';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-black py-2 px-4 rounded inline-flex items-center"
      >
        <span className="mr-1">Location</span>
        <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.5 7l4.5 4 4.5-4z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mumbai</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Goa</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Delhi</a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
