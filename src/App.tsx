import { BrowserRouter ,Route, Routes} from 'react-router-dom'
import Game from './presentation/pages/Game'
import Home from './presentation/pages/Home'
import './App.css'

function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
   </Routes>
   </BrowserRouter>

  )
}

export default App
