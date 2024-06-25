"use client";

import Footer from "@/app/components/reusable/Footer";
import HomeNavbar from "@/app/components/reusable/HomeNavbar";
import { FaDiscord } from "react-icons/fa";

const Community = () => {
  return (

    <main className="w-[full] mx-auto bg-slate-400 h-[710px]">
      <div className="">
        <HomeNavbar />
      </div>

      <div className="bg-[#D7E58D] min-h-screen flex justify-center items-center">
        <div className="p-16 flex space-x-8 mx-10">
          <div className="w-2/5 h-2/5">
            <img src="/join.png" alt="Cult" className="rounded-lg" />
          </div>
          <div className="w-1/2 spa">
            <h1 className="text-2xl font-bold">Society Spot</h1>
            <p className="mt-4">Created By Suraj</p>
            <div className="flex space-x-4 mt-10">
              <button className="bg-black text-white py-2 px-8 rounded flex items-center space-x-4">
                <span>Join Discord</span>
                <span className="text-xl"><FaDiscord /></span>
              </button>
              <button className="bg-[#75E2FF] text-black py-2 px-16 font-bold rounded">
                Event Raids
              </button>
            </div>
            <a href="/voyager/opinion"><button className="bg-[#75E2FF] text-black py-2 px-16 font-bold rounded mt-4 ">
              Opinions
            </button></a>
            <h2 className="text-2xl font-semibold mt-28">CULT INFO</h2>
            <div className="mt-8 p-4 bg-white border rounded-lg w-3/4 h-2/5 mb-10">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Community;
