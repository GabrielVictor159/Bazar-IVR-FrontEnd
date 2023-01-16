import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Keys from "../../../../Keys";
import "./ProdutosHome.scss";
import searcha from "../../../assets/icons8-view-96.png";
import deletea from "../../../assets/icons8-delete-document-96.png";
import close from "../../../assets/icons8-close-96.png";
import done from "../../../assets/icons8-done-96.png";
import Overlay from "../../../components/Overlay";
export default function ProdutosHome(props) {
  const [products, setProducts] = useState([]);
  const [alterar, setAlterar] = useState(false);
  const [novoNome, setNovoNome] = useState(null);
  const [novaDescricao, setNovaDescricao] = useState(null);
  const [novaQuantidade, setNovaQuantidade] = useState(null);
  const [novoValor, setNovoValor] = useState(null);
  const [busca, setBusca] = useState(false);
  const [buscaNome, setBuscaNome] = useState("");
  const [buscaId, setBuscaId] = useState("");
  const [buscaQuantidade, setBuscaQuantidade] = useState("");
  const [buscaDescricao, setBuscaDescricao] = useState("");
  const [buscaImagem, setBuscaImagem] = useState("");
  const [buscaValor, setBuscaValor] = useState("");
  const [atualizar, setAtualizar] = useState(0);
  const [deletar, setDeletar] = useState(false);
  const [deletarId, setDeletarId] = useState("");  

  useEffect(() => {
    mapProduct();
  }, []);
  const mapProduct = () => {
    fetch(`${Keys.backEnd}Produtos/FindAll`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };
  const navImage = (link) => {
    window.location = link;
  };
  const selectProduct = (id) => {
    props.setSelectedProduto(id);
    props.setEstado(3);
  };
  const activeInputsBusca = (type) => {
    if (alterar !== false) {
      return false;
    }
    let a = document.getElementById(`ProdutosHome_${type}`);
    a.style.display = a.style.display === "block" ? "none" : "block";
    let b = document.getElementById(`ProdutosHome_${type}_input`);
    b.style.display = a.style.display === "block" ? "none" : "block";
    setBusca(true);
  };
  const disableAllInputsBusca = () => {
    if (alterar !== false) {
      return false;
    }
    let inputs = document.getElementsByClassName("ProdutoHome_busca_input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }
    let texto = document.getElementsByClassName("ProdutoHome_busca_text");
    for (let i = 0; i < texto.length; i++) {
      texto[i].style.display = "block";
    }
    setBusca(false);
    setBuscaDescricao("");
    setBuscaId("");
    setBuscaImagem("");
    setBuscaNome("");
    setBuscaQuantidade("");
    setBuscaValor("");
  };
  const disableAllInputsAlteracao = (index) => {
    setNovaDescricao(null);
    setNovoNome(null);
    setNovaQuantidade(null);
    setNovoValor(null);
    setAlterar(false);
    document.getElementById(`ProdutosHome_Nome_${index}`).style.display =
      "block";
    document.getElementById(`ProdutosHome_NomeInput_${index}`).style.display =
      "none";
    document.getElementById(`ProdutosHome_Descricao_${index}`).style.display =
      "block";
    document.getElementById(
      `ProdutosHome_DescricaoInput_${index}`
    ).style.display = "none";
    document.getElementById(`ProdutosHome_Quantidade_${index}`).style.display =
      "block";
    document.getElementById(
      `ProdutosHome_QuantidadeInput_${index}`
    ).style.display = "none";
    document.getElementById(`ProdutosHome_Valor_${index}`).style.display =
      "block";
    document.getElementById(`ProdutosHome_ValorInput_${index}`).style.display =
      "none";
  };
  const activeInputs = (type, index) => {
    document.getElementById(`ProdutosHome_${type}_${index}`).style.display =
      "none";
    document.getElementById(
      `ProdutosHome_${type}Input_${index}`
    ).style.display = "block";
    setAlterar(index);
  };
  const deletarProduct = async () => {
    await fetch(
      `${Keys.backEnd}images/${props.admin.nome}/${props.admin.senha}/${products[deletarId].NomeImage}`,
      {
        method: "DELETE",
      }
    );
    await fetch(
      `${Keys.backEnd}Produtos/${props.admin.nome}/${props.admin.senha}/${products[deletarId].Nome}`,
      {
        method: "DELETE",
      }
    );
    setDeletar(false);
    setDeletarId("")
    mapProduct();
  };
  const confirmarAlteracao = async (index) => {
    console.log(products[index]);
    const formData = {
      NomeAdmin: props.admin.nome,
      SenhaAdmin: props.admin.senha,
      id: products[index].idProduto,
      NomeProduto: novoNome === null ? products[index].Nome : novoNome,
      NomeImage: products[index].NomeImage,
      Valor:
        novoValor === null || isNaN(novoValor)
          ? products[index].Valor
          : novoValor,
      Descricao:
        novaDescricao === null ? products[index].Descricao : novaDescricao,
      Quantidade:
        novaQuantidade === null || isNaN(novaQuantidade)
          ? products[index].Quantidade
          : novaQuantidade,
    };
    console.log(formData);
    try {
      await fetch(`${Keys.backEnd}Produtos`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch {}
    disableAllInputsAlteracao(index);
    mapProduct();
  };
  const returnProducts = () => {
    try {
      return products
        .filter((value) => {
          if (buscaNome) {
            return value.Nome.toLowerCase().includes(buscaNome.toLowerCase());
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaId) {
            return value.idProduto.toString().includes(buscaId);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaQuantidade) {
            return value.Quantidade.toString().includes(buscaQuantidade);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaValor) {
            return value.Valor.toString().includes(buscaValor);
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaImagem) {
            return value.NomeImage.toLowerCase().includes(
              buscaImagem.toLowerCase()
            );
          } else {
            return value;
          }
        })
        .filter((value) => {
          if (buscaDescricao) {
            return value.Descricao.toLowerCase().includes(
              buscaDescricao.toLowerCase()
            );
          } else {
            return value;
          }
        })
        .map((value, index) => {
          return (
            <tr key={`produto/${index}`}>
              <td>
                <p id={`ProdutosHome_idProduto_${index}`}>{value.idProduto}</p>
              </td>
              <td>
                <p
                  onDoubleClick={(e) =>
                    alterar === false || alterar === index
                      ? activeInputs("Nome", index)
                      : ""
                  }
                  id={`ProdutosHome_Nome_${index}`}
                >
                  {value.Nome}
                </p>
                <input
                  id={`ProdutosHome_NomeInput_${index}`}
                  style={{ display: "none" }}
                  type={"text"}
                  placeholder={"Novo Nome"}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
              </td>
              <td>
                <p
                  onDoubleClick={(e) =>
                    alterar === false || alterar === index
                      ? activeInputs("Descricao", index)
                      : ""
                  }
                  id={`ProdutosHome_Descricao_${index}`}
                >
                  {value.Descricao}
                </p>
                <textarea
                  id={`ProdutosHome_DescricaoInput_${index}`}
                  style={{ display: "none" }}
                  type={"text"}
                  placeholder={"Nova Descrição"}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                />
              </td>
              <td>
                <p
                  onDoubleClick={(e) =>
                    alterar === false || alterar === index
                      ? activeInputs("Quantidade", index)
                      : ""
                  }
                  id={`ProdutosHome_Quantidade_${index}`}
                >
                  {value.Quantidade}
                </p>
                <input
                  id={`ProdutosHome_QuantidadeInput_${index}`}
                  style={{ display: "none" }}
                  type={"number"}
                  placeholder={"Nova Quantidade"}
                  onChange={(e) => setNovaQuantidade(parseInt(e.target.value))}
                />
              </td>
              <td>
                <p id={`ProdutosHome_NomeImage_${index}`}>{value.NomeImage}</p>
              </td>
              <td>
                <p
                  onDoubleClick={(e) =>
                    alterar === false || alterar === index
                      ? activeInputs("Valor", index)
                      : ""
                  }
                  id={`ProdutosHome_Valor_${index}`}
                >
                  {value.Valor}
                </p>
                <input
                  id={`ProdutosHome_ValorInput_${index}`}
                  style={{ display: "none" }}
                  type={"number"}
                  placeholder={"Novo Valor"}
                  onChange={(e) =>
                    setNovoValor(parseFloat(e.target.value).toFixed(2))
                  }
                />
              </td>

              <td>
                {alterar === index ? (
                  <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={done}
                    onClick={(e) => confirmarAlteracao(index)}
                  />
                ) : alterar === false ? (
                  <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    onClick={(e) => selectProduct(value.idProduto)}
                    src={searcha}
                  />
                ) : (
                  <></>
                )}
              </td>
              <td>
                {alterar === false ? (
                  <img
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    onDoubleClick={(e) => {setDeletar(true); setDeletarId(index)}}
                    src={deletea}
                  />
                ) : alterar === index ? (
                  <img
                    onClick={(e) => disableAllInputsAlteracao(index)}
                    style={{ cursor: "pointer" }}
                    width={25}
                    height={25}
                    src={close}
                  />
                ) : (
                  <></>
                )}
              </td>
            </tr>
          );
        });
    } catch {
      return <></>;
    }
  };

  const setHandler = ()=>{
    setDeletar(false)
    setDeletarId("")
  }
  return (
    <>
      <div className="ProdutosHome_body">
        <div className="ProdutosHome_produtos">
          <table>
            <thead>
              <tr style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaId")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaId"
                  >
                    {"#"}
                  </p>
                  <input
                    type={"number"}
                    placeholder="Id"
                    onChange={(e) => setBuscaId(e.target.value)}
                    style={{ display: "none" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaId_input"
                  />
                </td>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaNome")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaNome"
                  >
                    {"Nome"}
                  </p>
                  <input
                    type={"text"}
                    placeholder="Nome"
                    onChange={(e) => setBuscaNome(e.target.value)}
                    style={{ display: "none" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaNome_input"
                  />
                </td>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaDescricao")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaDescricao"
                  >
                    {"Descrição"}
                  </p>
                  <textarea
                    type={"text"}
                    placeholder="Descricao"
                    onChange={(e) => setBuscaDescricao(e.target.value)}
                    style={{ display: "none", resize: "both" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaDescricao_input"
                  />
                </td>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaQuantidade")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaQuantidade"
                  >
                    {"Quantidade"}
                  </p>
                  <input
                    type={"number"}
                    placeholder="Quantidade"
                    onChange={(e) => setBuscaQuantidade(e.target.value)}
                    style={{ display: "none" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaQuantidade_input"
                  />
                </td>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaImagem")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaImagem"
                  >
                    {"Imagem"}
                  </p>
                  <input
                    type={"text"}
                    placeholder="Nome Imagem"
                    onChange={(e) => setBuscaImagem(e.target.value)}
                    style={{ display: "none" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaImagem_input"
                  />
                </td>
                <td>
                  <p
                    style={{ display: "block" }}
                    onDoubleClick={(e) => activeInputsBusca("buscaValor")}
                    className="ProdutoHome_busca_text"
                    id="ProdutosHome_buscaValor"
                  >
                    {"Valor"}
                  </p>
                  <input
                    type={"number"}
                    placeholder="Valor"
                    onChange={(e) => setBuscaValor(e.target.value)}
                    style={{ display: "none" }}
                    className="ProdutoHome_busca_input"
                    id="ProdutosHome_buscaValor_input"
                  />
                </td>
                <td>
                  {busca ? (
                    <img
                      style={{ cursor: "pointer" }}
                      width={25}
                      height={25}
                      src={close}
                      onClick={disableAllInputsBusca}
                    />
                  ) : (
                    <></>
                  )}
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>{returnProducts()}</tbody>
          </table>
        </div>
      </div>
      <Overlay handler={deletar} setHandler={setHandler}>
        <div className="card">
          <div className="card__content">
            <div className="card__content-heading">
              <h2>Tem Certeza ?</h2>
              <br />
            </div>
            <div className="card__content-body">
              
              <p>
                {" "}
                O produto sera apagado para sempre
               
              </p>
            </div>
            <div className="card__content-footer">
              <button onClick={deletarProduct}> Sim</button>
              <button onClick={e=>{setDeletar(false); setDeletarId("")}}> Não</button>
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
}
