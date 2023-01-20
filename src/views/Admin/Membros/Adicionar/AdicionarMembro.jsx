import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Keys from "../../../../../Keys";
import "./AdicionarMembro.scss";
const name = "AdicionarMembro";
export default function AdicionarMembro(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [imageName, setImageName] = useState("");
    const [nome, setNome] = useState(undefined);
    const [titulo, setTitulo] = useState(undefined);
    const [descricao, setDescricao] = useState(undefined);
    const [facebook, setFacebook] = useState(undefined);
    const [instagram, setInstagram] = useState(undefined);
    const [twitter, setTwitter] = useState(undefined);
    const [tiktok, setTiktok] = useState(undefined);
    const [linkedin, setLinkedin] = useState(undefined);
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
    
      const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined);
          setImageName("");
          return;
        }
    
        setSelectedFile(e.target.files[0]);
        setImageName(e.target.files[0].name);
      };
      const focusImageInput = () => {
        document.getElementById("ImageInput").click();
        
      };
      const adicionarMembros = async()=>{
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
              toast(error);
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
              TikTok:tiktok,
              Linkedin:linkedin,
              NomeImage: imageName===""?undefined:imageName,
            };
           fetch(`${Keys.backEnd}Membros/${props.admin.nome}/${props.admin.senha}`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(otherData),
            })
              .then((response) => response.text())
              .then((data) => {
                toast(data);
                props.setEstado(1)
              })
              .catch((error) => {
                toast("Error:", error);
              });
            }
      }
  return (
    <div className={`${name}_body`}>
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

            <textarea style={{maxWidth:'100%', resize:'both'}} placeholder="Descrição" class="input" name="InputDescricao" type="text" onChange={e=>setDescricao(e.target.value)}/>

            <input placeholder="Facebook" class="input" name="InputFacebook" type="text" onChange={e=>setFacebook(e.target.value)}/>

            <input placeholder="Instagram" class="input" name="InputInstagram" type="text" onChange={e=>setInstagram(e.target.value)}/>

            <input placeholder="Twitter" class="input" name="InputTwitter" type="text" onChange={e=>setTwitter(e.target.value)}/>

            <input placeholder="TikTok" class="input" name="InputTiktok" type="text" onChange={e=>setTiktok(e.target.value)}/>

            <input placeholder="Linkedin" class="input" name="InputLinkedin" type="text" onChange={e=>setLinkedin(e.target.value)}/>

            <button className="continue-application" onClick={adicionarMembros}>
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
    </div>
  );
}
