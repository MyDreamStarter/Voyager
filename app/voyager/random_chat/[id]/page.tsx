"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "@/app/components/random_chat_components/Sidebar";
import RandomChatNavbar from "@/app/components/random_chat_components/RandomChatNavbar";
interface ChatData {
  id: string;
  reciverUserId: string;
  senderUserId: string;
  content: string;
  username: string;
  created_at: string;
}

export interface UserFriendInterface {
  friends: string;
  friendsName: string;
  id: string;
  userId: string;
  userName: string;
}

const NewChat = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [cachedUserId, setCachedUserId] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [like, setLike] = useState<boolean>(false);
  const [friendList, setFriendList] = useState<UserFriendInterface[]>([]);

  const scrollElementRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const receiverUserId = params.id;

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  useEffect(() => {
    if (typeof window !== undefined) {
      let userId = localStorage.getItem("userId");
      setCachedUserId(userId);
    }

    const newSocket = new WebSocket(
      `wss://${IP_ADDRESS}/v1.0/voyager_web_socket/ws`
    );

    newSocket.onopen = () => {
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      const newChatData = JSON.parse(event.data);
      setChatData((prevData) => [...prevData, newChatData]);
    };
    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line
  }, []);

  // to scroll into view the last message
  const handleScrollIntoView = () => {
    scrollElementRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(handleScrollIntoView, [chatData.length]);

  function sendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Enter" &&
      socket &&
      socket.readyState === WebSocket.OPEN &&
      inputMessage.length >= 1
    ) {
      socket.send(
        JSON.stringify({
          senderUserId: cachedUserId,
          content: inputMessage,
          reciverUserId: receiverUserId,
          created_at: new Date().toISOString(),
        })
      );
      setInputMessage(""); // Clear input field after sending message
    } else {
      console.error("WebSocket connection is not open.");
    }
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar
        friendList={friendList}
        setFriendList={setFriendList}
        setLike={setLike}
      />
      <div className="flex flex-col justify-between h-[100vh] w-[75%] ml-[25%] bg-[#35374B]">
        <RandomChatNavbar
          like={like}
          setLike={setLike}
          setFriendList={setFriendList}
        />
        <div className="p-2 m-5 h-full overflow-auto">
          {chatData.map((data, idx) => (
            <div key={uuidv4()}>
              {data.reciverUserId === cachedUserId ? (
                <div
                  ref={scrollElementRef}
                  className="rounded-l-full rounded-r-full px-3 py-1 text-black max-w-fit mb-3 float-right bg-[#BFACE0]
              clear-both"
                >
                  {data.content}
                </div>
              ) : (
                <div
                  ref={scrollElementRef}
                  className="bg-white rounded-l-full rounded-r-full px-3 py-1 text-black max-w-fit mb-3 float-left clear-both"
                >
                  {data.content}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="w-[95%] mx-auto mb-4">
            <input
              type="text"
              id="default-input"
              className={`text-gray-50 text-sm rounded-lg block p-2.5 w-full bg-[#61677A] outline-none`}
              placeholder="Enter text here..."
              value={inputMessage}
              onChange={handleMessageChange}
              onKeyDown={(event) => {
                sendMessage(event);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
