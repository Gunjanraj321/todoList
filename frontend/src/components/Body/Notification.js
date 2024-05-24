import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Notifications = ({ user }) => {
  const token = useSelector((state) => state.auth.isToken);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:3000/shared/notify", {
        params: { user },
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data)
      setNotifications(response.data);
    } catch (error) {
      console.error("There was an error fetching notifications!", error);
    }
  };

  const handleAction = async (id, status) => {
    console.log(id,status);
    
    try {
      if(status){
        await axios.delete(
          `http://localhost:3000/shared/notify/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }else{
        await axios.patch(
          `http://localhost:3000/shared/notify/${id}`,{},
          {
            headers: {
              Authorization: token,
            },
          }
        )
      }
    

      fetchNotifications();
    } catch (error) {
      console.error("There was an error updating the notification!", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="relative inline-block">
        <button
          className="text-xl font-bold"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          Notifications
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute z-10 right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg">
            {notifications.length === 0 ? (
              <p className="p-2">No notifications</p>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-2 border-b border-gray-200"
                  >
                    <p>Task ID: {notification.taskId} shared with you</p>
                    <button
                      className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAction(notification.id,true)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleAction(notification.id, false)}
                    >
                      Decline
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
