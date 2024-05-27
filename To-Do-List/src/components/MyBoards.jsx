import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
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
//import toast from "react-hot-toast";


const MyBoards = () => {
  const [boards, setBoards] = useState(() => {
    let savedBoards = localStorage.getItem('Board');
    return savedBoards ? JSON.parse(savedBoards) : [];
  });

  useEffect(() => {
    localStorage.setItem('Board', JSON.stringify(boards));
  }, [boards]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const navigate = useNavigate();
  const getItemPos = id => boards.findIndex(board => board.id === id);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id === over.id) return;

    setBoards((boards) => {
      const originalPos = getItemPos(active.id);
      const newPos = getItemPos(over.id);

      return arrayMove(boards, originalPos, newPos);
    });
  }

  const handleBoardDeleted = (idToDelete) => {
    setBoards((currentBoards) => {
      const indexToDelete = currentBoards.findIndex(board => board.id === idToDelete);

      if (indexToDelete === -1) {
        return currentBoards;
      }

      const updatedBoards = [...currentBoards];
      const boardToDelete = updatedBoards[indexToDelete];
      updatedBoards.splice(indexToDelete, 1);

      if (boardToDelete.boardSelected) {
        // If the board to delete has boardSelected as true, set boardSelected of the first board to true
        if ((updatedBoards.length > 0) && !updatedBoards[0].boardSelected) {
          updatedBoards[0].boardSelected = true;
        }
      }
      toast.success("Tablero eliminado con exito", {
        icon: '🗑️',
        position: "top-right",
        style: {
          background: '#212121',
          color: "white"
        },
      });

      return updatedBoards;
    });
  };

  const handleBoardToShow = (idToShow) => {
    setBoards((currentBoards) => {
      console.log(idToShow)
      const updatedBoards = currentBoards.map(board => {
        if (board.id === idToShow) {
          return { ...board, boardSelected: true };
        } else {
          return { ...board, boardSelected: false };
        }
      });
      return updatedBoards;
    });
  };

  const handleClickBoardToShow = (boardId) => {
    handleBoardToShow(boardId);
    //navigate('/inicio');
  }

  return (
    <div className={`list-container`}>
      <h1 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3'>Mis Tableros</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={boards}
          strategy={rectSwappingStrategy}
        >
          {boards.map(board =>
            <BoardSelection
              key={board.id}
              id={board.id}
              boardName={board.name}
              boardLists={board.lists}
              onBoardSelect={() => handleClickBoardToShow(board.id)}
              onBoardDelete={() => handleBoardDeleted(board.id)}
            />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}


MyBoards.propTypes = {
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
  onBoardsChange: PropTypes.func,
};

export default MyBoards

/*

const MyBoards = ({ onBoardSelect, onBoardDelete }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Cargar los datos de los tableros desde el local storage u otra fuente
    const savedBoards = localStorage.getItem('Board');
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
  }, []);

  console.log(boards)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setBoards((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className={`list-container`}>
      <h1 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3'>Mis Tableros</h1>
      <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      >     
        <SortableContext 
          boards={boards}
          strategy={verticalListSortingStrategy}
        >
          {boards.map((board) => <BoardSelection
          key={board.id} 
          boardName={board.name}     
          boardLists={board.lists}
          onBoardSelect={() => onBoardSelect(board.id)}
          onBoardDelete={() => onBoardDelete(board.id)}
          />)}
        </SortableContext>  
      </DndContext>      
    </div>
  )

  {boards && boards.map((board) => (
    <BoardSelection
    key={board.id} 
    boardName={board.name}     
    boardLists={board.lists}
    onBoardSelect={() => onBoardSelect(board.id)}
    onBoardDelete={() => onBoardDelete(board.id)}
    />
  ))}

  return (
    <div>
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} />)}
      </SortableContext>
    </DndContext>
    <button onClick={addNewBoard}>Agregar nueva board</button>
    </div>
  );
  
}
MyBoards.propTypes = {
  boards: PropTypes.array,
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
};

export default MyBoards
*/