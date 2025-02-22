import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

const ShowSingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const userData = JSON.parse(localStorage?.getItem("data") || "{}");

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/event/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEvent(data.data);
          setLiked(data?.data?.eventLikes.includes(userData._id));
          setBookmarked(data?.data?.bookmarkedBy.includes(userData._id));
          setRegistered(data?.data?.eventRegistedUsers.includes(userData._id));
        }
      })
      .catch(() => toast.error("Failed to load event"))
      .finally(() => setLoading(false));
  }, [id, userData._id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!event) return <div className="text-center p-10">Event not found</div>;

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitRegistration = async () => {

    try {
      const payload = { userId: userData?._id, formData };
      const res = await axios.post(`http://localhost:5000/api/v1/user-event/register-for-event/${id}`, payload);
      if (res.status === 200) {
        toast.success("Registered successfully");
        setRegistered(true);
        setShowModal(false);
        setFormData({});
      } else {
        toast.error("Error registering for event");
      }
    } catch (err) {
      console.log("err => ", err?.response?.data);
      toast.error(err?.response?.data?.message);
    }
  };

  const submitRegistrationOfForm = async (e) => {
    e.preventDefault();
    
    try {
      const payload = { userId: userData?._id, formData };
      const res = await axios.post(`http://localhost:5000/api/v1/user-event/register-for-event/${id}`, payload);
      if (res.status === 200) {
        toast.success("Registered successfully");
        setRegistered(true);
        setShowModal(false);
        setFormData({});
      } else {
        toast.error("Error registering for event");
      }
    } catch (err) {
      console.log("err => ", err?.response?.data);
      toast.error(err?.response?.data?.message);
    }
  };

  const unregisterForEvent = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/user-event/unregister-for-event/${id}`, {userId: userData?._id});
      if(res.status === 200) {
        toast.success("Unregistered successfully");
        setRegistered(false);
      } else {
        toast.error("Error unregistering event");
      }
    } catch(err) {
      toast.error(err.message);
    }
  }



  const handleLike = async () => {

    try {

      if(liked) {
          const res = await axios.post(`http://localhost:5000/api/v1/user-event/dislike/${id}`, {userId: userData?._id});
          if(res.status === 200) {
            toast.success("Disliked successfully");
            setLiked(false);
          } else { 
            toast.error("Error disliking event");
          }
         

        } else {
            const res = await axios.post(`http://localhost:5000/api/v1/user-event/like/${id}`, {userId: userData?._id});
            if(res.status === 200) {
              toast.success("Liked successfully");
              setLiked(true);
            } else {
              toast.error("Error liking event");
            }
        }

    } catch(error) {
        const errorMessage = error?.response?.data?.match(/Error: (.*?)<br>/);
        if (errorMessage) {
            toast.error(errorMessage[1]);
        } else {
            toast.error("An unknown error occurred.");
        }
    }
  
   
  }


  const handleBookmark = async () => {
       
    if(bookmarked) {
      try {
        const res = await axios.post(`http://localhost:5000/api/v1/user-event/unbookmark/${id}`, {userId: userData?._id});
        if(res.status === 200) {
          setBookmarked(false); 
          toast.success("unbookmarked successfully");
        } else {
          toast.error("Error bookmarking event");
        }
      } catch(err) {
         toast.error(err.message); 
      }
    } else {
      try {
        const res = await axios.post(`http://localhost:5000/api/v1/user-event/bookmark/${id}`, {userId: userData?._id});
        if(res.status === 200) {
          setBookmarked(true);
          toast.success("Bookmarked successfully");
        } else {
          toast.error("Error bookmarking event");
        }
      } catch(err) {
         toast.error(err.message);
      }
    }
  }





  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{event.eventTitle}</h1>
        <div className="flex items-center gap-4">
          <button className="text-red-500 text-2xl" onClick={() => handleLike()}>
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <button className="text-blue-500 text-2xl" onClick={() => handleBookmark()}>
            {bookmarked ? <FaBookmark className="text-blue-500" /> : <FaRegBookmark />}
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mt-2">Organized by: {event.eventOrganiser}</p>
      <div className="mt-4">
        <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: event.eventDescription }}></p>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{event.eventSubject}</span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded">{event.eventType}</span>
      </div>

      <div className="mt-4 text-gray-700">
        <p><strong>Location:</strong> {event.eventLocation}</p>
        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.eventTime}</p>
      </div>

      {/* Registration Button */}
      {!registered ? (
        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          onClick={() => (event.eventCustomFormData ? setShowModal(true) : submitRegistration())}
        >
          REGISTER FOR EVENT
        </button>
      ) : (
        <button
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          onClick={() => unregisterForEvent()}
        >
          UNREGISTER
        </button>
      )}

      {/* Edit Event Button (Only for Organizer) */}
      {userData && event.eventOrganiser && event?.eventOrganiser[0] === userData._id && (
        <Link to={`/user/event/edit/${event._id}`}>
          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Edit Event
          </button>
        </Link>
      )}


      {/* Popup Form Modal Start */}


      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Event Registration</h2>
          <form>
            {event.eventCustomFormData.map((field) => (
              <div key={field.id} className="mb-4">
                <label className="block font-medium mb-1">
                  {field.heading} {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "text" && (
                  <input type="text" className="w-full p-2 border rounded-md" onChange={(e) => handleInputChange(field.id, e.target.value)} />
                )}

                {field.type === "radio" && field.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input type="radio" name={field.id} value={option} className="mr-2" onChange={(e) => handleInputChange(field.id, e.target.value)} />
                    <span>{option}</span>
                  </div>
                ))}

                {field.type === "checkbox" && field.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input type="checkbox" value={option} className="mr-2" onChange={(e) => handleInputChange(field.id, e.target.checked)} />
                    <span>{option}</span>
                  </div>
                ))}

                {field.type === "dropdown" && (
                  <select className="w-full p-2 border rounded-md" onChange={(e) => handleInputChange(field.id, e.target.value)}>
                    <option value="">Select</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                )}

                {field.type === "textarea" && (
                  <textarea className="w-full p-2 border rounded-md" onChange={(e) => handleInputChange(field.id, e.target.value)}></textarea>
                )}
              </div>
            ))}

            <div className="flex justify-between mt-4">
              <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setShowModal(false)}>Close</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={(e) => submitRegistrationOfForm(e)}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )}

 {/* Popup Form Modal end */}

      <ToastContainer />
    </div>
  );
};

export default ShowSingleEvent;
