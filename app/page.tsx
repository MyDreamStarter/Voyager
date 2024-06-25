import Image from "next/image";
import HomeNavbar from "./components/reusable/HomeNavbar";
import {
  LANDING_PAGE_VIBRANT_COMMUNITIES_IMAGES,
} from "./utils/constants";
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/reusable/Footer";
import "tailwindcss/tailwind.css";

const images = [
  { src: "/mug.png", caption: "Voyager has been a" },
  { src: "/button.png", caption: "I've made lifelong" },
  { src: "/lady.png", caption: "Voyager's" },
  { src: "/china2.png", caption: "The interactive demo" },
];

export default function Home() {
  return (
    <main className="w-[full] mx-auto bg-[#FFFCF9] ">
      <div className="mx-20">
        <HomeNavbar />
      </div>
      <div className="bg-white">
        <div className="flex lg:flex-row md:flex-col sm:items-center xs:flex-col justify-between row-1 mx-20">
          <div className="flex flex-col xs:items-center lg:items-start">
            <h1
              className=" text-7xl mt-30 md:w-[76.52%] sm:w-[100%] font-playfair-display"
              style={{ fontWeight: 500, fontStyle: "italic" }}
            >
              Start Your <br /> Own Voyage
            </h1>
            <div className="mt-6 text-2xl md:w-[76.52%] sm:w-[100%] font-space-grotesk text-gray-500">
              Connecting travelers globally through secure social networking and
              financial technology, fostering meaningful interactions, community
              building, and event participation with innovative
              blockchain-powered features. Explore, connect, and thrive.
            </div>
            <button className="bg-[#101521] hover:bg-gray-800 text-white font-bold py-4 px-14 rounded-lg mt-10">
              Get started
            </button>
          </div>
          <Image
            src="/fox.png"
            priority
            width={700}
            height={400}
            alt="hero-image"
            className="mt-10 w-auto h-auto"
          />
        </div>

        <div className="flex flex-col min-h-screen mt-10 mx-10">
          <div className=" mx-auto p-4">
            <h1
              className="text-5xl mb-8 font-playfair-display"
              style={{ fontWeight: 500, fontStyle: "italic" }}
            >
              Innovative Social-Fi App for Travelers, Social <br /> Networking
              With Financial Technology
            </h1>
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden p-6 mt-20 gap-8">
              <div className="w-full md:w-1/2 ">
                <img
                  src="/chat.png"
                  alt="Social Fi App"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                <h2 className="text-4xl font-semibold mb-4 mt-10">
                  Random Chat App
                </h2>
                <p className="text-gray-700 mb-4 text-2xl w-1/2 mt-12">
                  Fusion of meeting new friends and tinder, helping travelers
                  connect with like-minded individuals as they explore new
                  destinations.
                </p>
                <button className="px-16 py-2 bg-black text-white rounded-full hover:bg-gray-800 mt-12">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-screen mx-10">
          <div className=" mx-auto p-4">
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden p-6 mt-20 gap-8">
              <div className="w-full md:w-1/2 ">
                <img
                  src="/onchain.png"
                  alt="Social Fi App"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                <h2 className="text-4xl font-semibold mb-4">
                  Decentralized Onchain <br /> Identity
                </h2>
                <p className="text-gray-700 mb-4 text-2xl w-3/5 mt-12">
                  Allows users to establish a pseudo-anonymous onchain identity,
                  ensuring privacy and security while maintaining a trustworthy
                  profile for interactions within the app.
                </p>
                <button className="px-16 py-2 bg-black text-white rounded-full hover:bg-gray-800 mt-12">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-screen mx-10">
          <div className=" mx-auto p-4">
            <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden p-6 gap-8">
              <div className="w-full md:w-1/2 ">
                <img
                  src="/hc.png"
                  alt="Social Fi App"
                  className="w-full h-auto"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                <h2 className="text-4xl font-semibold mb-4 mt-10">
                  Cults (Communities)
                </h2>
                <p className="text-gray-700 mb-4 text-2xl w-1/2 mt-12">
                  offer a space for users to join like-minded groups for various
                  activities and interactions.
                </p>
                <button className="px-16 py-2 bg-black text-white rounded-full hover:bg-gray-800 mt-12">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col min-h-screen mx-10">
          <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden p-6 gap-8">
            <div className="w-full md:w-1/2 ">
              <img
                src="/hr.png"
                alt="Social Fi App"
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 p-6">
              <h2 className="text-4xl font-semibold mb-4 mt-10">Raids</h2>
              <p className="text-gray-700 mb-4 text-2xl w-1/2 mt-12">
                adventurous activities organized by users, allowing for unique
                travel experiences.
              </p>
              <button className="px-16 py-2 bg-black text-white rounded-full hover:bg-gray-800 mt-12">
                Learn more
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-screen bg-white">
          <div className="flex flex-col justify-center items-center w-1/3 p-8 bg-white">
            <h1 className="text-3xl font-semibold mb-6">
              Ready to Join the Adventure?
            </h1>
            <button className="px-16 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
              Get Started
            </button>
          </div>
          <div className="flex-1 relative">
            <img
              src="/ready.png"
              alt="Adventure"
              className="w-3/4 h-full object-cover float-right"
            />
          </div>
        </div>

        <div
          className="h-screen flex items-center justify-center mt-20"
          style={{ background: "#FFE0E8" }}
        >
          <div className="flex flex-col items-center text-center">
            <div>
              <h1
                className="text-5xl font-playfair-display"
                style={{ fontWeight: 500 }}
              >
                Stay Connected
              </h1>
            </div>
            <div className="mt-4 font-space-grotesk text-gray-500">
              <p>
                Follow us on social media to stay up-to-date with the latest
                Voyager news and adventures
              </p>
            </div>
            <div className="mt-6">
              <button className="px-6 py-2 p-6 bg-blue-500 text-white rounded-full">
                Follow Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
