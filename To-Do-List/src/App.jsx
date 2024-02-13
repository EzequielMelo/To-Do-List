import './App.css'
import Sidebar from './Sidebar'
import Board from './components/Board'

function App() {

  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
     <Sidebar />
     <Board initialBoard={'Nombre de la Tabla'}/>
    </div>
  )
}

export default App
