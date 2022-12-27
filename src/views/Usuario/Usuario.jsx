import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cesta from "../../components/Cesta";
import getUser from "../../components/getUser";
import NavbarBazar from "../../components/navbarBazar";
import UsuarioItemInformacao from "../../components/UsuarioItemInformacao";
import "./Usuario.css"
export default function Usuario(props) {
    const [usuario, setUsuario] = useState(getUser())
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [CestaVisible, setCestaVisible] = useState(true);
    const [atualizar, setAtualizar] = useState(0);
    function handleCesta() {

        if (CestaVisible) {
            document.getElementById('Cesta').classList.toggle('CestaHidden');
            document.getElementById('CestaContainer').classList.toggle('CestaContainerHidden');
        }
        else {
            document.getElementById('Cesta').classList.remove('CestaHidden');
            document.getElementById('CestaContainer').classList.remove('CestaContainerHidden');
        }
        setCestaVisible(!CestaVisible)

    }

    useEffect(() => {
        document.body.style.background = 'rgb(105, 105, 105)'
    }, [])

    const alterarFirstName = (callback1) => {
        console.log(callback1)
        console.log(usuario)
    }
    const alterarSenha = (callback1, callback2, callback3) =>{
        console.log(callback1)
        console.log(callback2)
        console.log(callback3)
        console.log(usuario)
    }
    return (
        <>
            <NavbarBazar handleCesta={handleCesta} width={windowSize.current[0]} height={windowSize.current[1]} />
            <br /><br /><br /><br />
            <div className="UsuarioContainerInformacoes">
                <br />
                <div className="UsuarioTituloContainer">
                    <h6 className="UsuarioTitulos">Informações</h6>
                </div>
                <br />
                <UsuarioItemInformacao text={'Primeiro Nome: '} inputType1={'text'} placeholder1={'Novo nome'} textUsuario={usuario.FirstName} funcao={alterarFirstName} />
                <br />
                <br />
                <UsuarioItemInformacao text={'Ultimo Nome: '} inputType1={'text'} placeholder1={'Novo nome'} textUsuario={usuario.LastName} funcao={alterarFirstName} />
                <br />
                <br />
                <UsuarioItemInformacao numberInput={3} text={'Senha: '} inputType1={'password'} placeholder1={'Senha antiga'} inputType2={'password'} placeholder2={'Nova Senha'} 
                inputType3={'password'} placeholder3={'Confirme a nova senha'}  textUsuario={'******'} funcao={alterarSenha} />
                <br />
                <br />
                <UsuarioItemInformacao text={'Endereço: '} inputType1={'text'} placeholder1={'Novo Endereço'} textUsuario={usuario.Endereco} funcao={alterarFirstName} />
                <br />
                <br />
                <UsuarioItemInformacao text={'Data de Nascimento: '} inputType1={'date'}  textUsuario={usuario.DataDeNascimento} funcao={alterarFirstName} />
                <br />
                <br />
                <UsuarioItemInformacao text={'Telefone: '} inputType1={'number'}  textUsuario={usuario.Telefone} funcao={alterarFirstName} />
                <br />
                <br />
            </div>
            <br /><br /><br /><br />
            <footer>

            </footer>
            <Cesta atualizar={atualizar} setAtualizar={setAtualizar} width={windowSize.current[0]} CestaVisible={CestaVisible} />
        </>
    );
}