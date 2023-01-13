import React, { useState } from "react";
import AdminNav from "../../components/AdminNav";
import AdminLogin from "./AdminLogin";
import ProdutoAdicionar from "./Produtos/Adicionar/ProdutoAdicionar";
import ProdutosHome from "./Produtos/ProdutosHome";
import ProdutoModificar from "./Produtos/Modificar/ProdutoModificar";
export default function Admin(props){
    const [admin, setAdmin] = useState(false)
    const [estado, setEstado] = useState(0);
    const [selectedProduct, setSelectedProduto] = useState(false);
    const mapEstado = ()=>{
     switch(estado){
            case 1:
                return <ProdutosHome setSelectedProduto={setSelectedProduto}/>
            case 2:
                return <ProdutoAdicionar admin={admin}/>
            case 3:
                return <ProdutoModificar selectedProduct={selectedProduct} setSelectedProduto={setSelectedProduto}/>
        }
    }
    return(
        <>
        
        {admin===false ?
        <AdminLogin setAdmin={setAdmin}/>
        :<><AdminNav setEstado={setEstado}/>
        {
          mapEstado()
        }
        
        </>
        
        }
        </>
    );
}