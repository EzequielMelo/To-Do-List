import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import List from './List';
import PropTypes from 'prop-types'; 

// eslint-disable-next-line react/prop-types
const Board = ({ boardName, listsToShow, onListDeleted, onTittleChange}) => {
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
          onTittleChange(customText);
    };


    const handleListNameChange = (idToChange, newName) => {
        setLists((currentLists) => {
            return currentLists.map((list) => {
                if (list.id === idToChange) {
                    return { ...list, name: newName };
                }
                return list;
            });
        });
    };

    const handleNewTask = (task, idToAddTasks) => {
        setLists((currentLists) => {
            return currentLists.map(list => {
                if (list.id === idToAddTasks) {

                    return {
                        ...list,
                        tasks: [...list.tasks, task]
                    };
                }
                return list;
            });
        });
    };

    const handleTaskCompleted = (listId, taskId) => {
        setLists((currentLists) =>
          currentLists.map((list) =>
            listId === list.id
              ? {...list, tasks: list.tasks.map((task) => 
              task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
              } : list
          )
        );
    };

    const handleTaskDeleted = (listId, taskId) => {
        setLists((currentLists) =>
            currentLists.map((list) =>
            listId === list.id
                ? { ...list, tasks: list.tasks.filter((task) => task.id !== taskId) }
                : list
            )
        );
    };
    /*
    const handleListDeleted = (idToDelete) => {
        setLists((currentLists) => {

            const indexToDelete = currentLists.findIndex(list => list.id === idToDelete);
            
            if (indexToDelete === -1) {
                // Si no se encuentra el ID, no hacemos nada
                return currentLists;
            }

            const updatedLists = currentLists.filter((list, index) => index !== indexToDelete);
            
            return updatedLists;
        });
    };
    */
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
                onTittleChange={(newName) => handleListNameChange(list.id, newName)}
                onListDeleted={() => onListDeleted(list.id)}
                tasks={list.tasks}
                taskToAdd={(newTask) => handleNewTask(newTask, list.id)}
                onTaskClomplete={(taskId) => handleTaskCompleted(list.id, taskId)}
                onTaskDelete={(taskId) => handleTaskDeleted(list.id, taskId)}
                />
            ))}
        </div>
    );
};

Board.propTypes = {
    listsToShow: PropTypes.array, // Asegúrate de que tasks sea un array
  };

export default Board;