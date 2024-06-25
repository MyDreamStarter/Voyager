"use client"

import Footer from '@/app/components/reusable/Footer';
import Navbar from '@/app/components/reusable/HomeNavbar'
import React from 'react'

const Raids = () => {
    const cards = [
        {
            title: "Solo raids",
            description: "Browse securely with advanced encryption, safeguarding your data from threats anywhere.",
            image: "/solo.png"
        },
        {
            title: "Event raids",
            description: "Offers unrestricted global access, allowing you to bypass censorship and content limitations seamlessly from home or office.",
            image: "/event.png"
        },
        {
            title: "Welcome to the den",
            description: "Secures your network, providing reliable access and expanding capabilities with cloud storage and computing.",
            image: "/den.png"
        },
        {
            title: "Wizards Opinion",
            description: "Enables future-ready, secure, and anonymous payments with NFT subscriptions, ensuring optimal performance.",
            image: "/opinion.png"
        }
    ];
    return (
        <div className='mx-20'>
            <Navbar />
            <div className="flex flex-col bg-[#FFFCF9]">
                <div className="flex flex-col md:flex-row md:space-x-10">
                    <div className="h-[640px] w-[60%] overflow-hidden">
                        <img
                            src="/raids.png"
                            alt="Globe with suitcases and hot air balloons"
                            className="object-cover h-full w-full"
                        />
                    </div>
                    <div className=" text-center  md:text-left md:mt-0">
                        <h1 className="text-5xl mt-60 text-gray-800">
                            Embark on Unforgettable Adventures
                        </h1>
                        <a href="/voyager/soloraids"><button className="mt-5 px-5 py-3 text-white bg-[#101521] hover:bg-[#2a73ae] rounded-lg shadow-md">
                            Start your adventure
                        </button></a>
                    </div>
                </div>

                <div className='text-5xl mt-28 ml-20 text-gray-800'>
                    <h1>
                        Embark on Unforgettable <br />Adventures
                    </h1>
                </div>

                <div className="bg-[#D7E58D] min-h-screen p-10 mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col items-center p-5">
                            <button className="text-3xl font-bold mb-2">Solo raids<span className="text-3xl">↗</span></button>
                            <img src="/solo.png" className="w-96 h-96 object-cover rounded-3xl mb-4 mt-4" />
                        </div>
                        <div className="flex flex-col items-center p-5">
                            <button className="text-3xl font-bold mb-2">Event raids<span className="text-3xl">↗</span></button>
                            <img src="/event.png" className="w-96 h-96 object-cover rounded-3xl mb-4 mt-4" />
                        </div>
                        <div className="flex flex-col items-center p-5">
                            <button className="text-3xl font-bold mb-2">Welcome to the den<span className="text-3xl">↗</span></button>
                            <img src="/den.png" className="w-96 h-96 object-cover rounded-3xl mb-4 mt-4" />
                        </div>
                        <div className="flex flex-col items-center p-5">
                            <a href="/voyager/opinion"><button className="text-3xl font-bold mb-2">Wizards Opinion<span className="text-3xl">↗</span></button></a>
                            <img src="/opinion.png" className="w-96 h-96 object-cover rounded-3xl mb-4 mt-4" />
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Raids