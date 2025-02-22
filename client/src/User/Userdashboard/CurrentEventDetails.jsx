const CurrentEventDetail = ({ event, userDashboard }) => {
      return (
          <div>
              <h1 className="text-2xl font-bold mb-4">{event.eventTitle}</h1>
              <p className="text-gray-600 mb-4">{event.eventDescription}</p>
              <p className="text-gray-600 mb-4">
                  <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">
                  <strong>Location:</strong> {event.eventLocation}
              </p>
              <div className="mt-6">
                  <h2 className="text-xl font-bold mb-2">Organizer Details</h2>
                  <p>
                      <strong>Name:</strong> {userDashboard.userFirstName} {userDashboard.userLastName}
                  </p>
                  <p>
                      <strong>Email:</strong> {userDashboard.email}
                  </p>
              </div>
          </div>
      );
  };
  
  export default CurrentEventDetail;