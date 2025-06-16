import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
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
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="place-self-center min-h-[550px] w-11/12 bg-white max-w-md flex rounded-xl flex-col pr-8 pl-8">
      <div className="flex items-center mt-8 gap-2">
        <FaCalendarAlt className="text-2xl text-gray-700" />
        <h1 className="font-poppins text-2xl font-bold text-gray-700">
          Todo App
        </h1>
        
      </div>

      <div className="bg-gray-100 rounded-full min-h-[50px] flex items-center my-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none ml-8 flex-1 font-poppins font-semibold"
        />
        <motion.button
          whileTap={{ scale: 0.9, y: 5 }} // Animate button press: scale and move slightly down
          whileHover={{ scale: 1.05 }} // Hover animation: slightly grow
          onClick={add}
          className="border-none text-lg rounded-full bg-blue-400 w-32 h-14 text-white font-poppins font-semibold"
        >
          ADD
        </motion.button>
      </div>

      <AnimatePresence>
        {todoList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }} // Entry animation: slide in from left
            animate={{ opacity: 1, x: 0 }} // Animate while in DOM: normal position
            exit={{ opacity: 0, x: -20 }} // Exit animation: slide to the left and fade out
            transition={{ duration: 0.3 }} // Smooth animation
          >
            <TodoItems
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Todo;
