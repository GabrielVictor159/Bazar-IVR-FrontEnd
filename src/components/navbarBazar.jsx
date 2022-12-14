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
    
      <nav style={{ width: '100%', height: '5%', backgroundColor: '#575757', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', overflow: 'visible' }}>
        <a style={{
          flexDirection: 'row', display: 'flex', alignItems: 'center', left: -30,
          position: 'relative'
        }}
          href={'/Login'}
        >
          <img
            src={user}
            alt=''
            width={15}
            height={15}
          />

          <h1>
            Login
          </h1>
        </a>
        <a style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <img
            src={padlock}
            alt=''
            width={15}
            height={15}
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
            <h1 style={{top:-20, position:'relative'}}>
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
        <div style={{flexDirection:'row', display:'flex', fontSize:props.width>1000 ? 15 :10}}>
        <a className={props.active==='Home'?'active':'inactive'} href={'/Home'}>
          <h3>
          Home
          </h3>
        </a>
        <p></p>
        <a className={props.active==='Sobre'?'active':'inactive'} href={'/Sobre'}>
          <h3>
          Sobre Nós
          </h3>
        </a>
        <a className={props.active==='Quero'?'active':'inactive'} href={'/Quero'}>
          <h3>
          Quero Fazer Parte
          </h3>
        </a>
        <a className={props.active==='Ajuda'?'active':'inactive'} href={'/Ajuda'}> 
          <h3>
          Ajuda
          </h3>
        </a>
        </div>
    </nav>
    </>


  );
}

export default NavbarBazar