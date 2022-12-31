import React, { useEffect, useRef, useState } from "react";
import Keys from "../../../Keys";
import "./EsqueceuSenha.css"
export default function EsqueceuSenha(props){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [Email, setEmail] = useState('');
    useEffect(() => {
        document.body.style.background = 'linear-gradient(90deg, #0071DA 0%, #73FDFD 100%)'
    }, [])
    const enviarSolicitacao=async()=>{
        if(Email == ''){
            alert("Por favor insira um email")
            return false
        }
        let resposta;
        let status;
       const res = await fetch(`${Keys.backEnd}/EsqueceuSenha/${Email}`, {
            method: 'POST',
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
           
         
          })
          resposta = (await res.text())
          status = res.status
          if(status === 200){
          if(resposta === 'Não existe um usuario com esse email'){
            alert('Não existe um usuario com esse email')
          }
          else{
            window.location=`/EsqueceuSenhaSucesso`
          }
        }
        else{
            alert('Houve algum erro')
        }
    }
    return(
        <>
         <div className="ContainerBody" style={{ height: windowSize.current[1] }}>
        <div className="EsqueceuSenhaContainer">
        <h6 className="TituloEsqueceuSenha">Recuperar Senha</h6>
        <input type={'email'} placeholder={'Email'} onChange={e=> setEmail(e.target.value)} className={'InputEmailEsqueceuSenha'} />
        <button className="ButtonEnviarEsqueceuSenha" onClick={enviarSolicitacao}>Enviar</button>
        </div>
         </div>
        </>
    );
}