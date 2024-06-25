import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { UserFriendInterface } from "@/app/voyager/random_chat/[id]/page";

// This Props can be changed according to incoming data from backend
interface Props {
  userData: UserFriendInterface;
  updateFriendListAfterRemoving: (friendId: string) => void;
  setLike?: Dispatch<SetStateAction<boolean>>;
}

const SidebarList = ({
  userData,
  updateFriendListAfterRemoving,
  setLike,
}: Props) => {
  const router = useRouter();

  const IP_ADDRESS = process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS;

  function capitaliseFirstLetter(string: string) {
    return string?.slice(0, 1).toUpperCase() + string?.slice(1, string.length);
  }

  const handleRemoveFriend = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (typeof window !== undefined) {
      const userId = localStorage.getItem("userId");
      fetch(
        `https://${IP_ADDRESS}/v1.0/voyager/user_friends/${userId}/${userData.friends}`,
        {
          method: "DELETE",
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
          updateFriendListAfterRemoving(userData.friends);
        })
        .catch((error) => console.log(error));
      if (setLike !== undefined) {
        setLike(false);
      }
    }
  };

  return (
    <div className="flex justify-between items-center my-1 px-3 py-2 text-white bg-[#393646] hover:bg-[#4e516d] rounded">
      <li
        className="list-none font-medium text-lg w-full"
        onClick={() => router.push(`/voyager/random_chat/${userData.friends}`)}
      >
        {capitaliseFirstLetter(userData.friendsName)}
      </li>
      <IoIosRemoveCircleOutline
        className="font-bold text-xl"
        onClick={handleRemoveFriend}
      />
    </div>
  );
};

export default SidebarList;
