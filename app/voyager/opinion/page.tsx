"use client"

import Footer from '@/app/components/reusable/Footer'
import Navbar from '@/app/components/reusable/HomeNavbar'
import CommunityDropdown from '@/app/utils/communitydropdown'
import React from 'react'

const Opinion = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-[#D7E58D] p-6 ">
                <div className="flex justify-between items-center mb-6 mx-32 mt-10">
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 rounded-full border border-gray-300 w-1/2"
                    />
                    <div>
                        {/* <button className="bg-white rounded-full mr-2 font-bold"><CommunityDropdown /></button> */}
                        <a href="/voyager/createOpinion"><button className="bg-white p-2 px-8 font-bold rounded-full">+ Create</button></a>
                    </div>
                </div>

                <div className="bg-[#EDF5C1] p-8 pr-20 mb-4 rounded-lg mx-32 mt-10">
                    <h2 className="text-2xl font-bold mb-2">Lorem Ipsum</h2>
                    <p className="text-xl mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-2">↑ 5</button>
                            <button>↓</button>
                            <button className="ml-4">10</button>
                        </div>
                        <button className="bg-white p-2 px-8 rounded-full">Soumalya</button>
                    </div>
                </div>
                <div className="bg-[#EDF5C1] p-8 pr-20 mb-4 rounded-lg mx-32 mt-10">
                    <h2 className="text-2xl font-bold mb-2">5 MATIC</h2>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-2">↑ 5</button>
                            <button>↓</button>
                            <button className="ml-4">10</button>
                        </div>
                        <button className="bg-white p-2 px-8 rounded-full">Shilpa</button>
                    </div>
                </div>
                <div className="bg-[#EDF5C1] p-8 pr-20 mb-4 rounded-lg mx-32 mt-10">
                    <h2 className="text-2xl font-bold mb-2">Lorem Ipsum</h2>
                    <p className="text-xl mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-2">↑ 5</button>
                            <button>↓</button>
                            <button className="ml-4">10</button>
                        </div>
                        <button className="bg-white p-2 px-8 rounded-full">Shubham</button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Opinion