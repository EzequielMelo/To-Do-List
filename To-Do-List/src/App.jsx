import { useState } from 'react';
import './App.css'
import Sidebar from './Sidebar'
import Board from './components/Board'

function App() {
  
  const [clickedItem, setClickedItem] = useState();
  const [clickCounter, setClickCounter] = useState(0);

  const handleSidebarItemClick = (item) => {
    const itemId = item.id;
    if(itemId==2 && item!==null)
    {
      setClickedItem(item);
      setClickCounter(prevCounter => prevCounter + 1);
    }
  };

  console.log(clickCounter)
  
  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
     <Sidebar onSidebarItemClick={handleSidebarItemClick}/>
     <Board initialBoardName={'Nombre de la Tabla'} initialListName={clickCounter}/>
    </div>
  )
}

export default App
