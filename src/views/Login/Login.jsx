import React, { useState, useRef, useEffect } from "react";
import Logar from "../../components/logar";
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
       const log = await Logar(Email, password, Lembrar)
       log === 'Sucesso'
       ?window.location='/'
       :alert(log)
    
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
                <a className="RegistreSeText" href="/Registrar" >Registre-se</a>
                <br />
                </div>
            </div>

        </>
    );
}