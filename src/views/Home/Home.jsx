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
import getUser from '../../components/getUser';
import Cesta from '../../components/Cesta';
import Keys from '../../../Keys';
export default function Home(props) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let [listProdutos, setListProdutos] = useState();
  let [produtos, setProdutos] = useState();
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);
  const [CestaVisible, setCestaVisible] = useState(true);
  const [atualizar, setAtualizar] = useState(0);
  useEffect(() => {
    fetch(`${Keys.backEnd}/Produtos/FindAllLazyLoading/${index}/${size}`,{
      method:'GET',
      mode:'cors'
    })
    .then((response) => response.json())
    .then((data) => setProdutos(data))
    .then((data) => console.log(data))
  
  },[])


  function nextPage (){
    const pageN = page +1
    const newIndex = index+ size
    setPage(pageN)
    setIndex(newIndex)
    fetch(`${Keys.backEnd}/Produtos/FindAllLazyLoading/${newIndex}/${size}`,{
      method:'GET',
      mode:'cors'
    })
    .then((response) => response.json())
    .then((data) => setProdutos(data))
    .then((data) => console.log(data))
  }
  function backPage (){
    const pageN = page -1
    const newBackIndex = index -size
    setPage(pageN)
    setIndex(newBackIndex)
    fetch(`${Keys.backEnd}/Produtos/FindAllLazyLoading/${newBackIndex}/${size}`,{
      method:'GET',
      mode:'cors'
    })
    .then((response) => response.json())
    .then((data) => setProdutos(data))
    .then((data) => console.log(data))
  }
  function setProduct(callback){
    window.location=`/Produto/${callback}`
  }
  function handleCesta (){
  
    if(CestaVisible){
      document.getElementById('Cesta').classList.toggle('CestaHidden');
      document.getElementById('CestaContainer').classList.toggle('CestaContainerHidden');
    }
    else{
      document.getElementById('Cesta').classList.remove('CestaHidden');
     document.getElementById('CestaContainer').classList.remove('CestaContainerHidden');
    }
    setCestaVisible(!CestaVisible)
    
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
      <NavbarBazar handleCesta={handleCesta} active={'Home'} width={windowSize.current[0]} height={windowSize.current[1]} />
      <div style={{ top: windowSize.current[1] * 0.22, width: '100%'}}>
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
      <br />
      <div className='TituloProdutos' >
        <div>
          <h1>Produtos</h1>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className='containerProdutos'>
        {
           mapProdutos(produtos)

        }

      </div>
      <br />
      <br />
      <br />
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
      <br />
      <br />
      <br />
        <footer>

        </footer>

      <Cesta atualizar={atualizar} setAtualizar={setAtualizar} width={windowSize.current[0]} CestaVisible={CestaVisible}/>
    </>


  );
}