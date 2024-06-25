"use client";

import Navbar from '@/app/components/reusable/HomeNavbar';
import React, { useState } from 'react'

const CreateOpinion = () => {
    const [view, setView] = useState('support');
    return (
        <div>
            <Navbar />
            <div className="min-h-screen items-start p-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-3xl">

                    <div className="border-b border-gray-200 mb-4">
                        <div className="flex space-x-4">
                            <button
                                className={`py-2 px-4 rounded bg-gray-300 ${view === 'support' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setView('support')}
                            >
                                Support
                            </button>
                            <button
                                className={`py-2 px-4 rounded bg-gray-300 ${view === 'couchsurfing' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setView('couchsurfing')}
                            >
                                Available for Couchsurfing
                            </button>
                            <button
                                className={`py-2 px-4 rounded bg-gray-300 ${view === 'localGuide' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setView('localGuide')}
                            >
                                Available for Local Guide
                            </button>
                            <button
                                className={`py-2 px-4 rounded bg-gray-300 ${view === 'payInMatic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                onClick={() => setView('payInMatic')}
                            >
                                Pay in MATIC
                            </button>
                        </div>
                    </div>

                    {view === 'support' && (
                        <div>
                            <div className="mb-4 mt-8">
                                <input
                                    type="text"
                                    placeholder="Title*"
                                    maxLength={300}
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <div className="mb-4 mt-8">
                                <input
                                    type="text"
                                    placeholder="Add tags"
                                    className="w-full border border-gray-300 rounded-full p-2"
                                />
                            </div>

                            <div className="mb-4 mt-10">
                                <textarea
                                    placeholder="Body"
                                    className="w-full border border-gray-300 rounded p-2 h-40"
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button className="bg-blue-600 text-white rounded px-4 py-2">
                                    Post
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'couchsurfing' && (
                        <div className="mb-4 mt-8">
                            <p className="text-gray-700 text-2xl">I am available for couchsurfing.</p>
                        </div>
                    )}

                    {view === 'localGuide' && (
                        <div className="mb-4 mt-8">
                            <p className="text-gray-700 text-2xl">I am available for local guide.</p>
                        </div>
                    )}

                    {view === 'payInMatic' && (
                        <div className="mb-4 mt-8">
                            <div className="border border-gray-300 rounded p-4">
                                <p className="text-gray-700 mb-4">Pay with MATIC:</p>
                                <button className="bg-blue-600 text-white rounded px-4 py-2">
                                    Pay now
                                </button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default CreateOpinion