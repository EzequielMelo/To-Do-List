import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import List from './List';

// eslint-disable-next-line react/prop-types
const Board = ({ initialBoardName, initialListName }) => {
    const [boardName, setBoardName] = useState(initialBoardName);
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialBoardName);
    const [lists, setLists] = useState([]);

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

    useEffect(() => {
        if (initialListName !== null) {
            //console.log("Ítem clickeado:", initialListName);
            setLists(prevLists => [...prevLists, <List key={`list-${prevLists.length}`} />]);
        }
    }, [initialListName]);

    return (
        <div className={`list-container`}>
            {!isEditing 
            ? 
            (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' onClick={handleClick}>{boardName}<MdEdit /></h3>) 
            : 
            (<input className='bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px]' type="text" value={customText} onChange={handleChange} onBlur={handleBlur}autoFocus/>)}
            {lists.map(list => list)}
        </div>
    );
};

export default Board;