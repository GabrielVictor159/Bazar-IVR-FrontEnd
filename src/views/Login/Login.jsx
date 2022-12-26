import React, { useState, useRef, useEffect } from "react";
import './Login.css'
export default function Login(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Lembrar, setLembrar] = useState(false);
    useEffect(() => {
        document.body.style.background = 'linear-gradient(90deg, #0071DA 0%, #73FDFD 100%)'
    }, [])
    const logar =async()=>{
        let resposta;
        let status;
       const res = await fetch(`http://localhost:3030/Usuarios/${Email}/${password}`, {
            method: 'GET',
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
           
         
          })
          resposta = (await res.text())
          status = res.status
          if(status === 200){
          if(resposta === 'Usuario não encontrado'){
            alert('Email ou senha incorretos')
          }
          else{
            console.log(resposta)
            Lembrar===false
            ?sessionStorage.setItem('usuario',resposta)
            :localStorage.setItem('usuario', resposta)
            window.location=`/`
          }
        }
        else{
            alert('Houve algum erro')
        }
    
    }
    const handleLembrar=()=>{

        if(Lembrar===false){
            document.getElementById('LembrarInput').classList.remove('animationCheckboxReverse') 
            document.getElementById('LembrarInput').classList.toggle('animationCheckbox')
        }
        else{
            document.getElementById('LembrarInput').classList.remove('animationCheckbox')
            document.getElementById('LembrarInput').classList.toggle('animationCheckboxReverse') 
        }
        setLembrar(!Lembrar)
    }
    return (
        <>
            <div className="ContainerBody" style={{height:windowSize.current[1]}}>
                <div className="LoginContainer">
                <h6 className="TituloLogin">
                    LOGIN
                </h6>
                <input type={'email'} placeholder={'Email'} onChange={e => setEmail(e.target.value)} className={'InputsLogin'}/>
                <br />
                <input type={'password'} placeholder={'Senha'} onChange={e => setPassword(e.target.value)} className={'InputsLogin'}/>
                <div className="EsqueciSenhaContainer">
                <a className="EsqueciSenha" href="/EsqueceuSenha">Esqueci a Senha</a>
                </div>
                <div className="LembrarContainer" id="LembrarContainer">
                    <div onClick={handleLembrar} className="LembrarInput" id="LembrarInput" />
                    <p className="LembreText">Lembre-se de mim</p>
                </div>
                <br />
                <div className="ButtonLogar" onClick={logar}>
                <h6 className="LoginText">{'Login'}</h6>
                </div>
                <br />
                <a className="RegistreSeText" >Registre-se</a>
                <br />
                </div>
            </div>

        </>
    );
}