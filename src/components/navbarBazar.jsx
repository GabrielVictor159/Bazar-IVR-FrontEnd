import React, { useEffect, useState } from 'react';

import "./navbarBazar.css"
import user from '../assets/user.png';
import padlock from '../assets/padlock.png'
import smartphone from '../assets/smartphone.png'
import bag from '../assets/bag.png'
import basket from '../assets/basket.png'
import getUser from './getUser';
const NavbarBazar = (props) =>{
  const usuario = getUser()
  
  useEffect(()=>{
    console.log(usuario)
  },[])
 function getLengthCesta(){
  try{
    let z = JSON.parse(localStorage.getItem('Cesta'))
    return z.length
  }
  catch{
    return 0
  }
 }
  return (
    <>
    <div className='NavContainer'>
      <nav style={{ width: '100%', height: props.height*0.05, backgroundColor: '#575757', position: 'relative', top: 0, left: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', overflow: 'visible' }}>
        <a style={{
          flexDirection: 'row', display: 'flex', alignItems: 'center', left: -30,
          position: 'relative', textDecoration:'none'
        }}
        href={usuario===null?'/Login':`/Usuario`}
        >
          <img
            src={user}
            alt=''
            width={20}
            height={20}
          />

          <h1 >
            {usuario===null?'Login':usuario.FirstName}
          </h1>
        </a>
        {
          usuario===null
          ?
        <a style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' , textDecoration:'none'}} href={'/Registrar'}>
          <img
            src={padlock}
            alt=''
            width={20}
            height={20}
          />

          <h1>
            Registrar
          </h1>
          </a>
          :<></>
        }
        <div style={{ width: 50 }} />
      </nav>
      <nav className='nav2'>
        <div style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          <img 
          src={smartphone}
          width={50}
          height={50}
          />
          <h1>{'(61) 9 9211-6541'}</h1>
        </div>
        {
         props.width>1000?
        <div style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          <img 
          src={bag}
          width={100}
          height={100}
          />
          <div style={{textAlign:'center'}}>
            <h2>
              Bazar
            </h2>
            <h1 style={{ position:'relative'}}>
              IVR
            </h1>
          </div>
        </div>
        :<></>
        }
        <a onClick={props.handleCesta} style={{zIndex:2}}>
          <div style={{width:20, height:20,position:'absolute', zIndex:1,transform:"translate(20px,-10px)", backgroundColor:'white', borderRadius:100, display:'flex',textAlign:'center', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <h6>{getLengthCesta()}</h6>
          </div>
          <img style={{cursor:'pointer'}}
          src={basket}
          width={45}
          height={45}
          />
        </a>
    </nav>
    <nav className='nav3'>
        <div className='nav3Div' style={{flexDirection:'row', display:'flex'}}>
        <a className={props.active==='Home'?'active':'inactive'} style={{textAlign:'center'}} href={'/'}>
          <h3>
          Inicio
          </h3>
        </a>
        <p></p>
        <a className={props.active==='Sobre'?'active':'inactive'} style={{textAlign:'center'}} href={'/Sobre'}>
          <h3 >
          Sobre Nós
          </h3>
        </a >
        <a className={props.active==='Quero'?'active':'inactive'} style={{textAlign:'center'}} href={'/Quero'}>
          <h3 >
          Quero Fazer Parte
          </h3>
        </a>
        <a className={props.active==='Ajuda'?'active':'inactive'} style={{textAlign:'center'}} href={'/Ajuda'}> 
          <h3 >
          Ajuda
          </h3>
        </a>
        </div>
    </nav>
    </div>
    
    </>


  );
}

export default NavbarBazar