import React from "react";
import "./Produtos.css"

export default function Produtos(props){
    return(
        <>
        <div  className={'ContainerProduto'}>
            <div className="ContainerImage">
            <img src={props.image} className={"image"}/>
            </div>
            <div style={{width:'100%', height:'20%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <p>{props.titulo}</p>
            <h5>{`R$ ${props.valor}`}</h5>
            </div>
        </div>
        </>
    );
}