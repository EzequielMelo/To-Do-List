import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types';
import { useDragAndDrop } from "@formkit/drag-and-drop/react"; 
import { animations } from "@formkit/drag-and-drop";
import { useEffect, useState } from "react";

const MyBoards = ({ boards, onBoardSelect, onBoardDelete, onBoardsChange }) => {
//  const [auxBoard, setAuxBoard] = useState(boards)
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [parent, list] = useDragAndDrop(boards, { 
    plugins: [animations()] 
  },[triggerRerender])

  useEffect(() => {
    onBoardsChange(list)
    console.log(list)
    setTriggerRerender(!triggerRerender);
  }, [list]);


/*
  const handleBoardDelete = (boardId) => {
    setAuxBoard((currentBoards) => {
      const indexToDelete = currentBoards.findIndex(board => board.id === boardId);
      const updatedBoards = [...currentBoards];
      updatedBoards.splice(indexToDelete, 1);
      onBoardDelete(boardId)
      onBoardsChange(list)
      return updatedBoards;
    })
  }
  */
  return (
    <div className={`list-container`}>
      <h1 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3'>Mis Tableros</h1>
      <div ref={parent}>
      {list && list.map((board) => (
        <BoardSelection
        key={board.id} 
        boardName={board.name}     
        boardLists={board.lists}
        onBoardSelect={() => onBoardSelect(board.id)}
        onBoardDelete={() => onBoardDelete(board.id)}
        />
      ))}
      </div>
    </div>
  )
}

MyBoards.propTypes = {
  boards: PropTypes.array,
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
  onBoardsChange: PropTypes.func,
};

export default MyBoards
