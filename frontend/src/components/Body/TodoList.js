import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserList from "./UserList"; // Make sure to import the UserList component

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const token = useSelector((state) => state.auth.isToken);
  const shareButtonRef = useRef(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/list/getList", {
        headers: {
          Authorization: token,
        },
      });
      setTodos(response.data.lists);
    } catch (error) {
      console.error("There was an error fetching the to-dos!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/list/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log(`Todo item with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error("Error deleting todo item:", error);
    }
  };

  const handleMarkAsDone = async (id, markedDone) => {
    try {
      if (!markedDone) {
        await axios.patch(`http://localhost:3000/list/${id}`, {}, {
          headers: {
            Authorization: token,
          },
        });
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, markedDone: true } : todo
          )
        );
      }
      console.log(`Todo item with ID ${id} marked as done successfully!`);
    } catch (error) {
      console.error("Error marking todo item as done:", error);
    }
  };

  const handleShare = (todo) => {
    setSelectedTodo(todo);
    setShowUserList(true);
  };

  const handleSelectUser = async (user) => {
    try {
      const shareData = {
        todoId: selectedTodo.id,
        userId: user.id,
      };
      console.log(selectedTodo.id)
      await axios.post(`http://localhost:3000/shared/${user.id}`, shareData, {
        headers: {
          Authorization: token,
        },
      });
      console.log(`Todo item with ID ${selectedTodo.id} shared with user ID ${user.id} successfully!`);
    } catch (error) {
      console.error("Error sharing todo item:", error);
    } finally {
      setShowUserList(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b py-2 relative"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
                {todo.markedDone ? (
                  <p className="text-green-500">Completed</p>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => handleMarkAsDone(todo.id, todo.markedDone)}
                  >
                    Mark as Done
                  </button>
                )}
              </div>
              <div>
                <button
                  ref={shareButtonRef}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => handleShare(todo)}
                >
                  Share
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
              {showUserList && selectedTodo === todo && (
                <UserList
                  onSelectUser={handleSelectUser}
                  buttonRef={shareButtonRef}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
