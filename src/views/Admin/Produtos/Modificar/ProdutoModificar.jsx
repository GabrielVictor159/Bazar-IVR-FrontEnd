import React, { useEffect, useLayoutEffect, useState } from "react";
import Keys from "../../../../../Keys";
import ProdutoAdicionar from "../Adicionar/ProdutoAdicionar";
import "./ProdutoModificar.scss";
import { ToastContainer, toast } from "react-toastify";
const name = "ProdutoSelecionar";
export default function ProdutoSelecionar(props) {
  const [produto, setProduto] = useState("");
  const [type, setType] = useState("id");
  const [value, setValue] = useState("");
  useLayoutEffect(() => {
    document.body.style.background = 'white'
    return () => {
      props.setSelectedProduto(false);
    };
  }, []);
  useLayoutEffect(() => {
    if (props.selectedProduct != false) {
      fetch(`${Keys.backEnd}Produtos/${props.selectedProduct}`)
        .then((response) => response.json())
        .then((data) => setProduto(data));
    }
  }, []);
  const selecionar = () => {
    const findId = async () => {
      let resposta = await fetch(`${Keys.backEnd}Produtos/findByName/${value}`);
      let a;
      try {
        a = await resposta.json();
        return a.idProduto;
      } catch {
        return false;
      }
    };
    const map = async () => {
      let id = type === "id" ? parseInt(value) : await findId();
      if (id !== false) {
        let resposta = await fetch(`${Keys.backEnd}Produtos/${id}`);

        if ((await resposta.text()) !== "Não existe esse produto") {
          await fetch(`${Keys.backEnd}Produtos/${id}`)
            .then((a) => a.json())
            .then((data) => setProduto(data));
        } else {
          toast("esse produto não existe");
        }
      } else {
        toast("esse produto não existe");
      }
    };
    return (
      <div className={`${name}_select_box`}>
        <div className={`${name}_select_container`}>
          <h4>Busque um produto</h4>
          <select onChange={(e) => setType(e.target.value)}>
            <option>id</option>
            <option>Nome</option>
          </select>
          <div className="inputbox">
            <input required="required"
            onChange={(e) => setValue(e.target.value)}
            type={type === "id" ? "number" : "text"}
          />
            <span>{type==='id'?'Id do produto':'Nome do Produto'}</span>
            <i></i>
          </div>
          <a className="fancy" href="#" onClick={(e) => map()}>
            <span className="top-key"></span>
            <span className="text">Continuar</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>
      </div>
    );
  };
  return (
    <div className={`${name}_body`}>
      {props.selectedProduct === false && produto === ""
        ? selecionar()
        : productView(produto, props.admin)}
    </div>
  );
}
function productView(produto, admin) {
  return (
    <>
      <div className={`${name}_product_box`}>
        <img src={produto.LinkImage} className={`${name}_product_image`} />
        <div className={`${name}_product_boxInformacoes`}>
          <h6>#</h6>
          <p>{produto.idProduto}</p>
          <h6>Nome</h6>
          <p>{produto.Nome}</p>
          <h6>Descricao</h6>
          <p>{produto.Descricao}</p>
          <h6>Quantidade</h6>
          <p>{produto.Quantidade}</p>
          <h6>Valor</h6>
          <p>{produto.Valor}</p>
        </div>
      </div>
      <ProdutoAdicionar produto={produto} modificar={"true"} admin={admin} />
      <ToastContainer />
    </>
  );
}
