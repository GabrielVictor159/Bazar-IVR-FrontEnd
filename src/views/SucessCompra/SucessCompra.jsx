import React, { useEffect, useRef } from "react";
export default function SucessoCompra(props){
    
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
            <br />
         <h6 className="TituloSucessoRegistrar">
            Sucesso na sua Compra
         </h6>
         <br />
         <p className="TextoSucessoRegistrar">Verifique o seu perfil de usuário para ver o status de entrega, qualquer problema com a sua compra leia a guia de ajuda ou entre em contato com a gente </p>
         <br />
         <button className="ButtonRetornarSucessoRegistrar" onClick={returnHome}>Retornar</button>
         <br />
         </div>
        </div>
        </>
    );
}