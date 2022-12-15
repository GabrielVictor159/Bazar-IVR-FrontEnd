import React from 'react';

import "./navbarBazar.css"
import user from '../assets/user.png';
import padlock from '../assets/padlock.png'
import smartphone from '../assets/smartphone.png'
import bag from '../assets/bag.png'
import basket from '../assets/basket.png'
const NavbarBazar = (props) =>{
  return (
    <>
    
      <nav style={{ width: '100%', height: '5%', backgroundColor: '#575757', position: 'relative', top: 0, left: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', overflow: 'visible' }}>
        <a style={{
          flexDirection: 'row', display: 'flex', alignItems: 'center', left: -30,
          position: 'relative', textDecoration:'none'
        }}
          href={'/Login'}
        >
          <img
            src={user}
            alt=''
            width={20}
            height={20}
          />

          <h1 >
            Login
          </h1>
        </a>
        <a style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' , textDecoration:'none'}}>
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
        <a>
          <img 
          src={basket}
          width={50}
          height={50}
          />
        </a>
    </nav>
    <nav className='nav3'>
        <div style={{flexDirection:'row', display:'flex', fontSize:props.width>1000 ? 15 :10, height:props.height*0.08}}>
        <a className={props.active==='Home'?'active':'inactive'} style={{textAlign:'center'}} href={'/Home'}>
          <h3 style={{fontSize:'1.2rem'}}>
          Home
          </h3>
        </a>
        <p></p>
        <a className={props.active==='Sobre'?'active':'inactive'} style={{textAlign:'center'}} href={'/Sobre'}>
          <h3 style={{fontSize:'1.2rem'}}>
          Sobre Nós
          </h3>
        </a >
        <a className={props.active==='Quero'?'active':'inactive'} style={{textAlign:'center'}} href={'/Quero'}>
          <h3 style={{fontSize:'1.2rem'}}>
          Quero Fazer Parte
          </h3>
        </a>
        <a className={props.active==='Ajuda'?'active':'inactive'} style={{textAlign:'center'}} href={'/Ajuda'}> 
          <h3 style={{fontSize:'1.2rem'}}>
          Ajuda
          </h3>
        </a>
        </div>
    </nav>
    </>


  );
}

export default NavbarBazar