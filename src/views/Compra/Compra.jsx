import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Keys from "../../../Keys";
import Cesta from "../../components/Cesta";
import NavbarBazar from "../../components/navbarBazar";
import "./Compra.css";
import list from "../../assets/to-do-list.png";
export default function Compra(props) {
  const [compra, setCompra] = useState("");
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [CestaVisible, setCestaVisible] = useState(true);
  const [atualizar, setAtualizar] = useState(0);
  let { id } = useParams();
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
    document.body.style.background = "rgb(105, 105, 105)";
    fetch(`${Keys.backEnd}Compra/${id}`)
      .then((response) => response.json())
      .then((data) => setCompra(data));
  }, []);
  const mapItems = ()=>{
   
   let NomeProdutos= compra.NomeProdutos.split(", ");
    let Quantidades= compra.Quantidades.split(", ");
    let Valores= compra.Valores.split(", ");
    
    return NomeProdutos.map((value, index)=>{
        return(
            <tr>
                <td className="Compra_Table_column1"><p>{`${NomeProdutos[index]}`}</p></td>
                <td className="Compra_Table_column2"><p>{`${Valores[index]*Quantidades[index]}`}</p></td>
                <td className="Compra_Table_column2"><p>{`${Quantidades[index]}`}</p></td>
                <td className="Compra_Table_column3"><p>{`${Valores[index]}`}</p></td>
              </tr>
        )

    })
    
  }
  return compra !== "" ? (
    <>
      <NavbarBazar
        handleCesta={handleCesta}
        width={windowSize.current[0]}
        height={windowSize.current[1]}
      />

      <div className="Compra_Body">
        <br />
        <br />
        <div className="Compra_Informacoes_Container">
          <div className="Compra_Titulo_Container">
            <img width={40} height={40} src={list} />
            <h6 className="Compra_Titulo_Text">{`Compra #${compra.idCompra}`}</h6>
          </div>
          <div className="Compra_Texts_Container">
            <p className="Compra_Texts_TituloItem">Data do pedido:</p>
            <p>{`${compra.dataAprovacao.substring(8, 10)}
          /${compra.dataAprovacao.substring(5, 7)}
          /${compra.dataAprovacao.substring(0, 4)}
              ${compra.dataAprovacao.substring(11, 19)}`}</p>
            <div
              className="Compra_Status_Container"
              style={{
                backgroundColor:
                  compra.EntregaStatus === "Entrega Realizada"
                    ? "#2DDD06"
                    : compra.EntregaStatus === "Entrega pendente"
                    ? "yellow"
                    : "red",
              }}
            >
              <p>
                <strong>Status:</strong>
                {` ${compra.EntregaStatus}`}
              </p>
            </div>
            <br />
            <h6>Método de pagamento</h6>
            <p>{`${compra.Method}`}</p>
            <br/>
            <h6>Endereço de entrega</h6>
            <label className="Compra_Texts_TituloItem">Quem enviou: </label>
            <label className="Compra_Texts_text">{`${compra.FirstName} ${compra.LastName}`}</label>
            <br />
            <label className="Compra_Texts_TituloItem">Endereço:</label>
            <label className="Compra_Texts_text">{`
            ${JSON.parse(compra.Endereco).Rua}
            ${JSON.parse(compra.Endereco).Numero}
            ${JSON.parse(compra.Endereco).Bairro}
            ${JSON.parse(compra.Endereco).Cidade}
            ${JSON.parse(compra.Endereco).Estado}
            - ${compra.CEP}
            `}</label>
            <br/>
            <label className="Compra_Texts_TituloItem">Telefone: </label>
            <label className="Compra_Texts_text">{`${compra.Telefone}`}</label>
          </div>
          <br/>
          <div className="UsuarioTableCompras" style={{width:'93%', minHeight:'30%'}}>
          <table>
            <thead>
              <tr style={{position:'sticky', top:0, zIndex:1}}>
                <td className="Compra_Table_column1"><p>{'Nome do produto'}</p></td>
                <td className="Compra_Table_column2"><p>{'Preço'}</p></td>
                <td className="Compra_Table_column2"><p>{'Quantidade'}</p></td>
                <td className="Compra_Table_column3"><p>{'SubTotal'}</p></td>
              </tr>
            </thead>
            <tbody>
            {mapItems()}
            </tbody>
            
          </table>
          </div>
        </div>
      </div>
      <br />
      <br />
      <footer></footer>
      <Cesta
        atualizar={atualizar}
        setAtualizar={setAtualizar}
        width={windowSize.current[0]}
        CestaVisible={CestaVisible}
      />
    </>
  ) : (
    <></>
  );
}
