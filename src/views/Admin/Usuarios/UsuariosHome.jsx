import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Keys from "../../../../Keys";
import "./UsuariosHome.scss";
import searcha from "../../../assets/icons8-view-96.png";
import deletea from "../../../assets/icons8-delete-document-96.png";
import close from "../../../assets/icons8-close-96.png";
import done from "../../../assets/icons8-done-96.png";
import Overlay from "../../../components/Overlay";
let name = "UsuariosHome";
export default function UsuariosHome(props) {
  const [Users, setUsers] = useState([]);
  const [buscaIdUsuario, setBuscaIdUsuario] = useState("");
  const [buscaFirstName, setBuscaFirstName] = useState("");
  const [buscaLastName, setBuscaLastName] = useState("");
  const [buscaEndereco, setBuscaEndereco] = useState("");
  const [buscaDataDeNascimento, setBuscaDataDeNascimento] = useState("");
  const [buscaEmail, setBuscaEmail] = useState("");
  const [buscaTelefone, setBuscaTelefone] = useState("");
  const [alterar, setAlterar] = useState(false);
  const [busca, setBusca] = useState(false);
  const [deletar, setDeletar] = useState(false);
  const [deletarId, setDeletarId] = useState("");
  const [novoFirstName, setNovoFirstName] = useState("");
  const [novoLastName, setNovoLastName] = useState("");
  const [novoEndereco, setNovoEndereco] = useState("");
  const [novoDataDeNascimento , setNovoDataDeNascimento] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  useEffect(() => {
    mapProduct();
    
  }, []);
  const mapProduct = () => {
    fetch(`${Keys.backEnd}AllUsuarios/${props.admin.nome}/${props.admin.senha}`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };
  const activeInputs = (number, index) => {
    document.getElementById(`${name}_userColumn_${number}_${index}`).style.display =
      "none";
    document.getElementById(
      `${name}_userColumn_input_${number}_${index}`
    ).style.display = "block";
    setAlterar(index);
  };
  const activeInputsBusca = (index) => {
    if (alterar !== false) {
      return false;
    }
    let a = document.getElementById(`${name}_busca_${index}`);
    a.style.display = a.style.display === "block" ? "none" : "block";
    let b = document.getElementById(`${name}_buscaInput_${index}`);
    b.style.display = a.style.display === "block" ? "none" : "block";
    setBusca(true);
  };
  const disableAllInputsBusca = () => {
    if (alterar !== false) {
      return false;
    }
    let inputs = document.getElementsByClassName(`${name}_busca_input`);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }
    let texto = document.getElementsByClassName(`${name}_busca_text`);
    for (let i = 0; i < texto.length; i++) {
      texto[i].style.display = "block";
    }
    setBuscaDataDeNascimento("");
    setBuscaEmail("");
    setBuscaEndereco("");
    setBuscaFirstName("");
    setBuscaIdUsuario("");
    setBuscaLastName("");
    setBuscaTelefone("");
    setBusca(false)
  };
  const disableAllInputsAlteracao = (index)=>{
    let inputs = document.getElementsByClassName(`${name}_userColumn_input_${index}`);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }
    let texto = document.getElementsByClassName(`${name}_userColumn_${index}`);
    for (let i = 0; i < texto.length; i++) {
      texto[i].style.display = "block";
    }
    setAlterar(false)
    setNovoDataDeNascimento("")
    setNovoEndereco("")
    setNovoFirstName("")
    setNovoLastName("")
    setNovoTelefone("")
  }
  const confirmarAlteracao = async(index)=>{
    let bodyData ={
        idUsuario:Users[index].idUsuario,
        FirstName:novoFirstName===""?Users[index].FirstName:novoFirstName,
        LastName:novoLastName===""?Users[index].LastName:novoLastName,
        Endereco:novoEndereco===""?Users[index].Endereco:novoEndereco,
        DataDeNascimento:novoDataDeNascimento===""?Users[index].DataDeNascimento:novoDataDeNascimento,
        Telefone:novoTelefone===""?Users[index].Telefone:novoTelefone
    }
    await fetch(`${Keys.backEnd}UsuariosAdmin/${props.admin.nome}/${props.admin.senha}`,{
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(bodyData)
    })
    .then((response)=>response.text())
    .then((data)=>data==="Sucesso"?"":alert(data))
    disableAllInputsAlteracao(index)
    setAlterar(false)
    setNovoDataDeNascimento("")
    setNovoEndereco("")
    setNovoFirstName("")
    setNovoLastName("")
    setNovoTelefone("")
    mapProduct()
  }
  const returnUsers = () => {
    try {
      
        
      return Users
      .filter((value) => {
        if (buscaIdUsuario) {
        return value.idUsuario.toString().includes(buscaIdUsuario);
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaFirstName) {
        return value.FirstName.toLowerCase().includes(buscaFirstName.toLowerCase());
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaLastName) {
        return value.LastName.toLowerCase().includes(buscaLastName.toLowerCase());
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaEndereco) {
        return value.Endereco.toLowerCase().includes(buscaEndereco.toLowerCase());
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaDataDeNascimento) {
        return value.DataDeNascimento.toString().includes(buscaDataDeNascimento);
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaEmail) {
        return value.Email.toLowerCase().includes(buscaEmail.toLowerCase());
        } else {
        return value;
        }
        })
        .filter((value) => {
        if (buscaTelefone) {
        return value.Telefone.toString().includes(buscaTelefone);
        } else {
        return value;
        }
        })
          .map((value, index) => {
        return (
          <tr key={`usuario/${index}`}>
            <td>
              <p>{value.idUsuario}</p>
            </td>
            <BodyColumn
              alterar={alterar}
              setAlterar={setAlterar}
              index={index}
              activeInputs={activeInputs}
              number={0}
              text={value.FirstName}
              typeInput={"text"}
              placeholder={"Novo nome"}
              setEstado={setNovoFirstName}
            />
            <BodyColumn
              alterar={alterar}
              setAlterar={setAlterar}
              index={index}
              activeInputs={activeInputs}
              number={1}
              text={value.LastName}
              typeInput={"text"}
              placeholder={"Novo nome"}
              setEstado={setNovoLastName}
            />
            <td>
            <p>{value.Email}</p>
            </td>
            <BodyColumn
              alterar={alterar}
              setAlterar={setAlterar}
              index={index}
              activeInputs={activeInputs}
              number={2}
              text={value.Endereco}
              typeInput={"text"}
              placeholder={"Novo Endereço"}
              setEstado={setNovoEndereco}
            />
             <BodyColumn
              alterar={alterar}
              setAlterar={setAlterar}
              index={index}
              activeInputs={activeInputs}
              number={3}
              text={value.DataDeNascimento.split("T")[0]}
              typeInput={"date"}
              placeholder={"Nova data de nascimento"}
              setEstado={setNovoDataDeNascimento}
            />
            <BodyColumn
              alterar={alterar}
              setAlterar={setAlterar}
              index={index}
              activeInputs={activeInputs}
              number={4}
              text={value.Telefone}
              typeInput={"number"}
              placeholder={"Novo telefone"}
              setEstado={setNovoTelefone}
            />
            <td>
            {alterar === index ? 
                  <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={done}
                    onClick={(e) => confirmarAlteracao(index)}
                  />
                 : <></>
            }
            </td>
            <td>
           { alterar === index ? (
                  <img
                    onClick={(e) => disableAllInputsAlteracao(index)}
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={close}
                  />
                ) : (
                  <></>
                )}
            </td>
          </tr>
        );
      });
    } catch(err){
        console.log(err.message)
      return <></>;
    }
  };

  const setHandler = () => {
    setDeletar(false);
    setDeletarId("");
  };
  return (
    <>
      <div className={`${name}_body`}>
        <div className={`${name}_produtos`}>
          <table>
            <thead>
              <tr style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <HeadColumn
                  index={0}
                  alterar={alterar}
                  setEstado={setBuscaIdUsuario}
                  activeInputsBusca={activeInputsBusca}
                  text={"#"}
                />
                <HeadColumn
                  index={1}
                  alterar={alterar}
                  setEstado={setBuscaFirstName}
                  activeInputsBusca={activeInputsBusca}
                  text={"Primeiro nome"}
                />
                <HeadColumn
                  index={2}
                  alterar={alterar}
                  setEstado={setBuscaLastName}
                  activeInputsBusca={activeInputsBusca}
                  text={"Ultimo nome"}
                />
                <HeadColumn
                  index={3}
                  alterar={alterar}
                  setEstado={setBuscaEmail}
                  activeInputsBusca={activeInputsBusca}
                  text={"Email"}
                />
                <HeadColumn
                  index={4}
                  alterar={alterar}
                  setEstado={setBuscaEndereco}
                  activeInputsBusca={activeInputsBusca}
                  text={"Endereço"}
                />
                <HeadColumn
                  index={5}
                  alterar={alterar}
                  setEstado={setBuscaDataDeNascimento}
                  activeInputsBusca={activeInputsBusca}
                  text={"Data de Nascimento"}
                />
                <HeadColumn
                  index={6}
                  alterar={alterar}
                  setEstado={setBuscaTelefone}
                  activeInputsBusca={activeInputsBusca}
                  text={"Telefone"}
                />
                <td>
                  {busca ? (
                    <img
                      style={{ cursor: "pointer" }}
                      width={25}
                      height={25}
                      src={close}
                      onClick={disableAllInputsBusca}
                    />
                  ) : (
                    <></>
                  )}
                </td>
                <td/>
              </tr>
            </thead>
            <tbody>
                    {returnUsers()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
function BodyColumn(props) {
  return (
    <td>
      <p
        onDoubleClick={(e) =>
          props.alterar === false || props.alterar === props.index
            ? props.activeInputs(props.number, props.index)
            : ""
        }
        id={`${name}_userColumn_${props.number}_${props.index}`}
        className={`${name}_userColumn_${props.index}`}
      >
        {props.text}
      </p>
      <input
        className={`${name}_userColumn_input_${props.index}`}
        id={`${name}_userColumn_input_${props.number}_${props.index}`}
        style={{ display: "none" }}
        type={props.typeInput}
        placeholder={props.placeholder}
        onChange={(e) => props.setEstado(e.target.value)}
      />
    </td>
  );
}
function HeadColumn(props) {
  return (
    <td>
      <p
        style={{ display: "block" }}
        onDoubleClick={(e) => props.alterar === false || props.alterar === props.index
            ? props.activeInputsBusca(props.index)
            :""}
        className={`${name}_busca_text`}
        id={`${name}_busca_${props.index}`}
      >
        {props.text}
      </p>

      <input
        type={props.inputType}
        placeholder={props.placeholder}
        onChange={(e) => props.setEstado(e.target.value)}
        style={{ display: "none" }}
        className={`${name}_busca_input`}
        id={`${name}_buscaInput_${props.index}`}
      />
    </td>
  );
}
