import { useEffect, useState } from "react"
import PropTypes from 'prop-types'; 
import { IoTrashOutline } from "react-icons/io5";
import { IoMdOpen } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BoardSelection = ({ boardName, boardLists, onBoardSelect, onBoardDelete }) => {
  const [listNumber, setListNumber] = useState(0);
  const navigate = useNavigate();
  const handleOnClick = () => {
    onBoardSelect();
    navigate('/inicio')
  }

  useEffect(() => {
    setListNumber(boardLists.length)
  },[boardLists]);

  return (
    <div className='inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-80 gap-3'>
      <h3 className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-72 px-[10px] py-[2px] items-center'>{(boardName)}</h3>
      <h3 className="text-slate-600">Listas: {listNumber}</h3>
      {boardLists && boardLists.map((list) => (
          <li className="flex bg-slate-600 bg-opacity-60 rounded-2xl px-[10px] py-[2px] w-full max-w-72 mb-1 justify-between"
            key={list.id}>
            <span className="flex max-w-72 w-fit">{list.name}</span>
          </li>
      ))}
      <div className='flex w-full justify-center gap-2'>
        <div className="inline-grid w-fit place-items-center">
          <IoMdOpen 
          className="size-7 text-slate-600"
          onClick={handleOnClick}
          />
          <h3 className="flex text-xs text-slate-600">Seleccionar</h3>
        </div>
        <div className="inline-grid w-fit place-items-center">
          <IoTrashOutline 
          className="size-7 text-slate-600"
          onClick={() => onBoardDelete()}
          />
          <h3 className="flex text-xs text-slate-600">Borrar Tabla</h3>
        </div>
      </div>
    </div>
  )
}

BoardSelection.propTypes = {
  boardName: PropTypes.string,
  boardLists: PropTypes.array,
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
};

export default BoardSelection
