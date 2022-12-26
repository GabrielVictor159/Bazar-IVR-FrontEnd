import React, { useEffect, useRef } from "react";

export default function RedefinirSenhaSucesso(props){
    
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
            Senha Alterada
         </h6>
         <br />
         <p className="TextoSucessoRegistrar">Apartir de agora use a nova senha para fazer o login</p>
         <br />
         <button className="ButtonRetornarSucessoRegistrar" onClick={returnHome}>Retornar</button>
         </div>
        </div>
        </>
    );
}