import React from "react";
import { useState } from "react";
import Foooter from "../../components/Foooter";
import Head from "../../components/Head";
import "./FazerParte.scss";
import banner1 from "../../assets/img-contato-1388x320.png";
import qrcode from "../../assets/qrcode-instituto-300x300.png";
const name = "FazerParte"
export default function FazerParte(props){
    const [atualizar, setAtualizar] = useState(0);
    return(
        <>
        <Head atualizar={atualizar} setAtualizar={setAtualizar} active={"Quero"} />
        
        <div className={`${name}_body`}>
        <br />
                <div className={`${name}_container_1`}>
                    <img src={banner1} />
                    <div>
                        <a />
                        <h1>Faça Parte</h1>
                    </div>

                </div>
                <br />
                <div className={`${name}_container_2`}> 
                <img src={qrcode}/>
                <div>
                    <h1>Entre no nosso grupo de voluntários</h1>
                    <p>Escaneie o QRCode ao lado e ingresse em nosso grupo de voluntários no WhatsApp.</p>
                </div>
                </div>
        </div>
        <Foooter id={`${name}_Footer`} />
        </>
    );
}
