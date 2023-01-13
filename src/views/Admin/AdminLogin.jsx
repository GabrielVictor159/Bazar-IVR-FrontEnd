import React, { useEffect, useRef, useState } from "react";
import Keys from "../../../Keys";
import "./AdminLogin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminLogin(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
  useEffect(() => {
    document.body.style.background =
      "linear-gradient(145deg, #a6cbe6, #c5f2ff)";
  });
  const logar = async()=>{
    const response = await fetch(`${Keys.backEnd}Admin`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                Nome:name,
                Senha:password
            }
            )
    })
    
        if(await response.json()===true){
            props.setAdmin({nome:name, senha:password})
        }
        else{
            toast("Nome ou senha errados")
        }
  }
  return (
    <>
      <div className="AdminLogin_Body" >
        <div className="AdminLogin_Container">
        <h1>Login</h1>
        <div className="AdminLogin_input_Container">
        <input type="text" name="name" onChange={e=>setName(e.target.value)} className="AdminLogin_input" placeholder="Nome"></input>
        <br/>
        <input type="password" name="password" onChange={e=>setPassword(e.target.value)} className="AdminLogin_input" placeholder="Senha"></input>
        </div>
        <a href="#" className="AdminLogin_btn" onClick={logar}> Entrar</a>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
