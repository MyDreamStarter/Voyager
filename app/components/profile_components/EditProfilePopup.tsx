import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
// import { RiArrowDropDownLine } from "react-icons/ri";
import CategoriesDropdown from "../reusable/CategoriesDropdown";

interface CategoryValue {
  interests: string;
  location: string;
  gender: string;
}
interface Props {
  setIsEditProfileClicked: React.Dispatch<React.SetStateAction<boolean>>;
  subId: string | null;
  userAddress: string | null;
}

const EditProfilePopup = ({ setIsEditProfileClicked, userAddress, subId }: Props) => {
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<number | string>("");
  const [categoryValue, setCategoryValue] = useState<CategoryValue>({
    interests: "",
    location: "",
    gender: "other",
  });

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  const handleProfileDetailsSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsEditProfileClicked(false);
  };

  function UpdateUserData() {
    const updatedUserData = {
      user_address: userAddress,
      sub_id: subId,
      name: username,
      provider: "Google",
      gender: categoryValue.gender,
      interest: categoryValue.interests,
      location: "",
    };
    fetch(`https://${IP_ADDRESS}/v1.0/voyager/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error patching data:", error);
      });
  }

  return (
    <form
      className="flex fixed w-full mt-10"
      onSubmit={handleProfileDetailsSubmit}
    >
      <div className="relative xs:w-[60%] sm:w-[30%] m-auto rounded p-4 shadow bg-gradient-to-r from-green-300 to-blue-300">
        <MdOutlineCancel
          className="absolute right-0 mr-5 text-2xl text-green-100 cursor-pointer"
          onClick={() => setIsEditProfileClicked(false)}
        />
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 text-gray-900"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              className="outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-50 border-gray-600 placeholder-gray-400 text-gray-900"
              placeholder="25"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="interests"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <CategoriesDropdown
              category="gender"
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
          </div>
          {/* if we have to add interests dropdown */}
          {/* <div>
            <label
              htmlFor="interests"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Interests
            </label>
            <CategoriesDropdown
              category="interests"
              categoryValue={categoryValue}
              setCategoryValue={setCategoryValue}
            />
          </div> */}
        </div>
        <button
          type="submit"
          className="bg-[#4ea5ec] hover:bg-[#4890cb] text-white font-bold py-2 px-4 rounded"
          onClick={UpdateUserData}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfilePopup;
