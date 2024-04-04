import { useEffect, useState } from 'react';
import List from './List';
import PropTypes from 'prop-types'; 

const CompleteLists = ({listsCompleted}) => {
  const [listNumber, setListNumber] = useState(0);

  useEffect(() => {
    setListNumber(listsCompleted.lenght)
  },[listsCompleted]);

  return (
    <div className={`list-container`}>
      <h1>Mis listas completadas</h1>
      <h1>Listas completadas: {listNumber}</h1>
      <div>       
      {listsCompleted && listsCompleted.map((list) => (
            <List 
            key={list.id} 
            initialListName={list.name} 
            tasks={list.tasks}
            />
        ))}
      </div>
    </div>
  )
}

CompleteLists.propTypes = {
  listsCompleted: PropTypes.array,
};

export default CompleteLists
