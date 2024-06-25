"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/navigation";
import SidebarList from "./SidebarList";
import Link from "next/link";
import { UserFriendInterface } from "@/app/voyager/random_chat/[id]/page";
import { v4 as uuidv4 } from "uuid";
import { RiChatNewLine } from "react-icons/ri";

interface Props {
  friendList: UserFriendInterface[];
  setFriendList: Dispatch<SetStateAction<UserFriendInterface[]>>;
  setLike?: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ friendList, setFriendList, setLike }: Props) => {
  const [activeTab, setActiveTab] = useState("friends");

  // hardcoded for now
  const [chatUserList, setChatUserList] = useState<string[]>([
    "Aditi",
    "Suranshu",
  ]);

  const router = useRouter();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  useEffect(() => {
    (async function () {
      if (typeof window !== undefined) {
        const userId = localStorage.getItem("userId");
        const userFriends: UserFriendInterface[] = await fetch(
          `https://${IP_ADDRESS}/v1.0/voyager/user_friends/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not okay " + response.statusText
              );
            }
            return response.json();
          })
          .then((data) => {
            if (data === null) {
              return [];
            }
            return data;
          })
          .catch((error) => console.log(error));
        if (setFriendList !== undefined) {
          setFriendList(userFriends);
        }
      }
    })();
    // eslint-disable-next-line
  }, []);

  function updateFriendListAfterRemoving(friendId: string) {
    if (friendList !== undefined && setFriendList !== undefined) {
      const currentFriendList = [...friendList];
      const updatedFriendList = currentFriendList.filter(
        (data) => data.friends !== friendId
      );
      setFriendList(updatedFriendList);
    }
  }

  return (
    <div className="fixed h-[100vh] px-3 py-4 bg-[#25262D] top-0 w-[25%]">
      <Link
        href="/"
        className="text-white font-bold text-xl hover:text-gray-300"
      >
        Voyager
      </Link>
      <div className="w-[100%] mt-5 flex bg-black rounded pt-2 pb-2 justify-center items-center gap-1">
        <button
          className={`w-1/2 flex ml-2 p-2 rounded justify-center items-center gap-2 ${
            activeTab === "chat" ? "bg-gray-100 text-black" : "text-gray-50"
          }`}
          id="chat"
          onClick={() => setActiveTab("chat")}
        >
          <IoChatbubbleEllipsesOutline />
          Chat
        </button>
        <button
          className={`w-1/2 p-2 rounded mr-2 flex justify-center items-center gap-2  ${
            activeTab === "friends" ? "bg-gray-100 text-black" : "text-gray-50"
          }`}
          id="friends"
          onClick={() => setActiveTab("friends")}
        >
          <FaUserFriends />
          Friends
        </button>
      </div>

      {/* --------------------------------todo--------------*/}
      <div className="flex flex-col h-[74%] overflow-auto my-2 pr-2">
        {activeTab === "chat" &&
          chatUserList.map((name) => (
            <div
              className="flex justify-between items-center my-1 px-3 py-2 text-white bg-[#393646] hover:bg-[#4e516d] rounded"
              key={uuidv4()}
            >
              <li className="list-none font-medium text-lg">{name}</li>
            </div>
          ))}

        {activeTab === "friends" &&
          friendList !== undefined &&
          friendList.map((userData) => (
            <SidebarList
              key={uuidv4()}
              userData={userData}
              updateFriendListAfterRemoving={updateFriendListAfterRemoving}
              setLike={setLike}
            />
          ))}
      </div>
      {/* ----------------------------- */}
      {/* to change routing */}
      <button
        className="fixed flex items-center justify-center bottom-0 left-0 w-[25%] mx-auto p-2 rounded font-md text-lg bg-black text-gray-50 hover:bg-[#201828] px-3"
        onClick={() => router.push("/voyager/random_chat/new")}
      >
        <span className="ml-2">Start new chat</span>
        <span className="ml-5 font-semibold text-2xl">
          <RiChatNewLine />
        </span>
      </button>
    </div>
  );
};

export default Sidebar;
