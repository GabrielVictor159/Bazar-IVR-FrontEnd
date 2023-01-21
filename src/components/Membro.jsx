import React from "react";
import "./Membro.scss";
import facebook from "../assets/icons8-facebook-f-384.png"
import instagram from "../assets/icons8-instagram-480.png"
import twitter from "../assets/icons8-twitter-480.png"
import youtube from "../assets/icons8-youtube-500.png"
import tiktok from "../assets/icons8-tiktok-500.png"
import linkedin from "../assets/icons8-linkedin-2-500.png"
export default function Membro(props){
    function checkAndAddHttps(link) {
        if (!link.startsWith("https://")) {
            link = "https://" + link;
        }
        return link;
    }
    const linkAcess = (link)=>{
        document.location.href=checkAndAddHttps(link)
    }
    return(
        <div style={{width:props.width, height:props.height}} className={"Membro_box"}>
            <img src={props.Membro.LinkImage}/>
            <div style={{width:props.width, height:props.height}} className={"Membro_body"}>
                <div style={{width:props.width, height:props.height}} className={"Membro_bodyInformacoes"}>
                    <p></p><p></p>
                <div className="Membro_containerTitulo">
                <h6 className="Membro_Nome">{props.Membro.Nome}</h6>
                <p className="Membro_Titulo">{props.Membro.Titulo}</p>
                </div>
                <p></p>
                <p></p>

                <p className="Membro_Descricao">{props.Membro.Descricao}</p>
                <br />
                <div className="Membro_ContainerRedes">
                    {
                        props.Membro.Facebook!==null &&  props.Membro.Facebook!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.Facebook)}><img src={facebook}/></a> 
                        :<></>
                    }
                    {
                        props.Membro.Instagram!==null &&  props.Membro.Instagram!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.Instagram)}><img src={instagram}/></a> 
                        :<></>
                    }
                    {
                        props.Membro.Twitter!==null &&  props.Membro.Twitter!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.Twitter)}><img src={twitter}/></a> 
                        :<></>
                    }
                    {
                        props.Membro.Youtube!==null &&  props.Membro.Youtube!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.Youtube)}><img src={youtube}/></a> 
                        :<></>
                    }
                    {
                        props.Membro.TikTok!==null &&  props.Membro.TikTok!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.TikTok)}><img src={tiktok}/></a> 
                        :<></>
                    }
                    {
                        props.Membro.Linkedin!==null &&  props.Membro.Linkedin!==undefined
                        ?<a onClick={e=>linkAcess(props.Membro.Linkedin)}><img src={linkedin}/></a> 
                        :<></>
                    }
                    
                </div>
                </div>
            </div>
        </div>
    );
}