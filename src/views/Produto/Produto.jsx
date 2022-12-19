import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from 'react';
import { useParams } from "react-router-dom";
import NavbarBazar from '../../components/navbarBazar';
import "./Produto.css"
import Book from "../../assets/book.png"
export default function Produto(props){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let { id } = useParams();
    const [produto, setProduto] = useState('');
    useEffect( ()=>{
      
        fetch(`http://localhost:3030/Produtos/${id}`)
            .then((responde)=>responde.json())
            .then((data)=> setProduto(data));
          
     
  
    },[])
   
    return(
        <>
          <NavbarBazar  width={windowSize.current[0]} height={windowSize.current[1]} />
          <div className="BoxProduto">
                <div className="BoxImage" >
                <img className="ImageProduto" src={produto.LinkImage}/>
                </div>
                <div className="BoxInformacoes">
                <div className="TextBox">
                <h6 className="Valor">{`R$ ${produto.Valor}`}</h6>
                <p className="Quantidade">{`Quantidade disponivel: ${produto.Quantidade}`}</p>
                </div>
                <div className="ButtonBox">
                <div className="Button" style={{backgroundColor:'#00AECD'}}>
                <h6 style={{color:'white', fontSize:20}}>
                {'Comprar'}
                </h6>
                </div>
                <div className="Button" style={{backgroundColor:'#0E778A', left:20}}>
                <h6 style={{color:'white'}}>
                {'Adicionar ao Carrinho'}
                </h6>
                </div>
                </div>
                </div>
          </div>
          <br /><br />
          <div style={{width:'100%', height:70, backgroundColor:'#D9D9D9'}}/>
          <div className="BoxDescricao">
            <div className="BoxTituloDescricao">
            <img className="bookImage" src={Book}/>
            <h6 className="TituloDescricao">Descrição do Produto</h6>
            </div>
            <div  className="BoxTextDescricao">
            <p>{`   ${produto.Descricao}`}</p>
            </div>
          </div>
          <footer>
            
          </footer>
        </>
       
    );
}