import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types';
import { useDragAndDrop } from "@formkit/drag-and-drop/react"; 
import { animations } from "@formkit/drag-and-drop";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const MyBoards = ({ boards, onBoardSelect, onBoardDelete, onBoardsChange }) => {
  const [auxBoards, setAuxBoards] = useState(boards)
  const [parent, list] = useDragAndDrop(boards,{ 
    plugins: [animations()] 
  })
  /* Pensar en una solucion asi con customHooks
  const inputElement = useRef(null);

  useEffect(() => {
    HandleShowingList()
  }, [boards]);

  const HandleShowingList = () => {
    const [parent, list] = useDragAndDrop(boards,{ 
      plugins: [animations()] 
    })
    inputElement(parent);
    setAuxBoards(list)
    onBoardsChange(auxBoards)
  }
  */

  const handleBoardsChange = () => {
    console.log("hello world")
    onBoardsChange(auxBoards)
  }

  const toastId =  toast.custom((t)  => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-h-xs  max-w-xs w-full bg-glass shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 p-2">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm  text-gray-400 font-medium">
              Desea guardar los cambios?
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-600">
        <button
          onClick={() => toast.remove(t.id, handleBoardsChange())}
          className="w-full border border-transparent rounded-none p-2 flex items-center justify-center text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Aceptar
        </button>
      </div>
      <div className="flex border-l border-gray-600">
        <button
          onClick={() => toast.remove(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-xs font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Rechazar
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
    id: 'Confirm',
  })

  useEffect(() => {
    toast.remove(toastId);
    toastId;
    setAuxBoards(list)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

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
