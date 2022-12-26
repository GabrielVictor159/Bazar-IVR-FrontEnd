import React, { useEffect, useRef } from "react";

export default function EsqueceuSenhaSucesso(props){
    
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        document.body.style.background = 'linear-gradient(90deg, #0071DA 0%, #73FDFD 100%)'
    }, [])
    const returnHome = ()=>{
        window.location="/"
    }
    return(
        <>
         <div className="ContainerBody" style={{ height: windowSize.current[1] }}>
         <div className="SucessoRegistrarContainer">
         <h6 className="TituloSucessoRegistrar">
            Solicitação criada
         </h6>
         <br />
         <p className="TextoSucessoRegistrar">Verifique o seu email para alterar sua senha</p>
         <br />
         <button className="ButtonRetornarSucessoRegistrar" onClick={returnHome}>Retornar</button>
         </div>
        </div>
        </>
    );
}