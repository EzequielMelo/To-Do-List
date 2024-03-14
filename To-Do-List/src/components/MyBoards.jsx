import BoardSelection from "./BoardSelection"
import PropTypes from 'prop-types'; 

const MyBoards = ({ boards, onBoardSelect, onBoardDelete }) => {
  return (
    <div className={`list-container`}>
      <h1 className='flex bg-slate-600 bg-opacity-60 rounded-full w-fit px-[10px] py-[2px] mb-3'>Mis Tableros</h1>
      {boards && boards.map((board) => (
        <BoardSelection
        key={board.id} 
        boardName={board.name}     
        boardLists={board.lists}
        onBoardSelect={() => onBoardSelect(board.id)}
        onBoardDelete={() => onBoardDelete(board.id)}
        />
      ))}
    </div>
  )
}

MyBoards.propTypes = {
  boards: PropTypes.array,
  onBoardSelect: PropTypes.func,
  onBoardDelete: PropTypes.func,
};

export default MyBoards
