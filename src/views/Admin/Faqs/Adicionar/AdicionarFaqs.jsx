import React from "react";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Keys from "../../../../../Keys";
import "./AdicionarFaqs.scss";
const name = "AdicionarFaqs"
export default function AdicionarFaqs(props){
    const [titulo, setTitulo] = useState(undefined);
    const [texto, setTexto] = useState(undefined);

    useLayoutEffect(()=>{
        document.body.style.background = "white"
    },[])

    const submitAll= ()=>{
        let data = {
            Titulo: titulo,
            Texto:texto
        }
        console.log(JSON.stringify(data))
        try{
        fetch(`${Keys.backEnd}Faqs/${props.admin.nome}/${props.admin.senha}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify(data)
            })
            .then((res)=>res.json())
            .then((data)=>toast(data.message===undefined?data.error:data.message))
            
           
        }
        catch(err){console.log(err.message)}
    }
    return(
        <>
        <div className={`${name}_body`}>
        <div className={`${name}_box`}>
 
            <input type={'text'} placeholder={'Titulo'} onChange={e=>setTitulo(e.target.value)}/>
            <textarea type={'text'} placeholder={'Texto'} onChange={e=>setTexto(e.target.value)}/>
            <button className="continue-application" onClick={submitAll}>
            <div>
              <div className="pencil"></div>
              <div className="folder">
                <div className="top">
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div className="paper"></div>
              </div>
            </div>
            Concluir
          </button>
        </div>
        </div>
        <ToastContainer />
        </>
    );
}