import React, { useLayoutEffect, useState } from "react";
import Keys from "../../../../Keys";
import Compra from "../../Compra/Compra";
import list from "../../../assets/to-do-list.png";
import "./AdminCompra.scss";
const name = "AdminCompra"
export default function AdminCompra(props){
    const [compra, setCompra] = useState("");
    useLayoutEffect(() => {
        fetch(`${Keys.backEnd}Compra/${props.id}`)
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
    return(
        <div className={`${name}_body`}>
            <br /><br /><br /><br /><br />
            <div className={`${name}_box`}>
                <>
                {compra!==""?
                <>
                <br />
            <div className={`${name}_Titulo_Container`}>
            <img width={40} height={40} src={list} />
            <h6 className={`${name}_Titulo_Text`}>{`Compra #${compra.idCompra}`}</h6>
          </div>
          <div className={`${name}_Texts_Container`}>
            <p className={`${name}_Texts_TituloItem`}>Data do pedido:</p>
            <p>{`${compra.dataAprovacao.substring(8, 10)}
          /${compra.dataAprovacao.substring(5, 7)}
          /${compra.dataAprovacao.substring(0, 4)}
              ${compra.dataAprovacao.substring(11, 19)}`}</p>
            <div
              className={`${name}_Status_Container`}
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
           
            <label className={`${name}_Texts_TituloItem`}>Endereço:</label>
            <label className={`${name}_Texts_text`}>{`
            ${JSON.parse(compra.Endereco).Rua}
            ${JSON.parse(compra.Endereco).Numero}
            ${JSON.parse(compra.Endereco).Bairro}
            ${JSON.parse(compra.Endereco).Cidade}
            ${JSON.parse(compra.Endereco).Estado}
            - ${compra.CEP}
            `}</label>
            <br/>
            <label className={`${name}_Texts_TituloItem`}>Telefone: </label>
            <label className={`${name}_Texts_text`}>{`${compra.Telefone}`}</label>
            <br />
            <br />
            <h6>Usuario</h6>
            <label className={`${name}_Texts_TituloItem`}>Nome: </label>
            <label className={`${name}_Texts_text`}>{`${compra.FirstName} ${compra.LastName}`}</label>
            <br />
            <label className={`${name}_Texts_TituloItem`}>CPF: </label>
            <label className={`${name}_Texts_text`}>{`${compra.CPF}`}</label>
            <br />
            <label className={`${name}_Texts_TituloItem`}>Email: </label>
            <label className={`${name}_Texts_text`}>{`${compra.Email}`}</label>
          </div>
          <br/>
          <div className={"UsuarioTableCompras"} style={{position:'relative', left:'2%', width:'93%', minHeight:'30%'}}>
          <table>
            <thead>
              <tr style={{position:'sticky', top:0, zIndex:1}}>
                <td className={`${name}_Table_column1`}><p>{'Nome do produto'}</p></td>
                <td className={`${name}_Table_column2`}><p>{'Preço'}</p></td>
                <td className={`${name}_Table_column2`}><p>{'Quantidade'}</p></td>
                <td className={`${name}_Table_column3`}><p>{'SubTotal'}</p></td>
              </tr>
            </thead>
            <tbody>
          {mapItems(    )}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                    {`Valor Total: ${compra.ValorTotal}`}
                    </td>
                </tr>
            </tfoot>
          </table>
          </div>
          <br /><br /> <br />
          </>
          :<></>}
          </>
        </div>   
            <br /><br /><br /><br />
        </div>
    );
}