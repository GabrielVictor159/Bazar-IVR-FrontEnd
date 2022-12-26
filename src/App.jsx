import { useEffect, useLayoutEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes, Link } from "react-router-dom";
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Sobre from './views/Sobre/Sobre';
import Produto from './views/Produto/Produto';
import Usuario from './views/Usuario/Usuario';
import Registrar from './views/Registrar/Registrar';
import SucessoRegistrar from './views/Registrar/SucessoRegistrar/SucessoRegistrar';
import EsqueceuSenha from './views/EsqueceuSenha/EsqueceuSenha';
import EsqueceuSenhaSucesso from './views/EsqueceuSenha/EsqueceuSenhaSucesso/EsqueceuSenhaSucesso';
function App() {
  
 

  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/Produto/:id' element={<Produto/>} />
    <Route path='/Login' element={<Login />}/>
    <Route path='/Sobre' element={<Sobre/>}/>
    <Route path='/Usuario' element={<Usuario />} />
    <Route path='/Registrar' element={<Registrar />}/>
    <Route path='/SucessoRegistrar' element={<SucessoRegistrar />} />
    <Route path='/EsqueceuSenha' element={<EsqueceuSenha />}/>
    <Route path='/EsqueceuSenhaSucesso' element={<EsqueceuSenhaSucesso />}/>
  </Routes>
  )
}

export default App
