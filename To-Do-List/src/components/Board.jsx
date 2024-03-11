import { useState } from 'react';
import { MdEdit } from "react-icons/md";
import List from './List';
import PropTypes from 'prop-types'; 

// eslint-disable-next-line react/prop-types
const Board = ({ boardName, onBoardTittleChange, listsToShow, onListDeleted, onListNewName, onNewTaskAdded, onTaskDeleted, onTaskCompleted}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(boardName || 'Título de la Tabla');
    
    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleBlur = () => {
        if (customText.trim() === '') {
            setCustomText('Título de la Tabla');
            }
            setIsEditing(false);
        onBoardTittleChange(customText);
    };

    return (
        <div className={`list-container`}>
            {!isEditing 
            ? 
            (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3' onClick={handleClick}>{customText}<MdEdit /></h3>) 
            : 
            (<input className='flex w-80 bg-slate-600 bg-opacity-60 rounded-full px-[10px] py-[2px] mb-3' type="text" value={customText} onChange={handleChange} onBlur={handleBlur} autoFocus/>)}
            {listsToShow && listsToShow.map((list) => (
                <List 
                key={list.id} 
                initialListName={list.name} 
                onTittleChange={(newName) => onListNewName(list.id, newName)}
                onListDeleted={() => onListDeleted(list.id)}
                tasks={list.tasks}
                taskToAdd={(newTask) => onNewTaskAdded(list.id, newTask)}
                onTaskClomplete={(taskId) => onTaskCompleted(list.id, taskId)}
                onTaskDelete={(taskId) => onTaskDeleted(list.id, taskId)}
                />
            ))}
        </div>
    );
};

Board.propTypes = {
    listsToShow: PropTypes.array, // Asegúrate de que tasks sea un array
};

export default Board;