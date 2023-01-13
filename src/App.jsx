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
import RedefinirSenha from './views/EsqueceuSenha/RedefinirSenha/RedefinirSenha';
import RedefinirSenhaSucesso from './views/EsqueceuSenha/RedefinirSenha/RedefinirSenhaSucesso/RedefinirSenhaSucesso';
import FinalizarCompra from './views/FinalizarCompra/FinalizarCompra';
import Compra from './views/Compra/Compra';
import TestComponent from './views/Compra/TestComponent';
import AdminLogin from './views/Admin/AdminLogin';
import Admin from './views/Admin/Admin';
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
    <Route path='/RedefinirSenha/:email/:senha' element={<RedefinirSenha />}/>
    <Route path='/RedefinirSenhaSucesso' element={<RedefinirSenhaSucesso />}/>
    <Route path='/FinalizarCompra' element={<FinalizarCompra />}/>
    <Route path='/Compra/:id' element={<Compra />}/>
    <Route path='/admin' element={<Admin />}/>
  </Routes>
  )
}

export default App
