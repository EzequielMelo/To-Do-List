import { useEffect, useState } from "react"
import PropTypes from 'prop-types'; 

// eslint-disable-next-line react/prop-types
const BoardSelection = ({ boardName, boardLists }) => {
  const [listNumber, setListNumber] = useState(0);

  useEffect(() => {
    setListNumber(boardLists.length)
    console.log(boardLists.length)
  },[boardLists]);

  return (
    <div className='inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-80 gap-3'>
      <h3 className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-72 px-[10px] py-[2px] items-center'>{(boardName)}</h3>
      <h3>Cantidad de listas: {listNumber}</h3>
    </div>
  )
}

BoardSelection.propTypes = {
  boardLists: PropTypes.array,
};

export default BoardSelection
