import React, { useEffect, useRef, useState } from "react";

import { FaCalendarAlt } from "react-icons/fa";
import TodoItems from "./TodoItems";

const Todo = () => {
  
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) {
          return { ...todo, isComplete: !todo.isComplete };
        } else {
          return todo;
        }
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="place-self-center min-h-[550px] w-11/12 bg-white max-w-md flex rounded-xl flex-col pr-8 pl-8">
      <div className="flex items-center mt-8   gap-2">
        <FaCalendarAlt className="text-2xl  text-gray-700" />
        <h1 className="font-poppins text-2xl font-bold text-gray-700">
          Todo App
        </h1>
      </div>

      <div className="bg-gray-100 rounded-full min-h-[50px]  flex items-center my-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none ml-8 flex-1 font-poppins font-semibold"
        />
        <button
          onClick={add}
          className="border-none text-lg rounded-full bg-blue-400 w-32 h-14 text-white font-poppins font-semibold"
        >
          ADD
        </button>
      </div>

      {todoList.map((item, index) => {
        return (
          <TodoItems
            key={index}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
          />
        );
      })}
    </div>
  );
};

export default Todo;
