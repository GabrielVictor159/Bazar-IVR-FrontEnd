import React from "react";
import "./AdminNav.css";
const AdminNav = (props) => {
  const setEstado = (id)=>{
    props.setEstado(id)
  }
  return (
    <div className="AdminNav">
      <nav>
        <a className="AdminNav_option1">
          <h6 onClick={e=>setEstado(1)}>Produtos</h6>
          <div className="AdminNav_dropOptions">
            <li onClick={e=>setEstado(2)}>Adicionar</li>
            <li onClick={e=>setEstado(3)}>Modificar</li>
          </div>
        </a>
        <a className="AdminNav_option1">
          <h6 onClick={e=>setEstado(5)}>Usuarios</h6>
          
        </a>
        <a className="AdminNav_option1">
          <h6 onClick={e=>setEstado(9)}>Compras</h6>
          <div className="AdminNav_dropOptions">
            <li onClick={e=>setEstado(10)}>Confirmar Entrega</li>
            <li onClick={e=>setEstado(12)}>Estornar pagamento</li>
          </div>
        </a>
      </nav>
    </div>
  );
};

export default AdminNav;
