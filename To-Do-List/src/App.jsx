import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar'
import Board from './components/Board'
import CompleteLists from './components/CompleteLists'
import PropTypes from 'prop-types'; 
import MyBoards from './components/MyBoards';
import History from './components/History';

function App() {
  
  const [clickedItem, setClickedItem] = useState();
  const [clickAddList, setClickAddList] = useState(0);
  const [clickAddBoard, setClickAddBoard] = useState(0);
  const boardNumber = 0;

  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  const handleSidebarItemClick = (item) => {
    const itemId = item.id;
    if(itemId==3 && item!==null)
    {
      setClickedItem(item);
      setClickAddList(prevCounter => prevCounter + 1);
    }
    if(itemId==2 && item!==null)
    {
      setClickedItem(item);
      setClickAddBoard(prevCounter => prevCounter + 1);
    }

  };

  useEffect(() => {
    localStorage.setItem('Board', JSON.stringify(boards));
    /* console.log('Las listas se han actualizado:', lists); */
    }, [boards]);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  useEffect(() => {
    if (clickAddBoard !== null && clickAddBoard!== 0) {
        //console.log("Ítem clickeado:", initialListName);
        setBoards(prevBoards => [...prevBoards, { id: generateUniqueId(), name: 'Titulo de la Tabla', lists: []}]);
    }
  }, [clickAddBoard]);

  useEffect(() => {
    if (clickAddList !== null && clickAddList !== 0) {
      setBoards(prevBoards => {
        const lastBoardIndex = boardNumber;
        const updatedBoards = [...prevBoards];
        updatedBoards[lastBoardIndex].lists.push({ id: generateUniqueId(), name: '', tasks: [] });
        return updatedBoards;
      });
    }
  }, [clickAddList]);

  const handleNameChange = (boardId, newName) => {
    setBoards((currentBoards) => {
      const BoardIndex = boardNumber;
      const updatedBoards = [...currentBoards];
      updatedBoards[BoardIndex].name = newName;

      return updatedBoards;
    });
  };

  const handleListDeleted = (idToDelete) => {
    setBoards((currentBoards) => {
      
      const BoardIndex = boardNumber;
      const updatedBoards = [...currentBoards];
      const indexToDelete = updatedBoards[BoardIndex].lists.findIndex(list => list.id === idToDelete);

      if (indexToDelete === -1) {
          return currentBoards;
      }

      updatedBoards[BoardIndex].lists = updatedBoards[BoardIndex].lists.filter((list, index) => index !== indexToDelete);

      return updatedBoards;

    });
  };

  const handleListNameChange = (idToChange, newName) => {
    setBoards((currentBoards) => {
      const BoardIndex = boardNumber;
      const updatedBoards = [...currentBoards];
      const indexToChange = updatedBoards[BoardIndex].lists.findIndex(list => list.id === idToChange);

      if (indexToChange === -1) {
          return currentBoards;
      }

      updatedBoards[BoardIndex].lists[indexToChange].name = newName;

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

  const handleListTaskDeleted = (boardId, listId, deleteTaskId) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.id === boardId) {
          const updatedLists = board.lists.map(list => {
            if(list.id === listId) {
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

  const handleListTaskCompleted = (boardId, listId, completedTaskId) => {
    setBoards(prevBoards => {
      const updatedBoards = prevBoards.map(board => {
        if (board.id === boardId) {
          const updatedLists = board.lists.map(list => {
            if(list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.map((task) => 
                task.id === completedTaskId ? { ...task, completed: !task.completed } : task
          )}
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
  

  const NuevoTablero = ({ boards }) => {

    if (boards.length === 0) {
      return <p>No hay tableros disponibles.</p>;
    }
  
    const board = boards[boardNumber]
    return (
      <Board
        key={board.id}
        boardName={board.name}
        onBoardTittleChange={(newName) => handleNameChange(board.id, newName)}
        listsToShow={board.lists}
        onListDeleted={(listId) => handleListDeleted(listId)} 
        onListNewName={(listId, newName) => handleListNameChange(listId, newName)}
        onNewTaskAdded={(listId, newTask) => handleListNewTask(board.id, listId, newTask)}
        onTaskDeleted={(listId, taskId) => handleListTaskDeleted(board.id, listId, taskId)}
        onTaskCompleted={(listId, taskId) => handleListTaskCompleted(board.id, listId, taskId)}
      />
    )
  };
  NuevoTablero.propTypes = {
    boards: PropTypes.array,
  };

  
  return (
      <div className='w-full h-screen bg-back object-cover flex items-center'>
        <Router>
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
          <Routes>
            <Route path="/nuevo-tablero" element={<NuevoTablero boards={boards}/>} />
            <Route path="/completadas" element={<CompleteLists />} />
            <Route path="/historial" element={<History />} />
            <Route path="/mis-tableros" element={<MyBoards boards={boards}/>} />
          </Routes>
        </Router>

      </div>
  )
}

export default App