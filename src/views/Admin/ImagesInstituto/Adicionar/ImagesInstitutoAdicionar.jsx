import React, { useEffect, useLayoutEffect, useState } from "react";
import Keys from "../../../../../Keys";
import "./ImagesInstitutoAdicionar.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const name = "ImagesInstitutoAdicionar";
export default function ImagesInstitutoAdicionar(props) {
    const [imageName, setImageName] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    useLayoutEffect(() => {
        document.body.style.background = 'white'
    }, [])
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
    const submitAll = async()=>{
        if(selectedFile!==undefined){
           
            const formData = new FormData();
            formData.append("image", selectedFile);
            try {
              const response = await axios.post(
                `${Keys.backEnd}ImagesInstituto/${props.admin.nome}/${props.admin.senha}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              if(response.data==="sucesso"){
                toast("Imagem adicionada")
              }
              else{
                toast(response.data)
              }
            } catch (error) {
              console.error(error);
            }
            }
    }
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
   
    return (
        <>
            <div className={`${name}_body`}>
                <div className={`${name}_container`}>
                 
                        <div className={`${name}_ImageBox`} onClick={focusImageInput}>
                            <div className={`${name}_ImageBox_hover`} />
                            <form
                                method="POST"
                                action={`${Keys.backEnd}ImagesInstituto/${props.admin.nome}/${props.admin.senha}`}
                                encType="multipart/form-data"
                            >
                                <input style={{ display: 'none' }} type="file" id="ImageInput" onChange={onSelectFile} />
                            </form>
                            {selectedFile && (
                                <img className={`${name}_imagePreview`} src={preview} />
                            )}
                        </div>
               

                    <br />
                    <button className="continue-application" onClick={submitAll}>
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
        </>
    );
}