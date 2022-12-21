import React, { useEffect, useRef } from "react";

export default function Registrar(props){
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    
   
    return(
        <>
        <div className="ContainerBody" style={{height:windowSize.current[1]}}>

        </div>
        </>
    );
}