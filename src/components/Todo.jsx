import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import TodoItems from './TodoItems';

const Todo = () => {
  return (
    <div className='place-self-center min-h-[550px] w-11/12 bg-white max-w-md flex rounded-xl flex-col pr-8 pl-8'>

      <div className='flex items-center mt-8   gap-2'>
      <FaCalendarAlt className='text-2xl  text-gray-700' />
        <h1 className='font-poppins text-2xl font-bold text-gray-700'>Todo App</h1>
      </div>

      <div className='bg-gray-100 rounded-full min-h-[50px] mt-8 flex items-center'>
  <input
    type="text"
    placeholder="Add your task"
    className='bg-transparent border-0 outline-none ml-8 flex-1 font-poppins font-semibold'
        />
        <button className='border-none text-lg rounded-full bg-gray-900 w-32 h-14 text-white font-poppins font-semibold'>
    ADD
        </button>
        
  
</div>

      <TodoItems/>

    </div>
  )
}

export default Todo