"use client";

import HomeNavbar from "@/app/components/reusable/HomeNavbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CULT_PAGE_COMMUNITIES_IMAGE, CULT_PAGE_KEYFEATURES_IMAGE } from "@/app/utils/constants";
import { v4 as uuidv4 } from "uuid";
import Footer from "@/app/components/reusable/Footer";

const Cult = () => {
  return (
    <main className="w-[full] mx-auto bg-[#FFFCF9] ">
      <div className="mx-20">
        <HomeNavbar />
      </div>
      <div className="bg-[#FFFCF9] ">
        <div className="flex lg:flex-row md:flex-col sm:items-center xs:flex-col justify-between row-1 ml-20">
          <div className="flex flex-col xs:items-center lg:items-start">
            <h1 className=" text-7xl mt-40 md:w-[76.52%] sm:w-[100%] font-englebert">
              Discover the Power of Cults
            </h1>
            <div className="mt-6 text-2xl md:w-[76.52%] sm:w-[100%] font-space-grotesk text-gray-500">
              Unlock the Community Experience: Explore our
              vibrant network, connect with like-minded individuals, and embark
              on a journey of shared passions and lively interactions
            </div>
            <button className="bg-[#101521] hover:bg-[#2a73ae] text-white font-bold py-4 px-8 rounded-lg mt-10">
              Launch your own Cult
            </button>
          </div>
          <Image
            src="/cult.png"
            priority
            width={700}
            height={400}
            alt="hero-image"
            className="mt-10"
          />
        </div>
        <div className="mt-24 row-2 flex flex-col text-center items-centert">
          <div className="flex flex-col items-center text-center">
            <div>
              <h1
                className="text-5xl font-playfair-display"
                style={{ fontWeight: 500, fontStyle: "italic" }}
              >
                Discover the Communities of Voyager
              </h1>
            </div>
          </div>
          <div className="flex justify-center mt-20 mx-20 gap-8 ">
            {CULT_PAGE_COMMUNITIES_IMAGE.map((data) => (
              <div
                key={uuidv4()}
                className="flex justify-center flex-col mb-8 "
              >

                <Image
                  src={data.src}
                  height={300}
                  width={350}
                  alt="vivrant-communities"
                  className="object-fill rounded"
                />
                <div
                  className="mt-2 text-2xl font-playfair-display "
                  style={{ fontWeight: 600, fontStyle: "italic" }}
                >
                  {data.community_interest}
                </div>
                <div
                  className="mt-2 text-lg font-space-grotesk text-gray-500 "
                >
                  <a href="/voyager/communities"><button
                    className="bg-[#2a73ae] hover:bg-[#101521] text-white font-bold py-2 px-6 rounded-lg"
                  >
                    Join Now
                  </button></a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h1
          className="text-5xl font-playfair-display mt-28 mx-20"
          style={{ fontWeight: 500, fontStyle: "italic" }}
        >
          Key Features
        </h1>
        <div className=" row-2 flex flex-col text-center items-centert">

          <div className="flex justify-center mt-10 mx-20 gap-4 ">
            {CULT_PAGE_KEYFEATURES_IMAGE.map((data) => (
              <div
                key={uuidv4()}
                className="flex justify-center flex-col mb-8 "
              >

                <Image
                  src={data.src}
                  height={400}
                  width={400}
                  alt="vivrant-communities"
                  className="object-fill rounded"
                />
                <div
                  className="mt-2 text-2xl font-playfair-display "
                  style={{ fontWeight: 600, fontStyle: "italic" }}
                >
                  {data.community_interest}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div >
      <div className="mt-20">
      <Footer />

      </div>
    </main>
  );
};

export default Cult;
