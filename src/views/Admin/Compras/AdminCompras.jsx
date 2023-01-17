import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Keys from "../../../../Keys";
import "./AdminCompras.scss";
import searcha from "../../../assets/icons8-view-96.png";
import deletea from "../../../assets/icons8-delete-document-96.png";
import close from "../../../assets/icons8-close-96.png";
import done from "../../../assets/icons8-done-96.png";
import send from "../../../assets/icons8-mail-96.png";
import Overlay from "../../../components/Overlay";
import invoice from "../../../assets/icons8-invoice-96.png";
let name = "AdminCompras";
export default function AdminCompras(props) {
  const [Compras, setCompras] = useState([]);
  const [busca, setBusca] = useState(false);
  const [buscaIdCompra, setBuscaIdCompra] = useState("");
  const [buscaNomesProdutos, setBuscaNomesProdutos] = useState("");
  const [buscaQuantidade, setBuscaQuantiade] = useState("");
  const [buscaValorTotal, setBuscaValorTotal] = useState("");
  const [buscaDataDeNascimento, setBuscaDataDeNascimento] = useState("");
  const [buscaNomeUsuario, setBuscaNomeUsuario] = useState("");
  const [buscaEmail, setBuscaEmail] = useState("");
  const [buscaData, setBuscaData] = useState("");
  const [buscaCpf, setBuscaCpf] = useState("");
  const [buscaEntregaStatus, setBuscaEntregaStatus] = useState("");
  const [alterar, setAlterar] = useState(false);
  const [Estornar, setEstornar] = useState(false);
  const [confirmarPagamento, setConfirmarPagamento] = useState(false);
  const [buscaEndereco,setBuscaEndereco] = useState("");
  const [buscaCep,setBuscaCep] = useState("");
  useEffect(() => {
    mapProduct();
  }, []);
  const mapProduct = () => {
    fetch(`${Keys.backEnd}AllCompras/${props.admin.nome}/${props.admin.senha}`)
      .then((response) => response.json())
      .then((data) => setCompras(data));
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
    let inputs = document.getElementsByClassName(`${name}_busca_input`);
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }
    let texto = document.getElementsByClassName(`${name}_busca_text`);
    for (let i = 0; i < texto.length; i++) {
      texto[i].style.display = "block";
    }

    setBusca(false);
  };
  const confirmarEntrega = async(index)=>{
    await fetch(`${Keys.backEnd}ConfirmarEntrega/${props.admin.nome}/${props.admin.senha}/${Compras[index].idCompra}`,{
        method:'PUT'
    })
    mapProduct();
  }
  const estornar = async(index)=>{
    await fetch(`${Keys.backEnd}EstornarCompra/${props.admin.nome}/${props.admin.senha}/${Compras[index].idCompra}`,{
        method:'POST'
    })
    setEstornar(false)
    mapProduct();
  }
  const returnCompras = () => {
    try {
      return Compras.filter((value) => {
        if (buscaIdCompra) {
          return value.idCompra.toString().includes(buscaIdCompra);
        } else {
          return value;
        }
      })
        .filter((value) => {
          if (buscaNomeUsuario) {
            return value.FirstName.toString().includes(buscaNomeUsuario);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaNomesProdutos) {
            return value.NomeProdutos.toString().includes(buscaNomesProdutos);
          } else {
            return value;
          }
        })
        .filter((value) => {
            if (buscaEndereco) {
              return value.Endereco.toString().includes(buscaEndereco);
            } else {
              return value;
            }
          })
          .filter((value) => {
            if (buscaCep) {
              return value.CEP.toString().includes(buscaCep);
            } else {
              return value;
            }
          })
        .filter((value) => {
          if (buscaQuantidade) {
            return value.Quantidades.toString().includes(buscaQuantidade);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaValorTotal) {
            return value.ValorTotal.toString().includes(buscaValorTotal);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaCpf) {
            return value.CPF.toString().includes(buscaCpf);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaEmail) {
            return value.Email.toString().includes(buscaEmail);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaData) {
            return value.dataAprovacao.toString().includes(buscaData);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaEntregaStatus) {
            return value.EntregaStatus.toString().includes(buscaEntregaStatus);
          } else {
            return value;
          }
        })
        .map((value, index) => {
          return (
            <tr key={`compras/${index}`}>
              <td>
                <p>{value.idCompra}</p>
              </td>
              <td>
                <p>{value.FirstName}</p>
              </td>
              <td>
                <p>{value.NomeProdutos}</p>
              </td>
              <td>
                <p>{value.Endereco.replace(/[{}"]/g, '').replace(/[:,]/g, " ")}</p>
              </td>
              <td>
                <p>{value.CEP}</p>
              </td>
              <td>
                <p>{value.Quantidades}</p>
              </td>
              <td>
                <p>{value.ValorTotal}</p>
              </td>
              <td>
                <p>{value.CPF}</p>
              </td>
              <td>
                <p>{value.Email}</p>
              </td>
              <td>
                <p>{value.dataAprovacao.split("T")[0]}</p>
              </td>
              <td>
                <p>{value.EntregaStatus}</p>
              </td>
              <td>
              <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={send}
                    onClick={(e) => setConfirmarPagamento(index)}
                  />
              </td>
              <td>
              <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={invoice    }
                    onClick={(e) => setEstornar(index)}
                  />
              </td>
            </tr>
          );
        });
    } catch (err) {
      console.log(err.message);
      return <></>;
    }
  };
  const handlerEstornar = ()=>{
    setEstornar(false)
  }
  const handlerEntrega = ()=>{
    setConfirmarPagamento(false)
  }
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
                  setEstado={setBuscaIdCompra}
                  activeInputsBusca={activeInputsBusca}
                  text={"#"}
                />
                <HeadColumn
                  index={1}
                  alterar={alterar}
                  setEstado={setBuscaNomeUsuario}
                  activeInputsBusca={activeInputsBusca}
                  text={"Nome Usuario"}
                />
                <HeadColumn
                  index={2}
                  alterar={alterar}
                  setEstado={setBuscaNomesProdutos}
                  activeInputsBusca={activeInputsBusca}
                  text={"Nome produtos"}
                />
                <HeadColumn
                  index={3}
                  alterar={alterar}
                  setEstado={setBuscaEndereco}
                  activeInputsBusca={activeInputsBusca}
                  text={"Endereço"}
                />
                <HeadColumn
                  index={4}
                  alterar={alterar}
                  setEstado={setBuscaCep}
                  activeInputsBusca={activeInputsBusca}
                  text={"CEP"}
                />
                <HeadColumn
                  index={5}
                  alterar={alterar}
                  setEstado={setBuscaQuantiade}
                  activeInputsBusca={activeInputsBusca}
                  text={"Quantidades"}
                />
                <HeadColumn
                  index={6}
                  alterar={alterar}
                  setEstado={setBuscaValorTotal}
                  activeInputsBusca={activeInputsBusca}
                  text={"Valor Total"}
                />

                <HeadColumn
                  index={7}
                  alterar={alterar}
                  setEstado={setBuscaCpf}
                  activeInputsBusca={activeInputsBusca}
                  text={"CPF"}
                />
                <HeadColumn
                  index={8}
                  alterar={alterar}
                  setEstado={setBuscaEmail}
                  activeInputsBusca={activeInputsBusca}
                  text={"Email"}
                />
                <HeadColumn
                  index={9}
                  alterar={alterar}
                  setEstado={setBuscaData}
                  activeInputsBusca={activeInputsBusca}
                  text={"Data"}
                />
                <HeadColumn
                  index={10}
                  alterar={alterar}
                  setEstado={setBuscaEntregaStatus}
                  activeInputsBusca={activeInputsBusca}
                  text={"Entrega Status"}
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
                <td />
              </tr>
            </thead>
            <tbody>{returnCompras()}</tbody>
          </table>
        </div>
      </div>
      <Overlay handler={Estornar} setHandler={handlerEstornar}>
        <div className="card">
          <div className="card__content">
            <div className="card__content-heading">
              <h2>Tem Certeza ?</h2>
              <br />
            </div>
            <div className="card__content-body">
              
              <p>
                {" "}
                O produto <strong>{`${Compras[Estornar]!==undefined?Compras[Estornar].idCompra:""}`}</strong> sera estornado
               
              </p>
            </div>
            <div className="card__content-footer">
              <button onClick={e=>estornar(Estornar)}> Sim</button>
              <button onClick={e=>setEstornar(false)}> Não</button>
            </div>
          </div>
        </div>
      </Overlay>
      <Overlay handler={confirmarPagamento} setHandler={handlerEntrega}>
        <div className="card">
          <div className="card__content">
            <div className="card__content-heading">
              <h2>Tem Certeza ?</h2>
              <br />
            </div>
            <div className="card__content-body">
              
              <p>
                {" "}
                O produto <strong>{`${Compras[confirmarPagamento]!==undefined?Compras[confirmarPagamento].idCompra:""}`}</strong> tera o status de entrega alterado
               
              </p>
            </div>
            <div className="card__content-footer">
              <button onClick={e=>{confirmarEntrega(confirmarPagamento);setConfirmarPagamento(false)}}> Sim</button>
              <button onClick={e=>setConfirmarPagamento(false)}> Não</button>
            </div>
          </div>
        </div>
      </Overlay>
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
        onDoubleClick={(e) =>
          props.alterar === false || props.alterar === props.index
            ? props.activeInputsBusca(props.index)
            : ""
        }
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
