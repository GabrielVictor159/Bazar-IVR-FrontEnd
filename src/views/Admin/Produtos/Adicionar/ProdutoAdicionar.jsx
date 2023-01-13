import React, { useEffect, useLayoutEffect, useState } from "react";
import "./ProdutoAdicionar.scss";
import uploadImage from "../../../../assets/icons8-add-image-90.png";
import Keys from "../../../../../Keys";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
export default function ProdutoAdicionar(props) {
  const name = "ProdutoAdicionar";
  const [Nome, setNome] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Quantidade, setQuantidade] = useState(NaN);
  const [Valor, setValor] = useState(NaN);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imageName, setImageName] = useState("");
  useLayoutEffect(() => {
    console.log(props.admin);
  }, []);
  // create a preview as a side effect, whenever selected file is changed
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
  const submitAll = async () => {
    // Enviar a imagem primeiro
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
      console.error(error);
    }
    const otherData = {
      NomeAdmin: props.admin.nome,
      SenhaAdmin: props.admin.senha,
      NomeProduto: Nome,
      Valor: Valor,
      Descricao: Descricao,
      Quantidade: Quantidade,
      NomeImage: imageName,
    };
   fetch(`${Keys.backEnd}Produtos`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(otherData),
    })
      .then((response) => response.json())
      .then((data) => {
        toast(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
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

        <div className={`${name}_box_secundario`}>
          <div className={`${name}_box_informacoes`}>
            <input
              type={"text"}
              placeholder={"Nome"}
              pattern={"[A-Za-z]{7,}"}
              className={`${name}_input`}
              onChange={(e) => setNome(e.target.value)}
            />
            <textarea
              type={"text"}
              placeholder={"Descrição"}
              name={`${name}_input_Descricao`}
              className={`${name}_input_Descricao`}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type={"number"}
              placeholder={"Quantidade"}
              pattern={"[0-9]"}
              step="1"
              onChange={(e) => setQuantidade(parseInt(e.target.value))}
              className={`${name}_input`}
            />
            <input
              type={"number"}
              placeholder={"Valor"}
              step="0.01"
              onChange={(e) => setValor(parseFloat(e.target.value).toFixed(2))}
              className={`${name}_input`}
            />
          </div>
          <br />
          <br />
          <button class="continue-application" onClick={submitAll}>
            <div>
              <div class="pencil"></div>
              <div class="folder">
                <div class="top">
                  <svg viewBox="0 0 24 27">
                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                  </svg>
                </div>
                <div class="paper"></div>
              </div>
            </div>
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
