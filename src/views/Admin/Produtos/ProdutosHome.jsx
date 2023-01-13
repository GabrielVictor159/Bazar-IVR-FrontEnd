import React, { useEffect, useRef, useState } from "react";
import Keys from "../../../../Keys";
import "./ProdutosHome.css"
export default function ProdutosHome(props){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        mapProduct()
    },[])
    const mapProduct = ()=>{
       fetch(`${Keys.backEnd}Produtos/FindAll`)
       .then((response)=>response.json())
       .then((data)=> setProducts(data))
    }
    const navImage = (link)=>{
        window.location=link
    }
    const returnProducts = ()=>{
        try{
            return products.map((value, index)=>{
                return(
                    <tr key={`produto/${index}`}>
                    <td><p>{value.idProduto}</p></td>
                    <td><p>{value.Nome}</p></td>
                    <td><p>{value.Descricao}</p></td>
                    <td><p>{value.Quantidade}</p></td>
                    <td><p onClick={e=> navImage(`${value.LinkImage}`)}>{value.NomeImage}</p></td>
                    <td><p>{value.Valor}</p></td>
                    <td></td>
                    <td></td>
                  </tr>
                );
            })
        }
        catch{
            return <></>
        }
    }
    return(
        <div className="ProdutosHome_body" >
            <div className="ProdutosHome_produtos">
            <table >
            <thead>
              <tr style={{position:'sticky', top:0, zIndex:1}}>
                <td><p>{'#'}</p></td>
                <td><p>{'Nome'}</p></td>
                <td><p>{'Descrição'}</p></td>
                <td><p>{'Quantidade'}</p></td>
                <td><p>{'Imagem'}</p></td>
                <td><p>{'Valor'}</p></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
           {
            returnProducts()
           }
            </tbody>
            
          </table>
            </div>
        </div>
    );
}