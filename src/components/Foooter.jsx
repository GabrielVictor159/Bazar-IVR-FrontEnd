import React from "react";
import "./Foooter.scss";
export default function Foooter(props){
    return(
  
             <footer id={`${props.id}`}>
            <div style={{width:'95%', height:'100%',display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <div className="footer_navegation_options" style={{display:'flex', flexDirection:'row', width:'30%', justifyContent:'space-around', color:'white'}}>
                    <p onClick={e=>window.location="/"}>Inicio</p>
                    <p onClick={e=>window.location="/Sobre"}>Sobre Nós</p>
                    <p onClick={e=>window.location="/Quero"}>Quero Fazer Parte</p>
                    <p onClick={e=>window.location="/Ajuda"}>Ajuda</p>
                </div>
            <p style={{color:'white'}}>© 2023 Instituto Viver Rafaela. Todos os direitos reservados.</p>
            </div>
            
        </footer>

    );
}