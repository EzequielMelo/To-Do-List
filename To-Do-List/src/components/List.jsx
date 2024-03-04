import { useState } from "react"
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types'; 


// eslint-disable-next-line react/prop-types
const List = ({ initialListName, onTittleChange, onListDeleted, tasks, taskToAdd, onTaskClomplete, onTaskDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialListName || 'Título de la lista');
    const[newTask, setNewTask] = useState({
        name: "",
    });

    const handleClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleTittleBlur = () => {
      if (customText.trim() === '') {
        setCustomText('Título de la lista');
        }
        setIsEditing(false);
      onTittleChange(customText);
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      if (value.length > 25 && value.includes(" ")) {
          const newValue = value.replace(/(.{25})\s/g, '$1\n');
          setNewTask((inputTask) => ({ ...inputTask, [name]: newValue }));
      } else {
          setNewTask((inputTask) => ({ ...inputTask, [name]: value }));
      }
  };

    const handleAddNewTask = (event) => {
      event.preventDefault();

      if (newTask.name.trim() !== "") 
      {
          taskToAdd({...newTask, id: Math.floor(Math.random() * 9999), completed: false});
          setNewTask({name: ""});
      }
    }

  return (
    <div className=' inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-80 gap-3'>      
      <div className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full'>
          {!isEditing 
          ? 
          (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-72 px-[10px] py-[2px] justify-between items-center' onClick={handleClick}>{customText}<MdEdit /></h3>) 
          : 
          (<input className='bg-slate-600 bg-opacity-60 rounded-2xl w-full px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleTittleBlur} autoFocus/>)}
      </div>
      <div>       
            <ul>
            {tasks && tasks.map((task) => (
              <li className="flex bg-slate-600 bg-opacity-60 rounded-2xl px-[10px] py-[2px] w-full max-w-72 mb-1 justify-between"
               key={task.id}>
                <span className="flex max-w-72 w-fit" style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
                  {task.name}
                </span>
                <span className="flex gap-x-1 items-center pl-2">
                  <FaCheck onClick={() => {onTaskClomplete(task.id)}}/>
                  <FaTrash onClick={() => {onTaskDelete(task.id)}}/>
                </span>
              </li>
            ))}
            </ul>
      </div>
      <div className='flex w-full'>
            <input name="name" className='bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-72 px-[10px] py-[2px] my-2' value={newTask.name} onChange={handleInputChange}></input>
      </div>
      <div className='flex w-full justify-center gap-2'>
        <div className="inline-grid w-fit place-items-center">
          <IoIosAddCircleOutline 
          className="size-7 text-slate-600"
          onClick={handleAddNewTask}
          />
          <h3 className="flex text-xs text-slate-600">Añadir Tarea</h3>
        </div>
        <div className="inline-grid w-fit place-items-center">
          <IoTrashOutline 
          className="size-7 text-slate-600"
          onClick={() => { onListDeleted() } }
          />
          <h3 className="flex text-xs text-slate-600">Eliminar Lista</h3>
        </div>
      </div>
    </div>
  )
}

List.propTypes = {
  initialListName: PropTypes.string,
  onTittleChange: PropTypes.func,
  onListDeleted: PropTypes.func,
  tasks: PropTypes.array,
  taskToAdd: PropTypes.func,
  onTaskClomplete: PropTypes.func,
};

export default List
