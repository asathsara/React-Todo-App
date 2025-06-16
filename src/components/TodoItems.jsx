import { FaTrash } from "react-icons/fa";


const TodoItems = ({text,id,isComplete,deleteTodo,toggle}) => {
  return (
    <div onClick={()=>toggle(id)} className='flex my-3 gap-2 items-stretch cursor-pointer'>
      
      <input checked={isComplete} type='checkbox'></input>
      <p className={`font-poppins text-lg font-semibold ml-2 ${isComplete ? 'line-through' : ''}`}>{text}</p>

      <FaTrash onClick={()=> deleteTodo(id)} className='cursor-pointer ml-auto'/>

    </div>
  )
}

export default TodoItems