import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import Keys from "../../../../Keys";
import AjudaMensagem from "../../../components/AjudaMensagem";
import deleteIcom from "../../../assets/icons8-delete-document-100.png";
import "./Faqs.scss";
const name = "Faqs"
export default function Faqs(props){
    const [items, setItems] = useState([]);
    useLayoutEffect(()=>{
        document.body.style.background= "white"
    },[])
    useEffect(()=>{
        fetchFaq();
    },[])
    const fetchFaq = ()=>{
        fetch(`${Keys.backEnd}AllFaqs`)
        .then((res)=>res.json())
        .then((data)=>setItems(data))
    }
    const deleteItem = (id)=>{
        fetch(`${Keys.backEnd}Faqs/${props.admin.nome}/${props.admin.senha}/${id}`,{
            method:'DELETE'
        })
        .then((res)=> fetchFaq())
      
    }
    const mapFaqs=()=>{
        try{
            console.log(items)
            return items.map((value, index)=>{
                  return(  
                  <div key={`ajuda_${index}`}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <AjudaMensagem Titulo={value.Titulo} Texto={value.Texto}/>
                    <img onClick={e=>deleteItem(value.idFaq)} style={{position:'relative', left:30, cursor:'pointer'}} width={50} height={50} src={deleteIcom}/>
                    </div>
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
        <div className={`${name}_body`}>
        {
            mapFaqs()
        }
        </div>
        </>
    );
}