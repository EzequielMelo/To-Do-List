import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar'
import CompleteLists from './components/CompleteListsBoard'
import MyBoards from './components/MyBoards';
import BoardSelected from './components/BoardSelected';

function App() {
  return (
    <div className='w-full h-screen bg-back object-cover flex items-center'>
      <Router>
        <Sidebar />
        <Toaster
          position='top-right'
        />
        <Routes>
          <Route path="/inicio"
            element={<BoardSelected />}
          />
          <Route path="/completadas"
            element={<CompleteLists />}
          />
          <Route path="/mis-tableros"
            element={<MyBoards />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App