
import img1 from '../EventMarketer/image1.jpg';
import img2 from '../EventMarketer/image2.jpg';
import img3 from '../EventMarketer/image3.jpg';
import img4 from '../EventMarketer/image4.jpg';
import img5 from '../EventMarketer/image5.jpg';
import img6 from '../EventMarketer/image6.jpg';



const EventMarketers = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">For Event Marketers</h1>
        <p className="text-lg text-gray-600 mt-2">
          Design and execute with confidence in the new event landscape
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg p-4 transition-transform duration-300 hover:scale-110 hover:shadow-2xl relative overflow-hidden group"
          >
            <img
              src={service.image}
              alt={service.alt}
              className="w-full rounded-lg"
            />
            <h2 className="text-lg font-bold text-gray-800 mt-4">
              {service.title}
            </h2>
            <p className="text-gray-700 mt-2">
              {service.description}
            </p>
            
           
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <p className="text-gray-700 text-center">{service.description}</p>
            </div>

            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 flex items-center mt-3 transition-colors duration-300"
            >
              {service.linkText} <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a
          href="#"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Elevate your events
        </a>
      </div>
    </div>
  );
};

const services = [
  {
    image: img1,
    alt: "Screenshot of Attendee Hub interface",
    title: "MyWebsite Attendee Hub®",
    description: "Build engaging in-person, virtual, and hybrid events",
    linkText: "Build the perfect event"
  },
  {
    image: img2,
    alt: "Screenshot of Registration interface",
    title: "MyWebsite Studio™",
    description: "Easily produce webinars, virtual content, and more",
    linkText: "Improve your video content"
  },
  {
    image: img3,
    alt: "Screenshot of Event Management interface",
    title: "Event Management™",
    description: "Manage your event from start to finish in one place",
    linkText: "Manage it all in one place"
  },
  {
    image: img4,
    alt: "Screenshot of Registration interface",
    title: "MyWebsite Studio™",
    description: "Easily produce webinars, virtual content, and more",
    linkText: "Improve your video content"
  },
  {
    image: img5,
    alt: "Screenshot of Registration interface",
    title: "MyWebsite Studio™",
    description: "Easily produce webinars, virtual content, and more",
    linkText: "Improve your video content"
  },
  {
    image: img6,
    alt: "Screenshot of Registration interface",
    title: "MyWebsite Studio™",
    description: "Easily produce webinars, virtual content, and more",
    linkText: "Improve your video content"
  }
];

export default EventMarketers;