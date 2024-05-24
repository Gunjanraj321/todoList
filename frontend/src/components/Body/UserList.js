import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.isToken);

  useEffect(() => {
    fetchUsers();
  }, []);
 

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/shared/users", {
        headers: {
          Authorization: token,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    } finally {
      setLoading(false);
    }
  };
//   console.log("Users:", users); 
  return (
    <div className="user-list">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onSelectUser(user)}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
