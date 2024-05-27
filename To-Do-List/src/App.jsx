import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar'
import CompleteLists from './components/CompleteListsBoard'
import MyBoards from './components/MyBoards';
import BoardSelected from './components/BoardSelected';

function App() {
  const [clickAddList, setClickAddList] = useState(0);
  const [clickAddBoard, setClickAddBoard] = useState(0);
  const [boardInUseIndex, setBoardInUseIndex] = useState(0)
  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });
  // eslint-disable-next-line no-unused-vars
  const [completeList, setCompleteList] = useState(() => {
    let savedLists = localStorage.getItem('CompleteList');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  const handleSidebarItemClick = (item) => {
    const itemId = item.id;
    if (itemId == 3 && item !== null) {
      setClickAddList(prevCounter => prevCounter + 1);
    }
    if (itemId == 2 && item !== null) {
      setClickAddBoard(prevCounter => prevCounter + 1);
    }
  };

  useEffect(() => {
    const index = (boards.findIndex(board => board.boardSelected === true));
    if (index !== -1) {
      setBoardInUseIndex(index);
    }
    else {
      setBoardInUseIndex(0);
    }
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('Board', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('CompleteList', JSON.stringify(completeList));
  }, [completeList]);

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
      toast.success("Tablero creado con exito", {
        position: "top-right",
        style: {
          background: '#212121',
          color: "white"
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickAddBoard]);

  useEffect(() => {
    if (clickAddList !== null && clickAddList !== 0) {
      setBoards(prevBoards => {

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

        const updatedBoards = [...prevBoards];
        updatedBoards[boardInUseIndex].lists.push({ id: generateUniqueId(), name: 'Titulo de la Lista', tasks: [] });
        return updatedBoards;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickAddList]);

  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
      <Router>
        <Sidebar
          onSidebarItemClick={handleSidebarItemClick}
        />
        <Toaster
          position='top-right'
        />
        <Routes>
          <Route path="/inicio"
            element={<BoardSelected />}
          />
          <Route path="/completadas"
            element={<CompleteLists
              listsCompleted={completeList}
            />}
          />
          <Route path="/mis-tableros"
            element={<MyBoards />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App