import React from "react";
import "./AdminNav.css";
const AdminNav = (props) => {
  const setEstado = (id)=>{
    props.setEstado(id)
  }
  return (
    <div id={props.id} className="AdminNav">
      <nav>
        <a className="AdminNav_option1">
          <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={e=>setEstado(1)}>
          <h6 onClick={e=>setEstado(1)}>Produtos</h6>
          </div>
          
          <div className="AdminNav_dropOptions">
            <li onClick={e=>setEstado(2)}>Adicionar</li>
            <li onClick={e=>setEstado(3)}>Modificar</li>
          </div>
        </a>
        <a className="AdminNav_option1">
        <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={e=>setEstado(5)}>
          <h6 >Usuarios</h6>
          </div>
          
        </a>
        <a className="AdminNav_option1">
        <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={e=>setEstado(6)}>
          <h6>Compras</h6>
          </div>
        
        </a>
        <a className="AdminNav_option1">
        <div style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={e=>setEstado(8)}>
          <h6 >Imagens Instituto</h6>
          </div>
          <div className="AdminNav_dropOptions">
            <li onClick={e=>setEstado(9)}>Adicionar</li>
          </div>
        </a>
      </nav>
    </div>
  );
};

export default AdminNav;
