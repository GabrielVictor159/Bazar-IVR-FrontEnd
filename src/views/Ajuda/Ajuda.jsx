import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Keys from "../../../Keys";
import AjudaMensagem from "../../components/AjudaMensagem";
import AnimationIntersection from "../../components/AnimationIntersection";
import Foooter from "../../components/Foooter";
import Head from "../../components/Head";
import "./Ajuda.scss";
const name = "Ajuda"
export default function Ajuda(props) {
    const [atualizar, setAtualizar] = useState(0);
    const [items, setItems] = useState([]);
    const animationIntersection = new AnimationIntersection();
    useEffect(() => {
        if (items) {
            let a = [
                {
                    name: `${name}_nav`,
                    animationName: "topSurge"
                },
                {
                    name: `${name}_footer`,
                    animationName: "bottomSurge"
                }
            ]
            items.map((value,index)=>{
                a.push(
                    {
                        name: `${name}_faq_${index}`,
                        animationName: "scale"
                    }, 
                )
            })
            animationIntersection.oberseve(a)
        }
    }, [items])
    useEffect(() => {
        fetch(`${Keys.backEnd}AllFaqs`)
            .then((res) => res.json())
            .then((data) => setItems(data))
    }, [])
    const mapFaqs = () => {
        try {
            return items.map((value, index) => {
                return (
                    <div id={`${name}_faq_${index}`} key={`ajuda_${index}`} style={{opacity:0}}>

                        <AjudaMensagem Titulo={value.Titulo} Texto={value.Texto} />
                        <br /><br /><br />
                    </div>

                )
            })
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            <Head id={`${name}_nav`} atualizar={atualizar} setAtualizar={setAtualizar} active={"Ajuda"} />
            <br /><br /><br />
            <div className={`${name}_body`}>
                {
                    mapFaqs()
                }
            </div>
            <br /><br /><br />
            <Foooter id={`${name}_footer`}/>
        </>
    );
}