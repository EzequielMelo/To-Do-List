import List from './List';
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TbListCheck } from "react-icons/tb";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';

const BoardSelected = () => {
  const [boardInUseIndex, setBoardInUseIndex] = useState(() => {
    let savedBoards = JSON.parse(localStorage.getItem('Board'));
    return savedBoards ? savedBoards.findIndex(board => board.boardSelected) : 0;
  });
  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  const [completeList, setCompleteList] = useState(() => {
    let savedLists = localStorage.getItem('CompleteList');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    const index = boards.findIndex(board => board.boardSelected);
    if (index !== -1) {
      setBoardInUseIndex(index);
    } else {
      setBoardInUseIndex(0);
    }
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('Board', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('CompleteList', JSON.stringify(completeList));
  }, [completeList]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getItemPos = (board, id) => board.lists.findIndex(boardList => boardList.id === id);

  function handleDragEnd(event) {
    const { active, over } = event;

    // Si la lista se deja caer en el mismo lugar, no hacemos nada
    if (active.id === over.id) return;

    setBoards(boards => {
      // Copiamos los tableros para no mutar el estado directamente
      const updatedBoards = [...boards];

      // Obtenemos el tablero activo
      const targetBoard = updatedBoards[boardInUseIndex];

      // Obtenemos la posición original y la nueva posición de la lista dentro del mismo tablero
      const originalPos = getItemPos(targetBoard, active.id);
      const newPos = getItemPos(targetBoard, over.id);

      // Reordenamos las listas dentro del mismo tablero utilizando array-move
      targetBoard.lists = arrayMove(targetBoard.lists, originalPos, newPos);

      return updatedBoards;
    });
  }

  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');

  // Verificar si hay una board seleccionada
  const isBoardSelected = boardInUseIndex !== -1 && boards.length > 0;

  // Si no hay una board seleccionada, mostrar un mensaje
  if (!isBoardSelected) {
    return <p>No hay tableros disponibles xd.</p>;
  }

  // Si hay una board seleccionada, obtener la board actual
  const board = boards[boardInUseIndex];

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setCustomText(e.target.value);
  };

  const handleNameChange = (boardId, newName) => {
    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      updatedBoards[boardInUseIndex].name = newName;

      return updatedBoards;
    });
  };

  const handleBlur = () => {
    let updatedText = customText.trim();
    if (updatedText === '') {
      updatedText = 'Título de la Tabla';
      setCustomText(updatedText);
    }
    setIsEditing(false);
    handleNameChange(board.id, updatedText);
  };

  const handleListNameChange = (idToChange, newName) => {
    setBoards((currentBoards) => {
      const updatedBoards = [...currentBoards];
      const indexToChange = updatedBoards[boardInUseIndex].lists.findIndex(list => list.id === idToChange);

      if (indexToChange === -1) {
        return currentBoards;
      }

      updatedBoards[boardInUseIndex].lists[indexToChange].name = newName;

      return updatedBoards;
    });
  };

  const handleListDeleted = (idToDelete) => {
    setBoards((currentBoards) => {

      const updatedBoards = [...currentBoards];
      const indexToDelete = updatedBoards[boardInUseIndex].lists.findIndex(list => list.id === idToDelete);

      if (indexToDelete === -1) {
        return currentBoards;
      }

      updatedBoards[boardInUseIndex].lists = updatedBoards[boardInUseIndex].lists.filter((list, index) => index !== indexToDelete);

      return updatedBoards;

    });
  };

  const handleListNewTask = (boardId, listId, newTask) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.id === boardId) {
          const updatedLists = board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: [...list.tasks, newTask]
              };
            }
            return list;
          });
          return {
            ...board,
            lists: updatedLists
          };
        }
        return board;
      });
      return updatedBoards;
    });
  };

  const handleListTaskCompleted = (boardId, listId, completedTaskId) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.id === boardId) {
          const updatedLists = board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === completedTaskId ? { ...task, completed: !task.completed } : task
                )
              }
            }
            return list
          })
          return {
            ...board,
            lists: updatedLists
          }
        }
        return board
      })
      return updatedBoards
    })
  }

  const handleListTaskDeleted = (boardId, listId, deleteTaskId) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.id === boardId) {
          const updatedLists = board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.filter(task => task.id !== deleteTaskId)
              }
            }
            return list
          })
          return {
            ...board,
            lists: updatedLists
          }
        }
        return board
      })
      return updatedBoards
    })
  }

  const handleListCompleted = (idToComplete) => {
    setBoards((currentBoards) => {
      // Encuentra el tablero en uso
      const board = currentBoards[boardInUseIndex];

      // Encuentra la lista a completar
      const listIndex = board.lists.findIndex(list => list.id === idToComplete);
      if (listIndex === -1) {
        return currentBoards;
      }
      const completedList = board.lists[listIndex];
      console.log(completedList);
      console.log(listIndex);
      setCompleteList(prevCompleteLists => {
        if (completedList.tasks.length >= 1) {
          console.log("entro")
          let newCompleteList = [...prevCompleteLists, completedList];
          // Verificar si se supera el límite máximo
          if (newCompleteList.length > 12) {
            // Eliminar las primeras listas para mantener el tamaño máximo
            newCompleteList = newCompleteList.slice(newCompleteList.length - 12);
          }
          return newCompleteList;
        } else {
          return prevCompleteLists;
        }
      });

      // Elimina la lista del tablero en uso
      const updatedBoard = {
        ...board,
        lists: board.lists.filter((_, index) => index !== listIndex)
      };

      // Actualiza el tablero en uso en boards
      const updatedBoards = [...currentBoards];
      updatedBoards[boardInUseIndex] = updatedBoard;

      return updatedBoards;
    });
  };

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  const handleAddList = () => {
    setBoards(prevBoards => {

      /*
      if (prevBoards.length < 1 || boardInUseIndex === -1) {
        toast.error("No hay un tablero seleccionado", {
          position: "top-right",
          style: {
            background: '#212121',
            color: "white"
          },
        });
        return prevBoards;
      }
      */
      const updatedBoards = [...prevBoards];
      updatedBoards[boardInUseIndex].lists.push({ id: generateUniqueId(), name: 'Titulo de la Lista', tasks: [] });
      return updatedBoards;
    });
  };

  return (
    <div className={`list-container`}>
      {!isEditing ? (
        <h3 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3' onClick={handleClick}>{board.name}<MdEdit /></h3>
      ) : (
        <input className='flex w-80 bg-slate-600 bg-opacity-60 rounded-full px-[10px] py-[2px] mb-3' type="text" value={customText} onChange={handleChange} onBlur={handleBlur} autoFocus />
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={board.lists}
          strategy={rectSwappingStrategy}
        >
          {board.lists && board.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              initialListName={list.name}
              onTittleChange={(newName) => handleListNameChange(list.id, newName)}
              onListDeleted={() => handleListDeleted(list.id)}
              tasks={list.tasks}
              taskToAdd={(newTask) => handleListNewTask(board.id, list.id, newTask)}
              onTaskClomplete={(taskId) => handleListTaskCompleted(board.id, list.id, taskId)}
              onTaskDelete={(taskId) => handleListTaskDeleted(board.id, list.id, taskId)}
              onListComplete={() => handleListCompleted(list.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className='sticky-div flex items-center justify-center gap-2' onClick={() => handleAddList()}>
        <TbListCheck
          className=" size-7 text-slate-600"
        />
        <h3 className='text-lg text-slate-600'>Nueva lista</h3>
      </div >
    </div>
  );
};
BoardSelected.propTypes = {
  boards: PropTypes.array,
  boardToShow: PropTypes.number,
  handleNameChange: PropTypes.func,
  handleListDeleted: PropTypes.func,
  handleListNameChange: PropTypes.func,
  handleListNewTask: PropTypes.func,
  handleListTaskDeleted: PropTypes.func,
  handleListTaskCompleted: PropTypes.func,
  handleListCompleted: PropTypes.func,
};

export default BoardSelected
