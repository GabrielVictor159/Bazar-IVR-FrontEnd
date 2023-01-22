import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Keys from "../../../Keys";
import AjudaMensagem from "../../components/AjudaMensagem";
import Foooter from "../../components/Foooter";
import Head from "../../components/Head";
import "./Ajuda.scss";
const name = "Ajuda"
export default function Ajuda(props){
    const [atualizar, setAtualizar] = useState(0);
    const [items, setItems] = useState([]);
    useEffect(()=>{
        fetch(`${Keys.backEnd}AllFaqs`)
        .then((res)=>res.json())
        .then((data)=>setItems(data))
    },[])
    const mapFaqs=()=>{
        try{
            return items.map((value, index)=>{
                  return(  
                <div id={`${name}_faq_${index}`} key={`ajuda_${index}`}>
                  
                    <AjudaMensagem Titulo={value.Titulo} Texto={value.Texto}/>
                    <br />
                  </div>
                  
                  )
            })
        }
        catch(err){
            console.log(err.message)
        }
    }
    return(
        <>
        <Head atualizar={atualizar} setAtualizar={setAtualizar} active={"Ajuda"}/>
        <br /><br /><br />
        <div className={`${name}_body`}>
        {
            mapFaqs()
        }
        </div>
        <br /><br /><br />
        <Foooter />
        </>
    );
}