import React, { useState } from "react";
import AdminNav from "../../components/AdminNav";
import AdminLogin from "./AdminLogin";
import ProdutoAdicionar from "./Produtos/Adicionar/ProdutoAdicionar";
import ProdutosHome from "./Produtos/ProdutosHome";
import ProdutoModificar from "./Produtos/Modificar/ProdutoModificar";
import UsuariosHome from "./Usuarios/UsuariosHome";
import AdminCompras from "./Compras/AdminCompras";
import AdminCompra from "./Compras/AdminCompra";
import ImagesInstituto from "./ImagesInstituto/ImagesInstituto";
import ImagesInstitutoAdicionar from "./ImagesInstituto/Adicionar/ImagesInstitutoAdicionar";
import AdicionarMembro from "./Membros/Adicionar/AdicionarMembro";
export default function Admin(props){
    const [admin, setAdmin] = useState(false)
    const [estado, setEstado] = useState(1);
    const [selectedProduct, setSelectedProduto] = useState(false);
    const [selectedCompra, setSelectedCompra] = useState(false);
    const mapEstado = ()=>{
     switch(estado){
            case 1:
                return <ProdutosHome admin={admin} setEstado={setEstado} setSelectedProduto={setSelectedProduto}/>
            case 2:
                return <ProdutoAdicionar setEstado={setEstado} admin={admin}/>
            case 3:
                return <ProdutoModificar admin={admin} selectedProduct={selectedProduct} setSelectedProduto={setSelectedProduto}/>
            case 5:
                return <UsuariosHome admin={admin} setEstado={setEstado}/>
            case 6:
                return <AdminCompras setEstado={setEstado} setSelectedCompra={setSelectedCompra} admin={admin}/>
            case 7:
                return <AdminCompra id={selectedCompra}/>
            case 8:
                return <ImagesInstituto admin={admin}/>
            case 9:
                return <ImagesInstitutoAdicionar admin={admin}/>
            case 11: 
                return <AdicionarMembro setEstado={setEstado} admin={admin}/>

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