import { BrowserRouter ,Route, Routes} from 'react-router-dom'
import './App.css'

function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<h1>Welcome to the App</h1>} />
      <Route path="/about" element={<h1>About Us</h1>} />
      <Route path="/contact" element={<h1>Contact Us</h1>} />
   </Routes>
   </BrowserRouter>

  )
}

export default App
