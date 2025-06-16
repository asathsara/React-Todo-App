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
    <div className="place-self-center min-h-[550px] w-11/12 max-w-[600px] mx-auto bg-white flex flex-col rounded-xl px-8">
      <div className="flex items-center mt-8 gap-2">
        <FaCalendarAlt className="text-2xl text-gray-700" />
        <h1 className="font-poppins text-2xl font-bold text-gray-700">
          Todo App
        </h1>
      </div>

      <div className="bg-gray-100 rounded-full min-h-[50px] flex items-center my-8 w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none ml-8 flex-1 font-poppins font-semibold"
        />
        <motion.button
          whileTap={{ scale: 0.9, y: 5 }}
          whileHover={{ scale: 1.05 }}
          onClick={add}
          className="text-lg rounded-full bg-blue-400 w-32 h-14 text-white font-poppins font-semibold"
        >
          ADD
        </motion.button>
      </div>

      <AnimatePresence>
        {todoList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
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
