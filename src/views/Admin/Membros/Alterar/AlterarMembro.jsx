import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Keys from "../../../../../Keys";
import axios from "axios";
import "./AlterarMembro.scss"
import Membro from "../../../../components/Membro";
const name ="AlterarMembro"
export default function AlterarMembro(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [imageName, setImageName] = useState(undefined);
    const [nome, setNome] = useState(undefined);
    const [titulo, setTitulo] = useState(undefined);
    const [descricao, setDescricao] = useState(undefined);
    const [facebook, setFacebook] = useState(null);
    const [instagram, setInstagram] = useState(null);
    const [twitter, setTwitter] = useState(null);
    const [tiktok, setTiktok] = useState(null);
    const [linkedin, setLinkedin] = useState(null);
    const [youtube, setYoutube] = useState(null);
    const [membro, setMembro] = useState("");
    const [atualizacoes, setAtualizacoes] = useState(0)
    useLayoutEffect(()=>{
        document.body.style.background ="white"
    },[]);
    useEffect(() => {
        if (!selectedFile) {
          setPreview(undefined);
          return;
        }
    
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);
      useEffect(()=>{
        mapMembro()
      },[])
      const mapMembro = ()=>{
        fetch(`${Keys.backEnd}Membros/${props.selectedMembro.idMembro}`)
        .then((res)=>res.json())
        .then((data)=>setMembro(data))
      }
      const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined);
          setImageName(undefined);
          return;
        }
    
        setSelectedFile(e.target.files[0]);
        setImageName(e.target.files[0].name);
      };
      const focusImageInput = () => {
        document.getElementById("ImageInput").click();
        
      };
      const excluirMembro = async()=>{
        fetch(`${Keys.backEnd}Membros/${props.admin.nome}/${props.admin.senha}/${props.selectedMembro.idMembro}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if(data.message === 'Membro deletado com sucesso'){
                props.setEstado(10)
              }
              else{
                toast(data.message)
              }
            })
            .catch((error) => {
              toast("Error:", error);
            });
      }
      const alterarMembros = async()=>{
        if(selectedFile!==undefined){
            const formData = new FormData();
            formData.append("image", selectedFile);
            try {
              const response = await axios.post(
                `${Keys.backEnd}images/${props.admin.nome}/${props.admin.senha}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response);
            } catch (error) {
              toast(error.message);
            }
            }
            if(nome!==""){
            const otherData = {
              Nome:nome,
              Titulo:titulo,
              Descricao: descricao,
              Facebook: facebook,
              Instagram:instagram,
              Twitter:twitter,
              Youtube:youtube,
              TikTok:tiktok,
              Linkedin:linkedin,
              NomeImage: imageName
            };
           fetch(`${Keys.backEnd}Membros/${props.admin.nome}/${props.admin.senha}/${props.selectedMembro.idMembro}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(otherData),
            })
              .then((response) => response.json())
              .then((data) => {
                toast(data.message);
                mapMembro();
              })
              .catch((error) => {
                toast("Error:", error);
              });

            
            }

      }
    return (
        <div className={`${name}_body`}>
            <div className={`${name}_box_informacoes`}>
            <Membro Membro={membro} width={500} height={500}/>
            </div>
            <br /><br /><br />
             <div className={`${name}_box`}>
      <div className={`${name}_ImageBox`} onClick={focusImageInput}>
          <div className={`${name}_ImageBox_hover`}/>
          <form
            method="POST"
            action={`${Keys.backEnd}images/${props.admin.nome}/${props.admin.senha}`}
            encType="multipart/form-data"
          >
            <input type="file" id="ImageInput" onChange={onSelectFile} />
          </form>
          {selectedFile && (
            <img className={`${name}_imagePreview`} src={preview} />
          )}
        </div>
        <div className={`${name}_InputsBox`}>
            <input placeholder="Nome" class="input" name="InputNome" type="text" onChange={e=>setNome(e.target.value)}/>

            <input placeholder="Titulo" class="input" name="InputTitulo" type="text" onChange={e=>setTitulo(e.target.value)}/>

            <textarea  style={{maxWidth:'100%', resize:'both', transition:'resize 0s, border 0.5s, box-shadow 0.5s'}} placeholder="Descrição" class="input" name="InputDescricao" type="text" onChange={e=>setDescricao(e.target.value)}/>

            <input placeholder="Facebook" class="input" name="InputFacebook" type="text" onChange={e=>setFacebook(e.target.value)}/>

            <input placeholder="Instagram" class="input" name="InputInstagram" type="text" onChange={e=>setInstagram(e.target.value)}/>

            <input placeholder="Twitter" class="input" name="InputTwitter" type="text" onChange={e=>setTwitter(e.target.value)}/>

            <input placeholder="Youtube" class="input" name="InputYoutube" type="text" onChange={e=>setYoutube(e.target.value)}/>

            <input placeholder="TikTok" class="input" name="InputTiktok" type="text" onChange={e=>setTiktok(e.target.value)}/>

            <input placeholder="Linkedin" class="input" name="InputLinkedin" type="text" onChange={e=>setLinkedin(e.target.value)}/>
            <div style={{display:'flex', flexDirection:'row', width:'35%', justifyContent:'space-between'}}>
            <button className="continue-application" onClick={alterarMembros}>
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
            Alterar
          </button>
          <button className="continue-application" onClick={excluirMembro} style={{backgroundColor:'#B91F1F'}}>
            <div>
              <div className="pencil" ></div>
              <div className="folder" >
                <div className="top" >
                  <svg viewBox="0 0 24 27" >
                    <path  d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div className="paper" ></div>
              </div>
            </div>
            Excluir
          </button>
            </div>
            
        </div>
      </div>
      <ToastContainer />
        </div>
    );
}