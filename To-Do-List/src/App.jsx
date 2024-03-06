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

 //Zona a modificar, aca se tienen que guardar dentro de las boards las list de cada una de las boards
  
  const [clickedItem, setClickedItem] = useState();
  const [clickAddList, setClickAddList] = useState(0);
  const [clickAddBoard, setClickAddBoard] = useState(0);
  const [boardName, setBoardName] = useState('Titulo de la lista');
  const boardNumber = 1;

  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  const handleSidebarItemClick = (item) => {
    const itemId = item.id;
    if(itemId==2 && item!==null)
    {
      setClickedItem(item);
      setClickAddList(prevCounter => prevCounter + 1);
    }
    if(itemId==1 && item!==null)
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
        setBoards(prevBoards => [...prevBoards, { id: generateUniqueId(), name: '', lists: []}]);
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
  

  const NuevoTablero = ({ boards }) => {

    if (boards.length === 0) {
      return <p>No hay tableros disponibles.</p>;
    }
  
    const board = boards[boardNumber]
    return (
      <Board
        key={board.id}
        boardName={board.name}
        listsToShow={board.lists}
        onListDeleted={(listId) => handleListDeleted(listId)} 
        onListNewName={(listId, newName) => handleListNameChange(listId, newName)}
      />
    )
  };
  
  /*
  // eslint-disable-next-line react/prop-types
  const NuevoTablero = ({ boards, clickAddList }) => {
    return (
      <>
        {boards.map(board => (
          <Board
            key={board.id}
            boardName={board.name}
            onTittleChange
            newListClicked={clickAddList}
          />
        ))}
      </>
    );
  }
  */
  NuevoTablero.propTypes = {
    boards: PropTypes.array, // Asegúrate de que tasks sea un array
  };

  
  return (
      <div className='w-full h-screen bg-back object-cover flex items-center'>
        <Router>
          <Sidebar onSidebarItemClick={handleSidebarItemClick} />
          <Routes>
            <Route path="/nuevo-tablero" element={<NuevoTablero boards={boards}/>} />
            <Route path="/completadas" element={<CompleteLists />} />
            <Route path="/historial" element={<History />} />
            <Route path="/mis-tableros" element={<MyBoards />} />
          </Routes>
        </Router>

      </div>
  )
}

export default App