import React from "react";
import "./ProdutoModificar.scss";
const name = "ProdutoAdicionar"
export default function ProdutoAdicionar(props){
   

    return(
        <div className={`${name}_body`}>
            {
                props.selectedProduct===false
                ?selectProduct()
                :<></>
            }
        </div>
    );
}

function selectProduct(){
    return(
        <div className={`${name}_select_box`}>
            <div className={`${name}_select_container`}>
            <h4>Busque um produto</h4>
            <select>
                <option>id</option>
                <option>Nome</option>
            </select>
            <input type={'text'} />
            <button >Buscar</button>
            </div>
        </div>
    );
}