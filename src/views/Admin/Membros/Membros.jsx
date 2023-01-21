import React, { useEffect, useLayoutEffect, useState } from "react";
import Keys from "../../../../Keys";
import Membro from "../../../components/Membro";
import "./Membros.scss";
const name = "Membros"
export default function Membros(props) {
    const [membros, setMembros] = useState([])
    useLayoutEffect(()=>{
        document.body.style.background= "white"
    })
    useEffect(() => {
        fetch(`${Keys.backEnd}AllMembros`)
            .then((response) => response.json())
            .then((data) => setMembros(data))
            
    }, [])
    const setMembro = (membro)=>{
        props.setSelectedMembro(membro);
        props.setEstado(12)
    }
    const mapMembros = () => {
        return membros.map((value, index) => {
            return (
                <div Keys={`membro_${index}`} style={{cursor:'pointer'}} onClick={e=>setMembro(value)} >
                <Membro Membro={value} width={500} height={500} />
                </div>
            );
        })
    }
    return (
        <div className={`${name}_body`}>
            <div className={`${name}_box`}>
                {
                    membros !== false
                        ? mapMembros()
                        : <></>
                }
            </div>

        </div>
    )
}