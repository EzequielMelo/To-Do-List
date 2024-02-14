import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import List from './List';

// eslint-disable-next-line react/prop-types
const Board = ({ initialBoardName }) => {
    const [boardName, setBoardName] = useState(initialBoardName);
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialBoardName);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (customText.trim() !== '') {
            setBoardName(customText);
        } else {
            setCustomText(boardName); // Revertir al nombre original si el campo está vacío
        }
    };

    return (
        <div className={`list-container`}>
            {!isEditing 
            ? 
            (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' onClick={handleClick}>{boardName}<MdEdit /></h3>) 
            : 
            (<input className='bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleBlur}autoFocus/>)}
            <List />
        </div>
    );
};

export default Board;