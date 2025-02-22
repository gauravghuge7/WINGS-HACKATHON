import { useEffect, useState } from "react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileView = () => {
  const { loading, fetchData, updateDataUsingPut, sendFormData } = useSendFormData();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);


  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userMobileNumber: "",
    userBio: "",
    userSection: "",
  });

  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    const { data, error } = await fetchData("/api/v1/user/profile/getUserProfile");
    if (error) {
      toast.error(error);
      setError(error);
      return;
    }
  
    toast.success("Profile fetched successfully");
    setFormData(data?.data?.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    console.log("e.target.name => ", e.target);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload (real-time upload to server)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show image preview
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
  
      setIsUploading(true);
      const form = new FormData();
      form.append("photo", file);
  
      const { data, error } = await sendFormData("/api/v1/user/profile/updateUserProfilePhoto", form);
  
      if (error) {
        toast.error("Failed to upload image");
        setError(error);
        setIsUploading(false);
        return;
      }
  
      if (data.success) {
        setFormData((prev) => ({ ...prev, avatar: data.data.avatar }));
        toast.success("Profile picture updated successfully!");
      }
      setIsUploading(false);
    }
  };
  

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("userFirstName", formData.userFirstName);
    form.append("userLastName", formData.userLastName);
    form.append("userEmail", formData.userEmail);
    form.append("userBio", formData.userBio);
    form.append("userLocation", formData.userLocation);
    form.append("userWebsite", formData.userWebsite);

    const { data, error } = await updateDataUsingPut("/api/v1/user/profile/updateUserProfile", form);

    if (error) {
      toast.error(error);
      setError(error);
      return;
    }

    if (data.success) {
      setIsEditing(false);
      fetchProfile(); // Refresh profile after update
      toast.success("Profile updated successfully!");
    }

  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading profile...</p>;


  return (
    <div className="min-h-screen  p-8">
      <ToastContainer position="top-right" autoClose={5000} />
      {error && <p className="text-center text-red-500 mt-10">Error: {error}</p>}
      <div className="max-w-4xl mx-auto p-8 rounded-xl ">
        {!isEditing ? (
          <div className="w-full bg-gradient-to-br p-8 rounded-xl shadow-2xl">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded-t-xl flex items-center justify-center">
            <h2 className="text-black text-4xl font-bold">User Profile</h2>
          </div>
        
          {/* Profile Container */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 -mt-12 p-6">
            
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={formData?.userProfilePicture?.secure_url || "https://randomuser.me/api/portraits/men/1.jpg"}
                alt="Admin Avatar"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

           

            {/* Profile Details */}
            <div className="text-start md:text-left mt-20 ">

              <section className="flex flex-col md:flex-row items-start md:items-start md:space-x-6 -mt-12">
                <h2 className="text-3xl font-semibold text-gray-800">{formData?.userFirstName || "Admin"  &&  formData?.userLastName || "Admin"}</h2>
                <p className="text-lg text-gray-500 items-end">{formData?.userRole || "Admin"}</p>
              </section>

              <p className="text-md text-gray-400 ">
                Joined: {formData?.createdAt ? new Date(formData?.createdAt)?.toLocaleDateString() : "N/A"}
              </p>

              <section className="flex flex-col md:flex-row items-start space-x-4 md:items-start ">
                <p><span className="font-medium">Email:</span> {formData.userEmail || "N/A"}</p>
                <p><span className="font-medium">Mobile:</span> {formData.userMobileNumber || "N/A"}</p>
              </section>
        
              <div className="mt-1 space-y-2 text-gray-600">
                <p><span className="font-medium">Bio:</span> {formData.userBio || "N/A"}</p>
                <p><span className="font-medium">Section:</span> {formData.userSection || "N/A"}</p>
              </div>
        
             
        
              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 px-6 py-2 bg-black text-white text-lg font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        
        ) : (
          <div className="w-full bg-gradient-to-br p-8 rounded-xl shadow-2xl border-2 border-gray-200">
            <h2 className="text-3xl font-bold  text-gray-800 mb-6">Edit Profile</h2>
            <form onSubmit={handleSave} className="space-y-6">

              {/*  Avatar Uploading and Editing  */}
              <div className="flex flex-col items-center space-y-4">

              <div className="relative w-32 h-32">
                <img
                  src={previewImage || formData?.userProfilePhoto?.secure_url}
                  alt="Admin Avatar"
                  className="w-full h-full rounded-full border-4 border-blue-500 object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Change Avatar
                  </span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="userFirstName"
                  value={formData?.userFirstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="userLastName"
                  value={formData?.userLastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Role</label>
                <input
                  type="text"
                  name="userBio"
                  value={formData?.userBio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                <input
                  type="text"
                  name="userMobileNumber"
                  value={formData.userMobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Bio</label>
                <textarea
                  name="userBio"
                  value={formData.userBio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Admin Section</label>
                <input
                  type="text"
                  name="userSection"
                  value={formData.userSection}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;