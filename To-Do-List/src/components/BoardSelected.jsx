import Board from './Board';
import PropTypes from 'prop-types'; 

const BoardSelected = ({ boards, boardToShow, handleNameChange, handleListDeleted, handleListNameChange, handleListNewTask, handleListTaskDeleted, handleListTaskCompleted, handleListCompleted}) => {

    if (boardToShow === -1 || boards.length < 1) {
        return <p>No hay tableros disponibles xd.</p>;
    }

    const board = boards[boardToShow];
    
    return (
    <Board
        key={board.id}
        boardName={board.name}
        onBoardTittleChange={(newName) => handleNameChange(board.id, newName)}
        listsToShow={board.lists}
        onListDeleted={(listId) => handleListDeleted(listId)} 
        onListNewName={(listId, newName) => handleListNameChange(listId, newName)}
        onNewTaskAdded={(listId, newTask) => handleListNewTask(board.id, listId, newTask)}
        onTaskDeleted={(listId, taskId) => handleListTaskDeleted(board.id, listId, taskId)}
        onTaskCompleted={(listId, taskId) => handleListTaskCompleted(board.id, listId, taskId)}
        onListCompleted={(listId) => handleListCompleted(listId)}
    />
    )
}

BoardSelected.propTypes = {
    boards: PropTypes.array,
    boardToShow: PropTypes.number,
    handleNameChange: PropTypes.func,
    handleListDeleted: PropTypes.func, 
    handleListNameChange: PropTypes.func,
    handleListNewTask: PropTypes.func,
    handleListTaskDeleted: PropTypes.func,
    handleListTaskCompleted: PropTypes.func,
    handleListCompleted: PropTypes.func,
};

export default BoardSelected
