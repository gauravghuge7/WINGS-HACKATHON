import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-300 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-full w-full flex flex-col items-center m-14">
       

        {/* Content */}
        <div className="w-full flex flex-row justify-between items-center gap-6 md:flex-">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold text-gray-800">
              Terms and Conditions
            </h1>
            <p className="text-gray-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4 mt-6">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
                More details
              </button>
              <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-full">
                View demo
              </button>
            </div>
          </div>


          <div className="w-full h-auto ">
            <img
              src="https://bahamaseducationmix.com/public/website/img/login_imgbanner.png"
              alt="Illustration of terms and conditions"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-gray-600 text-sm mt-6">All rights reserved</div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
