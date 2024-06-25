"use client"
// import WormholeConnect from '@wormhole-foundation/wormhole-connect';
import Navbar from '../components/reusable/HomeNavbar';
const DemoNav = () => {
  return (
    <div className='bg-gray-100'>
      <Navbar />
      <div className="flex items-center justify-center mt-20">
        <div className="flex items-center justify-center space-x-8 ">
          <div className="relative flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center ml-10">
              <img src="/usdclogo.png" alt="Image 1" className="w-60 h-60 object-cover" />
              <div className="mt-4">
                <select className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Polygon</option>
                  <option>Ethereum </option>
                  <option>Avalanche </option>
                  <option>Celo </option>
                </select>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center ">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center ml-10">
              <img src="/usdclogo.png" alt="Image 2" className="w-60 h-60 object-cover" />
              <div className="mt-4">
                <select className="bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Polygon</option>
                  <option>Ethereum </option>
                  <option>Avalanche </option>
                  <option>Celo </option>
                </select>
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center mt-20 '>
        <button className='p-4 bg-black text-white px-16 rounded-full text-xl'>
          Start
        </button>
      </div>
    </div>
  );
}
export default DemoNav;