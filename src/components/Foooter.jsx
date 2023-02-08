import React from "react";
import "./Foooter.scss";
export default function Foooter(props){
    return(
  
             <footer id={`${props.id}`}>
            <div  className="footer_navegation" >
                <div className="footer_navegation_options" >
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