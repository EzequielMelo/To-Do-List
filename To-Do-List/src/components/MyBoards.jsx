import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
//import { useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
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

  //const navigate = useNavigate();
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

  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  const handleAddBoard = () => {
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
      <div className='sticky-div flex items-center justify-center gap-2' onClick={() => handleAddBoard()}>
        <MdOutlineDashboardCustomize
          className=" size-7 text-slate-600"
        />
        <h3 className='text-lg text-slate-600'>Nuevo tablero</h3>
      </div >
    </div >
  )
}


MyBoards.propTypes = {
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
  onBoardsChange: PropTypes.func,
};

export default MyBoards