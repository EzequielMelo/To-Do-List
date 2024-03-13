import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar'
import CompleteLists from './components/CompleteLists'
import MyBoards from './components/MyBoards';
import History from './components/History';
import BoardSelected from './components/BoardSelected';

function App() {
  
  const [clickedItem, setClickedItem] = useState();
  const [clickAddList, setClickAddList] = useState(0);
  const [clickAddBoard, setClickAddBoard] = useState(0);
  const boardNumber = 0;

  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  //hacer aca la obtencion del index de la board que contiene el campo boardSelected en true
  //para reemplazar el boardNumber=0 ademas con cada actualizacion del useState boards es mejor desde aca
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
    }, [boards]);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  useEffect(() => {
    if (clickAddBoard !== null && clickAddBoard !== 0) {
      const newBoard = { id: generateUniqueId(), name: 'Titulo de la Tabla', lists: [], boardSelected: true };
      
      if (boards.length > 0) {
        const updatedBoards = boards.map(board => ({ ...board, boardSelected: false }));
        // eslint-disable-next-line no-unused-vars
        setBoards(prevBoards => [...updatedBoards, newBoard]);
      } else {
        setBoards(prevBoards => [...prevBoards, newBoard]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickAddBoard]);

  useEffect(() => {
    if (clickAddList !== null && clickAddList !== 0) {
      setBoards(prevBoards => {
        const lastBoardIndex = boardNumber;
        const updatedBoards = [...prevBoards];
        updatedBoards[lastBoardIndex].lists.push({ id: generateUniqueId(), name: 'Titulo de la Lista', tasks: [] });
        return updatedBoards;
      });
    }
  }, [clickAddList]);

  const handleBoardDeleted = (idToDelete) => {
    setBoards((currentBoards) => {
      const indexToDelete = currentBoards.findIndex(board => board.id === idToDelete);
  
      if (indexToDelete === -1) {
        return currentBoards;
      }
  
      const updatedBoards = [...currentBoards];
      updatedBoards.splice(indexToDelete, 1); 
      return updatedBoards;
    });
  };

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

  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
      <Router>
        <Sidebar 
          onSidebarItemClick={handleSidebarItemClick} 
        />
        <Routes>
          <Route path="/inicio"
            element={<BoardSelected 
              boards={boards}
              handleNameChange={(boardId, newName) => handleNameChange(boardId, newName)}
              handleListDeleted={(listId) => handleListDeleted(listId)}
              handleListNameChange= {(listId, newName) => handleListNameChange(listId, newName)}
              handleListNewTask={(boardId, listId, newTask) => handleListNewTask(boardId, listId, newTask)}
              handleListTaskDeleted={(boardId, listId, taskId) => handleListTaskDeleted(boardId, listId, taskId)} 
              handleListTaskCompleted={(boardId, listId, taskId) => handleListTaskCompleted(boardId, listId, taskId)} 
            />} 
          />
          <Route path="/completadas"
            element={<CompleteLists   
            />} 
          />
          <Route path="/historial"
            element={<History 
            />} 
          />
          <Route path="/mis-tableros"
            element={<MyBoards 
              boards={boards} 
              onBoardDelete={(boardId) => handleBoardDeleted(boardId)}
            />} 
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App