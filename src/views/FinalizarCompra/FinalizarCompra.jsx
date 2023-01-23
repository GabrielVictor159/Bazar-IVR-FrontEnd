import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import Keys from '../../../Keys';
import NavbarBazar from '../../components/navbarBazar';
import "./FinalizarCompra.scss"
import bag from "../../assets/shoppingcart.png"
import { useParams } from 'react-router-dom';
import Foooter from '../../components/Foooter';
import AnimationIntersection from '../../components/AnimationIntersection';
import { ToastContainer, toast } from 'react-toastify';
export default function FinalizarCompra() {
    const animationIntersection = new AnimationIntersection();
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    const [atualizar, setAtualizar] = useState(0)
    const [cep, setCEP] = useState('');
    const [cepError, setCEPError] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [produto, setProduto] = useState(false)
    let { id } = useParams();
    
    useLayoutEffect(()=>{
      if(id!==undefined){
        fetch(`${Keys.backEnd}Produtos/${id}`)
        .then((response)=>response.json())
        .then((data)=>setProduto([
            {
                idProduto:data.idProduto,
                Nome:data.Nome,
                Descricao:data.Descricao,
                Quantidade: 1,
                Valor:data.Valor,
                LinkImage:data.LinkImage
            }
        ]
        ))
      }
    },[])
    function realizarPagamento() {
        console.log(produto)
        let a = JSON.parse(localStorage.getItem('usuario'))
        if (a === null) {
            a = JSON.parse(sessionStorage.getItem('usuario'))
            if (a == null) {
                window.location = "/Login"
            }
        }
        let b = [];
        if(produto===false){
        b = JSON.parse(localStorage.getItem('Cesta'))
        if (b === null) {
            b = JSON.parse(sessionStorage.getItem('Cesta'))
            if (b == null) {
                window.location = "/"
            }
        }
    }
             else{
         b =produto
             }

        if (rua === '') {
            toast("Por favor insira um endereço valido")
            return false
        }
        const Endereco = {
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado
        }
        try {
            axios.post(`${Keys.backEnd}RealizarPagamento`, {
                Produtos: b,
                Usuario: a,
                Endereco: Endereco
            })
                .then((response) => {
               
                    const paymentUrl = response.data;
                    window.location.href = paymentUrl;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        catch {

        }
    }
    useLayoutEffect(() => {
        document.body.style.background = '#D6E8EF'
    }, [])
    useEffect(()=>{
        console.log(id)
        if(produto!==false || id===undefined){
           const a =[
            {
                name:"FinalizarCompra_Nav",
                animationName:"topSurge",
            },
            {
                name:"FinalizarCompra_containerEndereco",
                animationName:"leftSurge"
            },
            {
                name:"FinalizarCompra_ContainerItens",
                animationName:"rightSurge"
            },
            {
                name:"FinalizarCompra_itensTituloContainer",
                animationName:"topSurge"
            },
            {
                name:"FinalizarCompra_Footer",
                animationName:"bottomSurge"
            },
            {
                name:"FinalizarCompra_button",
                animationName:"bottomSurge",
                animationPropertie:"1s ease-in-out 0s 1 normal forwards"
            },
           ] 
           if(produto!==false){
           produto.map((value, index)=>{
            a.push(
                {
                    name:`FinalizarCompra_CestaItem_${index}`,
                    animationName:"leftSurge"
                }
            )
           })
        }
        else{
            let z
            if (localStorage.getItem('Cesta') !== null) {
                z = JSON.parse(localStorage.getItem('Cesta'))
            }
            z.map((value, index)=>{
                a.push(
                    {
                        name:`FinalizarCompra_CestaItem_${index}`,
                        animationName:"leftSurge"
                    }
                )
               })
        }
           animationIntersection.oberseve(a)
        }
        return ()=>animationIntersection.oberseve([],true)
    },[produto])
    useEffect(() => {
        if (cep.length !== 8) {
            setCEPError('O CEP deve conter 8 dígitos');
            setRua('');
            setBairro('');
            setCidade('');
            setEstado('');
            setEstadoInput('');
            return;
        }

        // Realize a requisição HTTP para a API de consulta de CEP aqui
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((dados) => {
           
                setCEPError('')
                setRua(dados.logradouro);
                setBairro(dados.bairro);
                setCidade(dados.localidade);
                setEstado(dados.uf);
                setEstadoInput(dados.uf);
            })
            .catch((err) => {
                setCEPError('CEP inválido');
            });
    }, [cep]);

    const onChange = (event) => {
        if (event.target.name === 'cep') {
            setCEP(event.target.value);
        } else if (event.target.name === 'numero') {
            setNumero(event.target.value);
        }
    };
    function alterarQuantidade(index, operador){
        let a = JSON.parse(localStorage.getItem('Cesta'))
        if(operador =="-" && a[index].Quantidade<=1){
            a.splice(index, 1);
            localStorage.setItem('Cesta',JSON.stringify(a))
            setAtualizar(atualizar+1)
            if(a.length===0){
                localStorage.removeItem('Cesta')
            }
        }
        else{
        if(operador =="+"){
            a[index].Quantidade += 1
            localStorage.setItem('Cesta',JSON.stringify(a))
            setAtualizar(atualizar+1)
        }
        if(operador =="-"){
            a[index].Quantidade -= 1
            localStorage.setItem('Cesta',JSON.stringify(a))
            setAtualizar(atualizar+1)
        }
    }
    }
    function mapItens() {
        let a = produto;
        if(produto===false){
        if (localStorage.getItem('Cesta') !== null) {
            a = JSON.parse(localStorage.getItem('Cesta'))
        }
            }
        if(a!==false){
            return a.map((value, index) => {
                return (
    
                 
                        <div id={`FinalizarCompra_CestaItem_${index}`} key={index} className='CestaItem'>
                            <div className="CestaItemImageContainer">
                                <img className="CestaItemImage" src={value.LinkImage} />
                            </div>
                            <div className="CestaItemDescricaoContainer">
                            <h6>{`Nome do Produto: ${value.Nome}`}</h6>
                                
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <h6>{`Quantidade: `}</h6>
                                    {produto===false?
                                    <div style={{ width: 40, height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
                                        <h6 onClick={e => alterarQuantidade(index, "-")} style={{ fontSize: 70, position: 'relative', top: -5, left: 0 , cursor:'pointer'}} className={'NegativeSymbol'}>{'-'}</h6>
                                    </div>
                                    :<></>}
                                    <h6 >{` ${value.Quantidade}`}</h6>
                                    {produto===false?
                                    <div style={{ width: 40, height: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
                                        <h6 onClick={e => alterarQuantidade(index, "+")} style={{ fontSize: 45, position: 'relative', top: 0, left: 10 , cursor:'pointer'}} className={'PositiveSymbol'}>{'+'}</h6>
                                    </div>
                                    :<></>
                                    }
                                </div>
                                
                                <h6>{`Valor Total: R$ ${value.Valor * value.Quantidade}`}</h6>
                                <div style={{width:'70%',height:'80%', position:'relative', left:20}}>
                                <h6>Descrição:</h6>
                                <p>{`${value.Descricao}`}</p>
                            </div>
                            </div>
                            <br />     
                        </div>
                       
                
                )
                
            })
        }
        
       
    }
    return (
        <>
            <NavbarBazar id={"FinalizarCompra_Nav"} width={windowSize.current[0]} height={windowSize.current[1]} />
            <div className='FinalizarCompra_bodyItens'>
                <br /><br /><br />
                <div id='FinalizarCompra_containerEndereco' className='FinalizarCompra_containerEndereco'>
                    <form className='FinalizarCompra_formEndereco' >
                        <label htmlFor="cep">CEP:</label>
                        <input className='FinalizarCompra_input'
                            id="cep"
                            name="cep"
                            type="text"
                            value={cep}
                            onKeyPress={event => {
                                const charCode = event.charCode;
                                if (charCode < 48 || charCode > 57) {
                                    event.preventDefault();
                                }
                            }
                            }
                            onChange={onChange}
                        />
                        <br />
                        <div style={{ position: 'relative', left: 20 }}>
                            <label htmlFor="numero">Número:</label>
                            <input className='FinalizarCompra_input' id="numero" name="numero" type="number" min={0} value={numero} onChange={onChange} />
                        </div>

                        <br />
                    </form>
                    <div style={{ position: 'relative', left: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6><strong>Produto sera entregue em: </strong>  {rua} {numero} {bairro}  {cidade} {estado} </h6>
                    </div>
                </div>
                <br /><br />
                <div id='FinalizarCompra_ContainerItens' className='FinalizarCompra_ContainerItens'>
                    <div id='FinalizarCompra_itensTituloContainer' className='FinalizarCompra_itensTituloContainer'>
                    <img width={50} height={50} src={bag}/>
                    <h6 className='FinalizarCompra_itensTitulo'>Produtos</h6>
                    </div>
                <div className='FinalizarCompra_itensContainer'>
                {
                        mapItens()
                    }
                </div>
                <div className='FinalizarCompra_buttonContainer'>
                    <button id='FinalizarCompra_button' onClick={realizarPagamento} className='FinalizarCompra_button'>Finalizar Compra</button>
                </div>
                </div>
               
            </div>

            <br /><br /><br /> <br /><br /><br />
            <Foooter id={"FinalizarCompra_Footer"}/>
            <ToastContainer />
        </>
    );
}

