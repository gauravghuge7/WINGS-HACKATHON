/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import exhibitions from './assets/exhibiton.png';
import webinar from './assets/webinar.png';
import training from './assets/training.png';
import Charity from './assets/Charity.png';
const ShowOf = () => {
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        // Create dynamic background elements for text section
        const createTextSectionBackground = () => {
            const container = document.querySelector('.text-section-background');
            for (let i = 0; i < 15; i++) {
                const dot = document.createElement('div');
                dot.className = 'floating-dot';
                dot.style.left = `${Math.random() * 100}%`;
                dot.style.top = `${Math.random() * 100}%`;
                dot.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(dot);
            }
        };

        // Create dynamic background elements for cards section
        const createCardsSectionBackground = () => {
            const container = document.querySelector('.cards-section-background');
            const colors = ['#F0ABFC', '#A5B4FC', '#7DD3FC', '#86EFAC'];
            
            for (let i = 0; i < 20; i++) {
                const shape = document.createElement('div');
                shape.className = 'floating-shape';
                shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                shape.style.left = `${Math.random() * 100}%`;
                shape.style.top = `${Math.random() * 100}%`;
                shape.style.animationDelay = `${Math.random() * 2}s`;
                container.appendChild(shape);
            }
        };

        createTextSectionBackground();
        createCardsSectionBackground();
    }, []);

    const cards = [
        { title: 'Webinars', bgColor: 'from-blue-500 to-cyan-400', imgsrc: webinar },
        { title: 'Exhibitions', bgColor: 'from-purple-500 to-pink-400', imgsrc: exhibitions },
        { title: 'Trainings', bgColor: 'from-orange-500 to-yellow-400', imgsrc: training  },
        { title: 'Charity Event', bgColor: 'from-red-500 to-pink-400', imgsrc:Charity },
    ];
    
    const moreCards = [
        { title: 'Corporate Events', bgColor: 'from-gray-500 to-slate-400'},
        { title: 'Personal Event', bgColor: 'from-green-500 to-teal-400' },
        { title: 'Trip Events', bgColor: 'from-indigo-500 to-blue-400' },
        { title: 'Travelling Events', bgColor: 'from-cyan-500 to-green-400' },
        { title: 'Other Events', bgColor: 'from-violet-500 to-purple-400' },
    ];

    return (
        <div className="relative bg-white py-20 px-4 overflow-hidden*">
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                    100% { transform: translateY(100) rotate(360deg); }
                }

                .text-section-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                    z-index: 0;
                }

                .floating-dot {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: rgba(192, 132, 252, 0.15);
                    border-radius: 50%;
                    animation: float 8s infinite linear;
                    filter: blur(1px);
                }

                .cards-section-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    // overflow: hidden;
                    z-index: 0;
                }

                .floating-shape {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    opacity: 0.1;
                    animation: float 6s infinite linear;
                    // filter: blur(2px);
                    border-radius: 60% 90% 90% 60%;
                }

                .text-content {
                    position: relative;
                    z-index: 10;
                }

                .cards-container {
                    position: relative;
                    z-index: 10;
                }
                `}
            </style>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
                {/* Text Section with Background */}
                <div className="lg:w-1/2 relative top-10">
                    <div className="text-section-background"></div>
                    <div className="text-content space-y-6">
                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Expand Your <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Professional Horizon</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover curated events to enhance your skills, showcase expertise, and connect with industry leaders.
                        </p>
                        <Link
        to="/explore"
        className="relative inline-block px-4 py-2 text-lg font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg transform transition-all duration-500 ease-out hover:scale-110 active:scale-95 overflow-hidden group"
    >
        {/* Outer Glowing Effect */}
        <span className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-red-400 transition-all duration-500 animate-pulse"></span>

        {/* Ripple Effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 transition-all duration-700 transform scale-0 group-hover:scale-150 opacity-40 rounded-lg"></span>

        {/* Text with Hover Effect */}
        <span className="relative z-10 transition-all duration-300 group-hover:tracking-wide group-hover:text-gray-200">
            Explore Now 🚀
        </span>
    </Link>

    </div>
                </div>

                {/* Cards Section with Background */}
                <div className="lg:w-1/2 relative">
                    <div className="cards-section-background"></div>
                    <div className="cards-container grid grid-cols-2 gap-5">
                        {cards.map((card, index) => (
                            <div 
                                key={index}
                                className={`relative p-4 h-20 bg-gradient-to-br ${card.bgColor} rounded-xl text-white 
                                    hover:shadow-2xl cursor-pointer shadow-lg 
                                    transform transition-transform group flex gap-5 items-center`}
                            >
                                <h3 className="text-xl font-semibold relative z-10">{card.title}</h3>
                                <img 
                                    src={card.imgsrc} 
                                    alt={card.title} 
                                    className='absolute w-28 h-28 top-[-30%] right-[-10%] z-20 transition-transform duration-300 group-hover:scale-110' 
                                />
                            </div>
                        ))}
                        <div
                            className="p-6 bg-white rounded-xl border border-gray-100 
                                    hover:border-gray-200 transition-all cursor-pointer
                                    shadow-lg hover:shadow-xl flex items-center justify-center
                                    transform hover:scale-105"
                            onClick={() => setShowMore(!showMore)}
                        >
                            <p className="text-lg font-medium text-gray-700">
                                {showMore ? 'Show Less' : 'More Events'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Section */}
            {showMore && (
                <div className="max-w-6xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {moreCards.map((card, index) => (
                        <div
                            key={index}
                            className={`relative p-6 bg-gradient-to-br ${card.bgColor} rounded-xl text-white 
                                    hover:shadow-2xl cursor-pointer overflow-hidden
                                    shadow-lg hover:scale-105 transform transition-transform`}
                        >
                            <h3 className="text-xl font-semibold relative z-10">{card.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowOf;