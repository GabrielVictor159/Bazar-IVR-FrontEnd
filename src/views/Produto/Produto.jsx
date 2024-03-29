// javascript array indexOf ?

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from 'react';
import { useParams } from "react-router-dom";
import NavbarBazar from '../../components/navbarBazar';
import "./Produto.scss"
import Book from "../../assets/book.png"
import Cesta from "../../components/Cesta";
import Keys from "../../../Keys";
import Foooter from "../../components/Foooter";
import AnimationIntersection from "../../components/AnimationIntersection";
export default function Produto(props){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    let { id } = useParams();
    const [produto, setProduto] = useState('');
    const [CestaVisible, setCestaVisible] = useState(true);
    const [atualizar, setAtualizar] = useState(0);
    const animationIntersection = new AnimationIntersection();
    useEffect( ()=>{
      
        fetch(`${Keys.backEnd}Produtos/${id}`)
            .then((responde)=>responde.json())
            .then((data)=> setProduto(data));
          
     
  
    },[])
    useEffect(()=>{
      if(produto!==''){
        const a = [
          {
            name:"Produto_Nav",
            animationName:"topSurge"
          },
          {
            name:"Produto_Box_Image",
            animationName:"leftSurge"
          },
          {
            name:"Produto_Box_Informacoes",
            animationName:"rightSurge"
          },
          {
            name:"Produto_Box_Titulo_Descricao",
            animationName:"leftSurge"
          },
          {
            name:"Produto_Box_Text_Descricao",
            animationName:"bottomSurge"
          },
          {
            name:"Produto_Footer",
            animationName:"bottomSurge"
          },
        ]
        animationIntersection.oberseve(a)
      }
      return ()=>animationIntersection.oberseve([],true)
    },[produto])
    function handleCesta (){
  
      if(CestaVisible){
        document.getElementById('Cesta').classList.toggle('CestaHidden');
        document.getElementById('CestaContainer').classList.toggle('CestaContainerHidden');
      }
      else{
        document.getElementById('Cesta').classList.remove('CestaHidden');
       document.getElementById('CestaContainer').classList.remove('CestaContainerHidden');
      }
      setCestaVisible(!CestaVisible)
      
    }
    function Comprar(){
      window.location=`/FinalizarCompra/${id}`
    }
    function AddCesta(){
      function findId(array,id){
       
        return array.findIndex(object => {
          return object.idProduto === id;
        });
      }
      let a =[]
      if(localStorage.getItem('Cesta')!==null){
      try{
        a = JSON.parse(localStorage.getItem('Cesta'))
        console.log(produto.idProduto)
        if(findId(a, produto.idProduto)===-1){
        a.push(
          {
           idProduto:produto.idProduto,
           Nome:produto.Nome,
           Descricao:produto.Descricao,
           Quantidade:1,
           LinkImage:produto.LinkImage,
           Valor:produto.Valor
          }
        )
        localStorage.setItem('Cesta', JSON.stringify(a))
        setAtualizar(atualizar+1)
        window.location="/"
        }
        else{
          console.log(findId(a, produto.idProduto))
          a[findId(a, produto.idProduto)].Quantidade += 1;
          localStorage.setItem('Cesta', JSON.stringify(a))

          setAtualizar(atualizar+1)
          window.location="/"
        }
      }
      catch(exception){
        console.log(exception.message)
      }
    }
    else{
      try{
        a.push(
          {
           idProduto:produto.idProduto,
           Nome:produto.Nome,
           Descricao:produto.Descricao,
           Quantidade:1,
           LinkImage:produto.LinkImage,
           Valor:produto.Valor
          }
        )
        localStorage.setItem('Cesta', JSON.stringify(a))
        setAtualizar(atualizar+1)
        window.location="/"
      }
      catch(exception){
        console.log(exception.message)
      }
    }
    }
    return(
        <>
          <NavbarBazar id={"Produto_Nav"} handleCesta={handleCesta} width={windowSize.current[0]} height={windowSize.current[1]} />
          <div className="BoxProduto">
                <div id="Produto_Box_Image" className="BoxImage" >
                <img className="ImageProduto" src={produto.LinkImage}/>
                </div>
                <div id="Produto_Box_Informacoes" className="BoxInformacoes">
                <div className="TextBox">
                <h6 className="Valor">{`R$ ${produto.Valor}`}</h6>
                <p className="Quantidade">{`Quantidade disponivel: ${produto.Quantidade}`}</p>
                </div>
                <div className="ButtonBox">
                <div className="Button" style={{backgroundColor:'#00AECD'}} onClick={Comprar}>
                <h6 style={{color:'white', fontSize:20}}>
                {'Comprar'}
                </h6>
                </div>
                <div className="Button" style={{backgroundColor:'#0E778A', left:20}} onClick={AddCesta}>
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
            <div  id={"Produto_Box_Titulo_Descricao"} className="BoxTituloDescricao">
            <img className="bookImage" src={Book}/>
            <h6 className="TituloDescricao">{'Descrição do Produto'}</h6>
            </div>
            <div id="Produto_Box_Text_Descricao"  className="BoxTextDescricao">
            <p>{`   ${produto.Descricao}`}</p>
            </div>
          </div>
          <Foooter id={"Produto_Footer"} />
          <Cesta atualizar={atualizar} setAtualizar={setAtualizar} width={windowSize.current[0]} CestaVisible={CestaVisible}/>
          
        </>
       
    );
    
}