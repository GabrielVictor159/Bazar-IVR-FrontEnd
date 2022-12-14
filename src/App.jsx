import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes, Link } from "react-router-dom";
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Sobre from './views/Sobre/Sobre';
function App() {
 

  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/Login' element={<Login />}/>
    <Route path='/Sobre' element={<Sobre />}/>
  </Routes>
  )
}

export default App
