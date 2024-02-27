import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import List from './List';

// eslint-disable-next-line react/prop-types
const Board = ({ initialBoardName, initialListName }) => {
    const [boardName, setBoardName] = useState(initialBoardName);
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialBoardName);
    const [lists, setLists] = useState(() => {
        let savedLists = localStorage.getItem('list');
        return savedLists ? JSON.parse(savedLists) : [];
    });
    
    useEffect(() => {
    localStorage.setItem('list', JSON.stringify(lists));
    /* console.log('Las listas se han actualizado:', lists); */
    }, [lists]);
    

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
        if (initialListName !== null && initialListName!== 0) {
            //console.log("Ítem clickeado:", initialListName);
            setLists(prevLists => [...prevLists, { id: generateUniqueId(), name: '', tasks: [] }]);
        }
    }, [initialListName]);

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
                    // Agrega la nueva tarea a la lista correspondiente
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
    
    const handleListDeleted = (idToDelete) => {
        setLists((currentLists) => {
            // Encuentra el índice del elemento con el ID deseado
            const indexToDelete = currentLists.findIndex(list => list.id === idToDelete);
            
            if (indexToDelete === -1) {
                // Si no se encuentra el ID, no hacemos nada
                return currentLists;
            }
    
            // Crea una nueva lista sin el elemento que tiene el ID deseado
            const updatedLists = currentLists.filter((list, index) => index !== indexToDelete);
            
            return updatedLists;
        });
    };

    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    return (
        <div className={`list-container`}>
            {!isEditing 
            ? 
            (<h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3' onClick={handleClick}>{boardName}<MdEdit /></h3>) 
            : 
            (<input className='flex w-80 bg-slate-600 bg-opacity-60 rounded-full px-[10px] py-[2px] mb-3' type="text" value={customText} onChange={handleChange} onBlur={handleBlur}autoFocus/>)}
            {lists && lists.map((list) => (
                <List 
                key={list.id} 
                initialListName={list.name} 
                onTittleChange={(newName) => handleListNameChange(list.id, newName)}
                onListDeleted={() => handleListDeleted(list.id)}
                tasks={list.tasks}
                taskToAdd={(newTask) => handleNewTask(newTask, list.id)}
                onTaskClomplete={(taskId) => handleTaskCompleted(list.id, taskId)}
                onTaskDelete={(taskId) => handleTaskDeleted(list.id, taskId)}
                />
            ))}
        </div>
    );
};

export default Board;