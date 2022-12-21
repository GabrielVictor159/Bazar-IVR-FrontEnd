import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import "./Home.css"
import NavbarBazar from '../../components/navbarBazar';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../assets/slide-01.png'
import slide2 from '../../assets/slide-02.png'
import slide3 from '../../assets/slide-03.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import Produtos from '../../components/Produtos';
export default function Home(props) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let [listProdutos, setListProdutos] = useState();
  let [produtos, setProdutos] = useState();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  
  useEffect(() => {
    fetch(`http://localhost:3030/Produtos/FindAllLazyLoading/${index}/${size}`)
    .then((response) => response.json())
    .then((data) => setProdutos(data))
  },[])


  function nextPage (){
    const pageN = page +1
    const newIndex = index+ size
    setPage(pageN)
    setIndex(newIndex)
    fetch(`http://localhost:3030/Produtos/FindAllLazyLoading/${newIndex}/${size}`)
    .then((response) => response.json())
    .then((data) => setProdutos(data))
  }
  function backPage (){
    const pageN = page -1
    const newBackIndex = index -size
    setPage(pageN)
    setIndex(newBackIndex)
    fetch(`http://localhost:3030/Produtos/FindAllLazyLoading/${newBackIndex}/${size}`)
    .then((response) => response.json())
    .then((data) => setProdutos(data))
  }
  function setProduct(callback){
    window.location=`/Produto/${callback}`
  }
  const mapProdutos = (callback)=>{
 
    try {
    return callback.map((value, index) => {
        return (
          <div key={index} className='produtoItem' onClick={()=>setProduct(value.idProduto)}>
            <Produtos image={value.LinkImage} titulo={value.Nome} valor={value.Valor} />
          </div>
        )
      })

    }
    catch {

    }
  }

  return (
    <>
      <NavbarBazar active={'Home'} width={windowSize.current[0]} height={windowSize.current[1]} />
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
        {
           mapProdutos(produtos)

        }

      </div>
      <div className='containerNavegation'>
        <div className='containerNavegationOptions'>
          { page >1?
        <div className='NavegationContainer' onClick={backPage}>
          <h5>
            Anterior
          </h5>
        </div>
        :<></>
}
        <h5>{page}</h5>
        <div className='NavegationContainer' onClick={nextPage}>
          <h5>
            Proximo
          </h5>
        </div>
        </div>
      </div>

        <footer>

        </footer>


    </>


  );
}