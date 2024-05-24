import React from "react";
import TodoList from "./TodoList";
import SharedTodoList from "./SharedTodoList";
import ListForm from "./ListForm";
const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="max-w-lg w-full">
        <ListForm />
      </div>
      <div className="max-w-lg w-full mt-4">
        <TodoList />
      </div>
      <div className="max-w-lg w-full mt-4">
        <SharedTodoList />
      </div>
    </div>
  );
};

export default Home;
