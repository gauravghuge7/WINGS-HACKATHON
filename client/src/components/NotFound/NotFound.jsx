// import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import A1 from '../../assets/Lotieejson/404.json';
import A2 from '../../assets/Lotieejson/404a.json';
import A3 from '../../assets/Lotieejson/404b.json';
const animation = [A1,A2,A3]
let Random = animation[Math.floor(Math.random()*animation.length)]
// console.log(Math.random());
// console.log(Math.floor(Math.random()))
// console.log(Math.floor(Math.random()*animation.length))
const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                {/* <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p> */}
                <div style={{width:300, height:300}}>
                    <Lottie animationData={Random} loop={true} />
                </div>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;