import React from "react";

interface Props {
  message: string;
  setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Alert = ({ message, setFunction }: Props) => {
  return (
    <div className="fixed z-50 top-0 w-[71.3%]">
      <div
        className="flex text-white justify-between bg-[#AD88C6] p-5 rounded relative"
        role="alert"
      >
        <div className="text-md font-semibold">{message}</div>
        <div>
          <svg
            className="cursor-pointer"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setFunction(false)}
          >
            <path
              d="M18 6L6 18"
              stroke="#FEFEFE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#FEFEFE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
