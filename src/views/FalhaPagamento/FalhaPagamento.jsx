import React, { useEffect, useRef } from "react";
export default function FalhaPagamento(props){
    
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
            Falha no Pagamento
         </h6>
         <br />
         <p className="TextoSucessoRegistrar">Houve um problema no seu pagamento, por favor verifique os seus meios de pagamento, se estiver tudo ok por favor entre em contato com a gente houve um problema no seu pagamento, por favor verifique os seus meios de pagamento, se estiver tudo ok por favor entre em contato com a gente </p>
         <br />
         <button className="ButtonRetornarSucessoRegistrar" onClick={returnHome}>Retornar</button>
         <br />
         </div>
        </div>
        </>
    );
}