import { useState, useEffect } from "react";
import CompleteList from "./CompleteList"

const CompleteListsBoard = () => {

  // eslint-disable-next-line no-unused-vars
  const [completeList, setCompleteList] = useState(() => {
    let savedLists = localStorage.getItem('CompleteList');
    return savedLists ? JSON.parse(savedLists) : [];
  });

  useEffect(() => {
    localStorage.setItem('CompleteList', JSON.stringify(completeList));
  }, [completeList]);

  return (
    <div className={`list-container`}>
      <h1>Mis listas completadas</h1>
      <div>       
      {completeList && completeList.map((list) => (
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

export default CompleteListsBoard
