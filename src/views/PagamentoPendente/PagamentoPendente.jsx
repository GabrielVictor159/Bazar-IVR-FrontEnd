import React, { useEffect, useRef } from "react";
export default function PagamentoPendente(props){
    
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
            Pagamento Pendente
         </h6>
         <br />
         <p className="TextoSucessoRegistrar">Seu pagamento ainda está com o status pendente, quando o pagamento for confirmado será enviado para nós e assim poderemos dar andamento na compra e você será notificado no seu perfil  </p>
         <br />
         <button className="ButtonRetornarSucessoRegistrar" onClick={returnHome}>Retornar</button>
         <br />
         </div>
        </div>
        </>
    );
}