import { useState } from "react"
import { MdEdit } from "react-icons/md";


// eslint-disable-next-line react/prop-types
const List = ({ initialListName }) => {
    const [listName, setListName] = useState(initialListName);
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialListName);

    const handleClick = () => {
      setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (customText.trim() !== '') {
            setListName(customText);
        } else {
            setCustomText(listName); // Revertir al nombre original si el campo está vacío
        }
    };

  return (
    <div className='inline-block bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-40'>
      <div className='bg-slate-600 bg-opacity-60 rounded-full w-fit'>
          {!isEditing 
          ? 
          (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' onClick={handleClick}>{listName}<MdEdit /></h3>) 
          : 
          (<input className='bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleBlur}autoFocus/>)}
      </div>

    </div>
  )
}

export default List
