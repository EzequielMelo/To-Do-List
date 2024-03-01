import { useState, useEffect } from 'react';
import './App.css'
import Sidebar from './Sidebar'
import Board from './components/Board'

function App() {
  
  const [clickedItem, setClickedItem] = useState();
  const [clickAddList, setClickAddList] = useState(0);
  const [clickAddBoard, setClickAddBoard] = useState(0);
  const [boardName, setBoardName] = useState('Titulo de la lista');

  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  console.log(boards)

  useEffect(() => {
    localStorage.setItem('Board', JSON.stringify(boards));
    /* console.log('Las listas se han actualizado:', lists); */
    }, [boards]);

  useEffect(() => {
    if (clickAddBoard !== null && clickAddBoard!== 0) {
        //console.log("Ítem clickeado:", initialListName);
        setBoards(prevBoards => [...prevBoards, { id: generateUniqueId(), name: '', lists: [] }]);
    }
  }, [clickAddBoard]);

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
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

  console.log(clickAddList)
  
  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
     <Sidebar 
      onSidebarItemClick={handleSidebarItemClick}
     />
     {boards && boards.map((board) => (
           <Board 
           key={board.id}
           boardName={board.name} 
           onTittleChange 
           newListClicked={clickAddList}
          />
     ))}
    </div>
  )
}

export default App
