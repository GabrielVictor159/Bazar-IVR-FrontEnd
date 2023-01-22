import React, { useEffect, useLayoutEffect, useState } from "react";
import Cesta from "../../components/Cesta";
import Foooter from "../../components/Foooter";
import Head from "../../components/Head";
import NavbarBazar from "../../components/navbarBazar";
import "./Sobre.scss";
import banner1 from "../../assets/img-sobre-1388x300.png";
import banner2 from "../../assets/img-sobre-texto-1024x1024.png";
import Keys from "../../../Keys";
import Overlay from "../../components/Overlay";
import Membro from "../../components/Membro";
const name = "Sobre"
export default function Sobre(props) {
    const [atualizar, setAtualizar] = useState(0);
    const [images, setImages] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [Index, setIndex] = useState(false);
    const [membros, setMembros] = useState([]);

    const toggleFullscreen = () => {

        setIsFullscreen(false);
    }

    useLayoutEffect(() => {
        fetch(`${Keys.backEnd}AllImagesInstituto`)
            .then((response) => response.json())
            .then((data) => setImages(data))
    }, [])
    useEffect(()=>{
        membrosFetch()
    },[])
    const mapImages = ()=>{
        try{
       return images.map((value, index) => {
          return  <img className={`${name}_imagesInstituto`} src={value.LinkImage} onClick={() => { setIsFullscreen(true); setIndex(index) }} />
       })
        }
        catch{

        }
    }
    const imageOverlay = ()=>{
        try{
            return <>{Index>0?<div onClick={e=>setIndex(Index-1)} className={`${name}_imagesOverlay_backPage`}/>:<></>} <img className={`${name}_imagesOverlay`} src={images[Index].LinkImage}  /> {Index<images.length-1?<div onClick={e=>setIndex(Index+1)} className={`${name}_imagesOverlay_nextPage`}/>:<></>}</>
        }
        catch(err){
            console.log(err.message)
        }
    }
    const membrosFetch = () =>{
        fetch(`${Keys.backEnd}AllMembros`)
        .then((response)=>response.json())
        .then((data)=>setMembros(data))

    }
    const mapMembros = ()=>{
        try{
        return membros.map((value,index)=>{
            return(
            <div key={`membro_${index}`}>
                <Membro Membro={value} width={500} height={500} />
            </div>
            )
        })
    }
    catch{

    }

    }
    return (
        <>
        {images!==false
        ?<>
            <Head atualizar={atualizar} setAtualizar={setAtualizar} active={"Sobre"} />
            <div className={`${name}_body`}>
                <br />
                <div className={`${name}_container_1`}>
                    <img src={banner1} />
                    <div>
                        <a />
                        <h1>Sobre Nós</h1>
                    </div>

                </div>
                <br /><br /><br />
                <div className={`${name}_container_2`}>
                    <div>
                        <h6>SOBRE NÓS</h6>
                        <h1>Nós acreditamos que podemos mudar o mundo Com Amor!</h1>
                        <br />
                        <p>Quando conhecemos Rafaela, o amor de sua família por ela nos estimulou a organizar uma surpresa. Não, não era seu aniversário, nem alguma data especial, estávamos comemorando apenas a sua vida, tínhamos presentes, pessoas do grupo @toquedeamorinsta , sua família e até uma música dedicada especialmente a ela, feita por nosso amigo @antoniocrezende . Ao chegar no hospital lá estava ela, dormindo, com um semblante de tanta paz, entramos com passos finos e discretos, ao mesmo tempo apreensivos sobre a sua reação ao se deparar com toda aquela gente presente. Em ritmo lento e em calmaria demos início a música. Sua primeira reação foi um sorriso, sorriso que ela mantinha apesar de todas as batalhas enfrentadas no tratamento contra o câncer (sim, 15 anos e ela já havia recebido esse diagnóstico). Após alguns dias da nossa visita, Rafaela, uma menina que tinha muita fé em Deus, foi encontrar-se com o Pai na Esperança de que Ele tudo sabia e que a Sua vontade era boa, perfeita e agradável. A partir desta experiência nasceu em nosso coração o desejo de criar um projeto onde pessoas como a Rafaela ou qualquer outro que precise de alguma ajuda pudesse ser assistido. Essa é a história do nosso Instituto Viver Rafaela, uma associação sem vínculos políticos, financeiros e religiosos, que visa auxiliar ao próximo necessitado, ofertar assistência à saúde e promover ações educativas e de assistência social às pessoas em situação de vulnerabilidade.
                            Se você tiver interesse, junte-se a nós nessa missão. Aceitamos qualquer tipo de ajuda, um pequeno gesto pode ser muito na vida de alguém.</p>
                    </div>
                    <img src={banner2} />
                </div>
                <br /><br /><br />
                <div className={`${name}_container_3`}>
              { mapImages()}

            </div>
            <br /><br /><br /><br />
            <div>
                <h1 style={{fontSize:35, borderBottom:'2px solid #FC81FF', paddingBottom:20}}>NOSSO TIME</h1>
                
            </div>
            <br />
            <div>
            <p style={{fontSize:20,  textAlign:'center'}}>Tudo que realizamos só é possível através de pessoas que se comprometeram em amar o próximo. O instituto só é o que é por causa da colaboração e dedicação de cada um. Conheça nosso time!</p>
            </div>
            <br /><br />
            <div className={`${name}_container_membros`}>
            {
                mapMembros()
            }
            </div>
            </div>
            <br />
            
            <br /><br /><br />
            <Foooter id='Home_Footer' />
           
                <Overlay handler={isFullscreen} setHandler={toggleFullscreen}>
                   {imageOverlay()}
                </Overlay>

            
        </>:<></>}
        </>

    );
}