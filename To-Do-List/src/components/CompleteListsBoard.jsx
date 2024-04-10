import CompleteList from "./CompleteList"
import PropTypes from 'prop-types'; 

const CompleteListsBoard = ({listsCompleted}) => {
  return (
    <div className={`list-container`}>
      <h1>Mis listas completadas</h1>
      <div>       
      {listsCompleted && listsCompleted.map((list) => (
            <CompleteList
            key={list.id} 
            initialListName={list.name} 
            tasks={list.tasks}
            />
        ))}
      </div>
    </div>
  )
}

CompleteListsBoard.propTypes = {
  listsCompleted: PropTypes.array,
};

export default CompleteListsBoard
