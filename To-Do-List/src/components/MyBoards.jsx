import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types';
import { useDragAndDrop } from "@formkit/drag-and-drop/react"; 
import { animations } from "@formkit/drag-and-drop";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyBoards = ({ boards, onBoardSelect, onBoardDelete, onBoardsChange }) => {
  const [parent, list] = useDragAndDrop(boards,{ 
    plugins: [animations()] 
  })
  const navigate = useNavigate();
  
  //El problema principal aca es que el .map que se utiliza no es el mismo que es que se muestra
  //osea me llega boards y se usa list para mostrar solucionar esto es lo que va a resolver el problema
  useEffect(() => {
    onBoardsChange(list)
    console.log(list)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const handleBoardDelete = (boardId) => {
    onBoardDelete(boardId)
    navigate(0);
  }
  
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
        onBoardDelete={() => handleBoardDelete(board.id)}
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
