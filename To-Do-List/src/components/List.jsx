import { useState } from "react"
import { MdEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";


// eslint-disable-next-line react/prop-types
const List = ({ initialListName, onTittleChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialListName || 'Título de la lista');

    const handleClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };
    /*
    const handleBlur = () => {
        setIsEditing(false);
        if (customText.trim() !== '') {
            setListName(customText);
        } else {
            setCustomText(listName); // Revertir al nombre original si el campo está vacío
        }
    };
*/
    const handleTittleBlur = () => {
      if (customText.trim() === '') {
        setCustomText('Título de la lista'); // Restaurar el título por defecto si el texto está vacío
        }
        setIsEditing(false);
      onTittleChange(customText);
    };

  return (
    <div className='inline-block bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-72'>
      
      <div className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit'>
          {!isEditing 
          ? 
          (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit max-w-64 px-[10px] py-[2px] justify-between' onClick={handleClick}>{customText}<MdEdit /></h3>) 
          : 
          (<input className='bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleTittleBlur} autoFocus/>)}
      </div>
      <div>
            <ul>
              <li>

              </li>
            </ul>
      </div>
      <div className='flex w-fit'>
            <input className='bg-slate-600 bg-opacity-60 rounded-3xl w-fit px-[10px] py-[2px] my-2 resize-none'></input>
      </div>
      <div className='flex w-full justify-center gap-5'>
        <div className="inline-grid w-fit place-items-center">
          <IoIosAddCircleOutline className="size-7"/>
          <h3 className="flex text-xs">Añadir Tarea</h3>
        </div>
        <div className="inline-grid w-fit place-items-center">
          <IoTrashOutline className="size-7"/>
          <h3 className="flex text-xs">Eliminar Lista</h3>
        </div>
      </div>
    </div>
  )
}

export default List
