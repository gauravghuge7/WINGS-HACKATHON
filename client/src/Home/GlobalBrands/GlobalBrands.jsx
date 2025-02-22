/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';


const GlobalBrands = () => {
  const logos = [
    { alt: "Google logo", src: "https://cdn.pixabay.com/photo/2015/10/31/12/54/google-1015751_1280.png"  },
    { alt: "asian-Paints logo", src: "https://i.pinimg.com/originals/80/61/2d/80612d717e3e8d70fe1c456f2235a5dc.png" },
    { alt: "Snapchat logo", src: "https://img.freepik.com/premium-vector/square-snapchat-logo-isolated-white-background_469489-894.jpg" },
    { alt: "Hackerearth logo", src: "https://www.hackerearth.com/recruit/homepage-files/assets/images/hackerEarth-logo.svg" },
    { alt: "Meta logo", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/2560px-Meta-Logo.png" },
    { alt: "Volkswagen logo", src: "https://upload.wikimedia.org/wikinews/en/d/d3/Volkswagen_logo.png" },
    { alt: "Amazon logo", src: "https://static.vecteezy.com/system/resources/thumbnails/014/018/563/small/amazon-logo-on-transparent-background-free-vector.jpg" },
    { alt: "BMW logo", src: "https://cdn.pixabay.com/photo/2016/08/15/18/18/bmw-1596080_1280.png" },
    { alt: "SBI logo", src: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/State_Bank_of_India_logo.svg/2560px-State_Bank_of_India_logo.svg.png"  },
    { alt: "Mahindra logo", src: "https://download.logo.wine/logo/Mahindra_%26_Mahindra/Mahindra_%26_Mahindra-Logo.wine.png"  },

  ];

  

  return (
    <div className="  ">
      <h1 className="text-lg font-bold mb-8 text-gray-800 text-bold text-center">
      We've worked with global brands
      </h1>
      <div className="flex space-x-16 overflow-hidden group">
        <div className="flex space-x-16 animate-loop-scroll group-hover:paused">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-12 max-w-none object-contain"
            />
          ))}
        </div>

        <div className="flex space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true" > 
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-12 max-w-none object-contain"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default GlobalBrands;
