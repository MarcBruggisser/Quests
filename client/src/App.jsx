
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./composants/Header/Header"
import Home from "./pages/Home/Home"
import Quest from "./pages/Quest/Quest"
import Universes from "./pages/Universes/Universes"

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        
        <Header />
        
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/universes" element={ <Universes /> } />
          <Route path="/quete/:id" element={ <Quest /> } />
        </Routes>

      </BrowserRouter>

      
    </div>
  )
}

export default App
