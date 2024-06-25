"use client";

import { useState } from "react";

interface Category {
  ID: number;
  Category: string;
  Name: string;
}

interface CategoryValue {
  interests: string;
  location: string;
  gender: string;
}

interface Props {
  category: string;
  categoryValue: CategoryValue;
  setCategoryValue: React.Dispatch<React.SetStateAction<CategoryValue>>;
}

const CategoriesDropdown = ({
  category,
  categoryValue,
  setCategoryValue,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [interestList, setInterestList] = useState<Category[]>([]);

  const gender = ["Male", "Female", "Other"];

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  const handleOpenMenu = async () => {
    if (!isMenuOpen) {
      try {
        const response = await fetch(
          `https://${IP_ADDRESS}/v1.0/voyager/categories/${category}`
        );
        const list = await response.json();
        if (category === "interests") {
          setInterestList(list);
        }
      } catch (error) {
        alert("Error: " + error);
      }
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelect = (selectedCategory: string) => {
    setCategoryValue({
      ...categoryValue,
      [category]: selectedCategory,
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="flex justify-between items-center outline-none text-sm rounded-lg w-full p-2.5 bg-gray-50 border-gray-600 text-gray-900"
        onClick={handleOpenMenu}
      >
        {categoryValue[category as keyof CategoryValue]}
        <svg
          className="w-2.5 h-2.5 ms-3 cursor-pointer"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>
      {isMenuOpen && (
        <div
          id="dropdown"
          className="z-10 absolute bg-gray-50 rounded-lg shadow w-44 mt-1 overflow-auto max-h-52"
        >
          <ul
            className="py-2 text-sm font-medium"
            aria-labelledby="dropdownDefaultButton"
          >
            {category === "interests" &&
              interestList.map(({ ID, Name }) => (
                <li
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  key={ID}
                  onClick={() => handleSelect(Name)}
                >
                  {Name}
                </li>
              ))}
            {category === "gender" &&
              gender.map((value, idx) => (
                <li
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  key={idx}
                  onClick={() => handleSelect(value)}
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CategoriesDropdown;
