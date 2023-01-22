import React, { useState } from "react";
import Cesta from "./Cesta";
import NavbarBazar from "./navbarBazar";

export default function Head(props){
    const [CestaVisible, setCestaVisible] = useState(true);

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
    return(
        <>
        <NavbarBazar id={props.id} handleCesta={handleCesta} active={props.active} width={window.innerWidth} height={window.innerHeight} />
        <Cesta atualizar={props.atualizar} setAtualizar={props.setAtualizar} width={window.innerWidth} CestaVisible={CestaVisible} />
        </>
    );
}