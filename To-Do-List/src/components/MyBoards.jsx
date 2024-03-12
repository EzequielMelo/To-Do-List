import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types'; 

const MyBoards = ({ boards }) => {
  return (
    <div className={`list-container`}>
      <h1 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3'>Mis Tableros</h1>
      {boards && boards.map((board) => (
        <BoardSelection
        key={board.id} 
        boardName={board.name}     
        boardLists={board.lists}
        />
      ))}
    </div>
  )
}

MyBoards.propTypes = {
  boards: PropTypes.array,
};

export default MyBoards
