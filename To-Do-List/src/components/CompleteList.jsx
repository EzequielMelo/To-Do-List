import PropTypes from 'prop-types'; 

const List = ({ initialListName, tasks }) => {

  return (
    <div className=' inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto min-w-72 max-w-90 gap-3'>      
      <div className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full'>
        <h3 className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-80 px-[10px] py-[2px] justify-between items-center'>{initialListName}</h3> 

      </div>
      <div>       
            <ul>
            {tasks && tasks.map((task) => (
              <li className="flex bg-slate-600 bg-opacity-60 rounded-2xl px-[10px] py-[2px] w-full max-w-80 mb-1 justify-between"
               key={task.id}>
                <span className="flex max-w-80 w-fit" style={{textDecoration: 'line-through'}}>
                  {task.name}
                </span>
              </li>
            ))}
            </ul>
      </div>
    </div>
  )
}

List.propTypes = {
  initialListName: PropTypes.string,
  tasks: PropTypes.array,
};

export default List