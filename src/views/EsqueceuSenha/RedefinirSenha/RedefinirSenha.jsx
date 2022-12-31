import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Keys from "../../../../Keys";
import "./RedefinirSenha.css"
export default function RedefinirSenha(props){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [NovaSenha, setNovaSenha] = useState('');
    const [ConfirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    let {email} = useParams();
    let {senha} = useParams();
    useEffect(() => {
        document.body.style.background = 'linear-gradient(90deg, #0071DA 0%, #73FDFD 100%)'
    }, [])

    const enviar = async()=>{
        if(NovaSenha !== ConfirmarNovaSenha){
            alert("Senhas diferentes, por favor verifique as senhas")
            return false
        }
        console.log(NovaSenha)
        let data ={
            Email: email,
            Senha: senha,
            NovaSenha: NovaSenha
        }
        let resposta;
        let status;
        console.log(JSON.stringify(data))
        let res = await fetch(`${Keys.backEnd}/UsuariosEsqueceuSenhaAlterarSenha/`, {
            method: 'PUT',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
              },
            cache: 'no-cache', 
            credentials: 'same-origin', 
            body: JSON.stringify(data)
         
          })
          resposta = (await res.text())
          status = res.status
          if(status === 200){
            if(resposta === 'Não foi possivel alterar a senha'){
              alert(resposta)
            }
            else{
              window.location=`/RedefinirSenhaSucesso`
            }
          }
          else{
              alert('Houve algum erro')
          }
    }
    return (
        <>
         <div className="ContainerBody" style={{ height: windowSize.current[1] }}>
            <div className="RedefinirSenhaContainer">
            <br />
            <h6 className="TituloEsqueceuSenha">Redefinir Senha</h6>
            <br />
            <input type={'password'} placeholder={'Nova Senha'} onChange={e=> setNovaSenha(e.target.value)} className={'InputPasswordRedefinirSenha'} />
            <input type={'password'} placeholder={'Confirmar Senha'} onChange={e=> setConfirmarNovaSenha(e.target.value)}  className={'InputPasswordRedefinirSenha'} />
            <br />
        <button className="ButtonEnviarEsqueceuSenha" onClick={enviar}>Enviar</button>
        <br />
            </div>
         </div>
        </>
    );
}