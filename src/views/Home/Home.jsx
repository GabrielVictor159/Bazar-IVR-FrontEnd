import React, { useState } from 'react';
import { useRef } from 'react';
import "./Home.css"
import NavbarBazar from '../../components/navbarBazar';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../assets/slide-01.png'
import slide2 from '../../assets/slide-02.png'
import slide3 from '../../assets/slide-03.png'
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Home(props) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  useState
  return (
    <>
      <NavbarBazar active={'Home'} width={windowSize.current[0]} height={windowSize.current[1]}/>
      <div style={{ top: windowSize.current[1] * 0.22, width: '100%' }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide1}
              alt="First slide"
            />

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide2}
              alt="Second slide"
            />


          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={slide3}
              alt="Third slide"
            />


          </Carousel.Item>
        </Carousel>
      </div>
      <br />
      <div className='TituloProdutos' >
        <div>
          <h1>Produtos</h1>
        </div>
      </div>
      <div className='containerProdutos'>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
        <div className='produtoItem'>

        </div>
      </div>




    </>


  );
}