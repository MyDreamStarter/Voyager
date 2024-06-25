import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  imgSrc: string;
}

const CommunityCard = ({ name, imgSrc }: Props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl cursor-pointer">
      <Image
        className="w-auto"
        height={300}
        width={300}
        src={imgSrc}
        alt="community-card-image"
      />
      <div className="px-6 py-4 mt-5">
        <div className="font-bold text-md mb-2">{name}</div>
      </div>
    </div>
  );
};

export default CommunityCard;
