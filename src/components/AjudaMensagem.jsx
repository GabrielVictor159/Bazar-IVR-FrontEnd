import React from "react";
import { useState } from "react";
import "./AjudaMensagem.scss";
import MinusIcon from "../assets/icons8-minus-96.png";
import PlusIcon from "../assets/icons8-plus-math-100.png";
const name = "AjudaMensagem"
export default function AjudaMensagem(props){
    const [active, setActive] = useState(false);
    

    return (
      <div id={props.id} className={`${name}_box`} style={{paddingBottom:active?20:0}}>
         <div className="faq-header">
         <img src={active ? MinusIcon : PlusIcon} alt="faq-icon" onClick={() => setActive(!active)} className="faq-icon"/>
          <h2 onClick={() => setActive(!active)}> {props.Titulo}</h2>
        </div>
        {active && (
          <p className="faq-text">
           {props.Texto}
          </p>
        )}
      </div>
    );
}