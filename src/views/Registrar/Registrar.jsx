import React, { useEffect, useRef, useState } from "react";
import Keys from "../../../Keys";
import "./Registrar.css"
import { ToastContainer, toast } from "react-toastify";
export default function Registrar(props) {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Endereco, setEndereco] = useState('');
    const [DataDeNascimento, setDataDeNascimento] = useState('');
    const [Email, setEmail] = useState('');
    const [Telefone, setTelefone] = useState('');

    useEffect(() => {
        document.body.style.background = 'linear-gradient(90deg, #0071DA 0%, #73FDFD 100%)'
    }, [])

    const sendSolicitacao = async ()=>{
        if(Password !== ConfirmPassword){
           toast('Senha diferentes')
            return false;
        }
        if(Password.length <7){
           toast('Senha muito pequena, por favor escreva uma senha com pelo menos 7 digitos')
            return false;
        }
        if(FirstName.length <7 || LastName.length<7){
           toast('Nomes Invalidos')
            return false;
        }
        if(Endereco.length <7){
           toast('Endereço invalido')
            return false;
        }
        let dataAtual = new Date()
        if((parseInt(dataAtual.toISOString().substring(0,4))-parseInt(DataDeNascimento.substring(0,4))) <18){
            console.log("idade invalida, apenas pessoas maiores de idade podem se registrar")
            return false;
        }
        let data ={
            FirstName: FirstName,
            LastName: LastName,
            Senha: Password,
            Endereco: Endereco,
            DataDeNascimento: DataDeNascimento,
            Email: Email,
            Telefone:Telefone
        }
        const response = await fetch(`${Keys.backEnd}/CadastrarSolicitacao`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
              
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
          });
          const respostaTexto = await response.text()

          if(respostaTexto!="Sucesso"){
            toast(respostaTexto)
          }
          else{
            window.location=`/SucessoRegistrar`
          }
        
    }
    return (
        <>
            <div className="ContainerBody" style={{ height: windowSize.current[1] }}>
                <div className="ContainerRegistar">
                    <br />
                    <br />
                    <h6 className="TituloRegistrar">
                        Registrar
                    </h6>
                    <br />
                    <input type={'text'} placeholder={'Primeiro Nome'} className="inputRegistrar" onChange={e => setFirstName(e.target.value)} />
                    <br />
                    <input type={'text'} placeholder={'Ultimo Nome'} className="inputRegistrar" onChange={e => setLastName(e.target.value)} />
                    <br />
                    <input type={'password'} placeholder={'Senha'} className="inputRegistrar" onChange={e => setPassword(e.target.value)} />
                    <br />
                    <input type={'password'} placeholder={'Confirmar Senha'} className="inputRegistrar" onChange={e => setConfirmPassword(e.target.value)} />
                    <br />
                    <input type={'text'} placeholder={'Endereço'} className="inputRegistrar" onChange={e => setEndereco(e.target.value)} />
                    <br />
                    <input type={'date'} placeholder={'Data de Nascimento'} className="inputRegistrar" onChange={e => setDataDeNascimento(e.target.value)} />
                    <br />
                    <input type={'email'} placeholder={'Email'} className="inputRegistrar" onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input type={'number'} placeholder={'Telefone'} className="inputRegistrar" onChange={e => setTelefone(e.target.value)} />
                    <br />
                    <br />
                    <button className="ButtonRegistrar" onClick={sendSolicitacao}>Registrar</button>
                    <br />
                    <br />
                </div>
            </div>
            <ToastContainer />
        </>
    );
}