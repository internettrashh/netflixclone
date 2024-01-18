import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Netflix from './pages/Netflix'
import Login from './pages/login'
import Signup from './pages/Signup'
import Player from './pages/Player'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/signup" element={<Signup/>} />
         <Route exact path="/login" element={<Login/>} />
        <Route exact path="/" element={<Netflix/>} />
       
      
        <Route exact path="/player" element={<Player/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
