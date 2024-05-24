import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from "react-redux";

const SharedList = () => {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state)=> state.auth.isToken);
  

  useEffect(()=>{
    fetchSharedTodoList();
  }, [])


  const fetchSharedTodoList = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/shared/list", {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    } finally{
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/shared/list/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };


  const handleMarkAsRead = (id) => {
    axios
      .patch(`http://localhost:3000/shared/list/update/${id}`, {}, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        // Update the todo list item to mark it as read
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, markedRead: true } : todo
          )
        );
      })
      .catch((error) => console.error("Error marking todo as read:", error));
  };

  return (
    <div className="max-w-md mx-auto px-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Shared To-do List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                {todo.markedDone ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleMarkAsRead(todo.id)}
                  >
                    Mark as Done
                  </button>
                )}
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SharedList;
