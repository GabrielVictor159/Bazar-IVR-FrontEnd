import React, { useState } from "react";
import AdminNav from "../../components/AdminNav";
import AdminLogin from "./AdminLogin";
import ProdutoAdicionar from "./Produtos/Adicionar/ProdutoAdicionar";
import ProdutosHome from "./Produtos/ProdutosHome";
import ProdutoModificar from "./Produtos/Modificar/ProdutoModificar";
import UsuariosHome from "./Usuarios/UsuariosHome";
import AdminCompras from "./Compras/AdminCompras";
export default function Admin(props){
    const [admin, setAdmin] = useState(false)
    const [estado, setEstado] = useState(1);
    const [selectedProduct, setSelectedProduto] = useState(false);
    const mapEstado = ()=>{
     switch(estado){
            case 1:
                return <ProdutosHome admin={admin} setEstado={setEstado} setSelectedProduto={setSelectedProduto}/>
            case 2:
                return <ProdutoAdicionar admin={admin}/>
            case 3:
                return <ProdutoModificar admin={admin} selectedProduct={selectedProduct} setSelectedProduto={setSelectedProduto}/>
            case 5:
                return <UsuariosHome admin={admin} setEstado={setEstado}/>
            case 6:
                return <AdminCompras admin={admin}/>

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