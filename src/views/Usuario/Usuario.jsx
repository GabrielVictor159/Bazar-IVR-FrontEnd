import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Cesta from "../../components/Cesta";
import getUser from "../../components/getUser";
import NavbarBazar from "../../components/navbarBazar";
import putUser from "../../components/putUser";
import UsuarioItemInformacao from "../../components/UsuarioItemInformacao";
import "./Usuario.css";
import list from "../../assets/to-do-list.png";
import Keys from "../../../Keys";
import Foooter from "../../components/Foooter";
export default function Usuario(props) {
  const [usuario, setUsuario] = useState(getUser());
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [CestaVisible, setCestaVisible] = useState(true);
  const [atualizar, setAtualizar] = useState(0);
  const [compras, setCompras] = useState([]);
  function handleCesta() {
    if (CestaVisible) {
      document.getElementById("Cesta").classList.toggle("CestaHidden");
      document
        .getElementById("CestaContainer")
        .classList.toggle("CestaContainerHidden");
    } else {
      document.getElementById("Cesta").classList.remove("CestaHidden");
      document
        .getElementById("CestaContainer")
        .classList.remove("CestaContainerHidden");
    }
    setCestaVisible(!CestaVisible);
  }
  useLayoutEffect(() => {
    fetch(`${Keys.backEnd}Compras/${usuario.Email}/${usuario.Senha}`)
      .then((response) => response.json())
      .then((data) => setCompras(data));
  }, []);
  useEffect(() => {
    document.body.style.background = "rgb(105, 105, 105)";
  }, []);

  const alterarFirstName = async (callback1) => {
    let resposta = await putUser(callback1, "FirstName");
    if (resposta === "Sucesso") {
      setUsuario(getUser());
    } else {
      alert(resposta);
    }
  };
  const alterarLastName = async (callback1) => {
    let resposta = await putUser(callback1, "LastName");
    if (resposta === "Sucesso") {
      setUsuario(getUser());
    } else {
      alert(resposta);
    }
  };
  const alterarSenha = async (callback1, callback2, callback3) => {
    if (callback1 !== usuario.Senha) {
      alert("Senha antiga errada");
    } else if (callback2 === callback3) {
      let resposta = await putUser(callback2, "Senha");
      if (resposta === "Sucesso") {
        setUsuario(getUser());
      } else {
        alert(resposta);
      }
    } else {
      alert("Nova Senha e a sua confirmação não conferem");
    }
  };
  const alterarEndereco = async (callback1) => {
    let resposta = await putUser(callback1, "Endereco");
    if (resposta === "Sucesso") {
      setUsuario(getUser());
    } else {
      alert(resposta);
    }
  };
  const alterarDataDeNascimento = async (callback1) => {
    let resposta = await putUser(callback1, "DataDeNascimento");
    if (resposta === "Sucesso") {
      setUsuario(getUser());
    } else {
      alert(resposta);
    }
  };
  const alterarTelefone = async (callback1) => {
    let resposta = await putUser(callback1, "Telefone");
    if (resposta === "Sucesso") {
      setUsuario(getUser());
    } else {
      alert(resposta);
    }
  };
  const Sair = () => {
    localStorage.removeItem("usuario");
    sessionStorage.removeItem("usuario");
    window.location = "/";
  };
  const navegation = (id)=>{
    window.location=`/Compra/${id}`
  }
  const mapCompras = () => {
    let a =0
    try {
      return compras.map((value) => {
        a++;
        return (
          <tr key={`ItensCompra${a}`}>
            <td>{value.idCompra}</td>
            <td>{`${value.dataAprovacao.substring(
              8,
              10
            )}-${value.dataAprovacao.substring(
              5,
              7
            )}-${value.dataAprovacao.substring(0, 4)}`}</td>
            <td>{value.Method}</td>
            <td>{`R$${value.ValorTotal}`}</td>
            <td>{value.EntregaStatus}</td>
            <td>
              <button onClick={e=>navegation(value.idCompra)} className="UsuarioVerCompraButton">Ver compra</button>
            </td>
          </tr>
        );
      });
    } catch {}
  };
  return (
    <>
      <NavbarBazar
        handleCesta={handleCesta}
        width={windowSize.current[0]}
        height={windowSize.current[1]}
      />
      <br />
      <br />
      <br />
      <br />
      <div className="UsuarioContainerInformacoes">
        <br />
        <div className="UsuarioTituloContainer">
          <h6 className="UsuarioTitulos">Informações</h6>
        </div>
        <br />
        <UsuarioItemInformacao
          text={"Primeiro Nome: "}
          inputType1={"text"}
          placeholder1={"Novo nome"}
          textUsuario={usuario.FirstName}
          funcao={alterarFirstName}
        />
        <br />
        <br />
        <UsuarioItemInformacao
          text={"Ultimo Nome: "}
          inputType1={"text"}
          placeholder1={"Novo nome"}
          textUsuario={usuario.LastName}
          funcao={alterarLastName}
        />
        <br />
        <br />
        <UsuarioItemInformacao
          numberInput={3}
          text={"Senha: "}
          inputType1={"password"}
          placeholder1={"Senha antiga"}
          inputType2={"password"}
          placeholder2={"Nova Senha"}
          inputType3={"password"}
          placeholder3={"Confirme a nova senha"}
          textUsuario={"******"}
          funcao={alterarSenha}
        />
        <br />
        <br />
        <UsuarioItemInformacao
          text={"Endereço: "}
          inputType1={"text"}
          placeholder1={"Novo Endereço"}
          textUsuario={usuario.Endereco}
          funcao={alterarEndereco}
        />
        <br />
        <br />
        <UsuarioItemInformacao
          text={"Data de Nascimento: "}
          inputType1={"date"}
          textUsuario={usuario.DataDeNascimento}
          funcao={alterarDataDeNascimento}
        />
        <br />
        <br />
        <UsuarioItemInformacao
          text={"Telefone: "}
          inputType1={"number"}
          textUsuario={usuario.Telefone}
          funcao={alterarTelefone}
        />
        <br />
        <br />
        <br />
        <div className="UsuarioSairButtonContainer">
          <button className="UsuarioSairButton" onClick={Sair}>
            Sair
          </button>
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="UsuarioComprasContainer">
        <br />
        <div className="UsuarioComprasTituloContainer">
          <img width={50} height={50} src={list} />
          <h6 className="UsuarioComprasTituloText">{"Minhas Compras"}</h6>
        </div>
        <br />
        <div className="UsuarioTableCompras">
          <table>
            <thead>
              <tr style={{position:'sticky', top:0, zIndex:1}}>
                <td><p>{'#'}</p></td>
                <td><p>{'Data'}</p></td>
                <td><p>{'Método'}</p></td>
                <td><p>{'Valor Total'}</p></td>
                <td><p>{'Status'}</p></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
            {mapCompras()}
            </tbody>
            
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Foooter />
      <Cesta
        atualizar={atualizar}
        setAtualizar={setAtualizar}
        width={windowSize.current[0]}
        CestaVisible={CestaVisible}
      />
    </>
  );
}
