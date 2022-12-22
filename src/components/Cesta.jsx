import React, { useEffect, useLayoutEffect } from "react";
import "./Cesta.css"
import bag from "../assets/basket.png"
export default function Cesta(props){
   
    useEffect(()=>{
        if(props.CestaVisible===false){
        document.getElementById('Cesta').classList.remove('CestaHidden');
       document.getElementById('CestaContainer').classList.remove('CestaContainerHidden');
       
        }
        else{
        document.getElementById('Cesta').classList.toggle('CestaHidden');
        document.getElementById('CestaContainer').classList.toggle('CestaContainerHidden');
    
        }
    })
   
    return(
        <div className='CestaContainer' id='CestaContainer' style={{left:props.width-410}}>
        <div className='Cesta' id='Cesta'>
            <br />
        <div className="CestaImageContainer">
        <img src={bag}/>
        </div>
        <br />
        <div className="CestaItensContainer">
        
        </div>
        </div>
    </div>
    );
}