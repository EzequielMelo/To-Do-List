import React from 'react'
import Board from './Board';
import PropTypes from 'prop-types'; 

const BoardSelected = ({ boards, handleNameChange, handleListDeleted, handleListNameChange, handleListNewTask, handleListTaskDeleted, handleListTaskCompleted}) => {

    if (boards.length === 0) {
        return <p>No hay tableros disponibles.</p>;
    }
    
    const board = boards[0]
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
    />
    )

}

BoardSelected.propTypes = {
    boards: PropTypes.array,
    handleNameChange: PropTypes.func,
    handleListDeleted: PropTypes.func, 
    handleListNameChange: PropTypes.func,
    handleListNewTask: PropTypes.func,
    handleListTaskDeleted: PropTypes.func,
    handleListTaskCompleted: PropTypes.func,
};

export default BoardSelected
