import { useState } from "react"
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types'; 


// eslint-disable-next-line react/prop-types
const List = ({ initialListName, onTittleChange, onListDeleted, tasks, taskToAdd }) => {
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
        setCustomText('Título de la lista'); // Restaurar el título por defecto si el texto está vacío
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
      // Se utiliza para que no se recargue la pagina
      event.preventDefault();

      if (newTask.name.trim() !== "") 
      {
          taskToAdd({...newTask, id: Math.floor(Math.random() * 9999)});
          setNewTask({name: ""});
      }
    }

  return (
    <div className=' inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-72 gap-3'>      
      <div className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit'>
          {!isEditing 
          ? 
          (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit max-w-64 px-[10px] py-[2px] justify-between' onClick={handleClick}>{customText}<MdEdit /></h3>) 
          : 
          (<input className='bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleTittleBlur} autoFocus/>)}
      </div>
      <div>       
            <ul>
            {tasks && tasks.map((task) => (
              <li className="flex bg-slate-600 bg-opacity-60 rounded-full px-[10px] py-[2px] w-full mb-1"
               key={task.id}>
                <span>{task.name}</span>
              </li>
            ))}
            </ul>
      </div>
      <div className='flex w-fit'>
            <input name="name" className='bg-slate-600 bg-opacity-60 rounded-3xl w-fit px-[10px] py-[2px] my-2 resize-none' value={newTask.name} onChange={handleInputChange}></input>
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
  tasks: PropTypes.array, // Asegúrate de que tasks sea un array
  taskToAdd: PropTypes.func,
};

export default List
