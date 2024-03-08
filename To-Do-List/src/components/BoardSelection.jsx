
// eslint-disable-next-line react/prop-types
const BoardSelection = ({ boardName }) => {
  return (
    <div className='inline-grid bg-slate-900 bg-opacity-90 rounded-3xl m-2 p-3 h-auto max-w-80 gap-3'>
      <h3 className='flex bg-slate-600 bg-opacity-60 rounded-2xl w-full max-w-72 px-[10px] py-[2px] items-center'>{(boardName)}</h3>
    </div>
  )
}

export default BoardSelection
