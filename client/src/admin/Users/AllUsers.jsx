import React, { useEffect, useState, useCallback } from "react";
import useSendFormData from "../../Hooks/useSendFormData/useSendFormData";
import { toast, ToastContainer } from 'react-toastify';
import debounce from 'lodash.debounce';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, fetchData, sendFormData } = useSendFormData(); // Add sendData for POST/PUT requests
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");

  // Fetch users with pagination and search
  const fetchUsers = async (page = currentPage, email = searchEmail, name = searchName) => {
    
    try {
      const { data, error } = await fetchData(
        `/api/v1/admin/getAllUsers?page=${page}&limit=${itemsPerPage}&email=${email}&name=${name}`
      );

      if (error) {
        console.error("Error => ", error);
        toast.error(error.message || "An error occurred");
        setError(error.message);
        return;
      }

      setUsers(data?.data?.users);
      setTotalUsers(data?.total);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
      setError("Failed to fetch users");
    }
  };

  // Debounced fetch function
  const debouncedFetchUsers = useCallback(
    debounce((page, email, name) => {
      fetchUsers(page, email, name);
    }, 300),
    []
  );

  // Fetch users on page change
  useEffect(() => {
    fetchUsers(currentPage, searchEmail, searchName);
  }, [currentPage]);

  // Handle search button click
  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page when searching
    fetchUsers(1, searchEmail, searchName);
  };

  // Handle input changes
  const handleSearchEmailChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  // Handle block/unblock user
  const handleBlockUnblock = async (userId, isBlocked) => {
    try {

      console.log(userId, isBlocked);

      let newStatus = isBlocked;

      if(isBlocked === true) {
        newStatus = false;
      }
      else if(isBlocked === false) {
        newStatus = true;
      }

      const { data, error } = await sendFormData(
        `/api/v1/admin/blockUnblockUser/${userId}`,
        { isBlocked: newStatus },
      );

      if (error) {
        toast.error(error.message || "Failed to update user status");
        return;
      }

      console.log("data => ",data);

      // Update the user's isBlocked status in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: !isBlocked } : user
        )
      );

      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`);
    } 
    catch (err) {
      console.error("Error updating user status:", err);
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h2>

      {/* Search Inputs */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={handleSearchEmailChange}
          className="px-4 py-2 border rounded"
          aria-label="Search by Email"
        />
        <input
          type="text"
          placeholder="Search by Name"
          value={searchName}
          onChange={handleSearchNameChange}
          className="px-4 py-2 border rounded"
          aria-label="Search by Name"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Blocked</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b text-center">
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">{user.userFirstName}</td>
                    <td className="px-4 py-2">{user.userLastName}</td>
                    <td className="px-4 py-2">{user.userEmail}</td>
                    <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{user.isBlocked ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleBlockUnblock(user._id, user.isBlocked)}
                        className={`${
                          user.isBlocked ? "bg-green-500" : "bg-red-500"
                        } text-white px-3 py-1 rounded hover:${
                          user.isBlocked ? "bg-green-600" : "bg-red-600"
                        } mr-2`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-2 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} users
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            aria-label="Previous Page"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage * itemsPerPage >= totalUsers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;