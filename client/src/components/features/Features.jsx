import React from 'react';
import { Link } from 'react-router-dom';

const Feature = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 ">
            <div className="container mx-auto h-40 m-20 ">
                <h1 className="text-4xl font-bold text-center mb-8">Event Management Features</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 1</h2>
                        <p className="text-gray-700">Description of feature 1.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 2</h2>
                        <p className="text-gray-700">Description of feature 2.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 3</h2>
                        <p className="text-gray-700">Description of feature 3.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 4</h2>
                        <p className="text-gray-700">Description of feature 4.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 5</h2>
                        <p className="text-gray-700">Description of feature 5.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Feature 6</h2>
                        <p className="text-gray-700">Description of feature 6.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;