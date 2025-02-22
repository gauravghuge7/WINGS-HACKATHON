const CurrentEventDashboard = ({ event, userDashboard }) => {
      return (
          <div>
              <h1 className="text-2xl font-bold mb-4">Event Dashboard</h1>
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                      <h2 className="text-lg font-bold mb-2">Registered Users</h2>
                      <p>{event.eventRegistedUsers?.length || 0} users registered</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                      <h2 className="text-lg font-bold mb-2">Event Likes</h2>
                      <p>{event.eventLikes?.length || 0} likes</p>
                  </div>
              </div>
          </div>
      );
  };
  
  export default CurrentEventDashboard;