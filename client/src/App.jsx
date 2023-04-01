
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./composants/Header/Header"
import Home from "./pages/Home/Home"
import Quest from "./pages/Quest/Quest"

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        
        <Header />
        
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/quete/:id" element={ <Quest /> } />
        </Routes>

      </BrowserRouter>

      
    </div>
  )
}

export default App
