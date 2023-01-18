
import React, { useEffect, useState } from "react";
import "./Cesta.css"
import bag from "../assets/basket.png"
export default function Cesta(props) {

    const [ValorTotal, setValorTotal] = useState(0);
    useEffect(()=>{
       
        setValorTotal(valorTotal())
    })
    function realizarPagamento() {
        window.location="/FinalizarCompra"
      }
    function alterarQuantidade(index, operador){
        let a = JSON.parse(localStorage.getItem('Cesta'))
        if(operador =="-" && a[index].Quantidade<=1){
            a.splice(index, 1);
            localStorage.setItem('Cesta',JSON.stringify(a))
            props.setAtualizar(props.atualizar+1)
            if(a.length===0){
                localStorage.removeItem('Cesta')
            }
        }
        else{
        if(operador =="+"){
            a[index].Quantidade += 1
            localStorage.setItem('Cesta',JSON.stringify(a))
            props.setAtualizar(props.atualizar+1)
        }
        if(operador =="-"){
            a[index].Quantidade -= 1
            localStorage.setItem('Cesta',JSON.stringify(a))
            props.setAtualizar(props.atualizar+1)
        }
    }
    }
    function valorTotal(){
        if(localStorage.getItem('Cesta')===null){
            return 0
        }
        else{
            try{
        let a = JSON.parse(localStorage.getItem('Cesta'))
        let total =0;
        for(let i =0; i<a.length; i++){
          total += a[i].Valor * a[i].Quantidade
        }
        return total
    }
    catch(exception){
        console.log(exception.message)
        return 0
    }
        }
    }
    function mapItens() {
        if (localStorage.getItem('Cesta') !== null) {
            let a = JSON.parse(localStorage.getItem('Cesta'))
            return a.map((value, index) => {
                return (
                        <div key={`CestaItem${index}`} className='CestaItem'>
                            <div className="CestaItemImageContainer">
                                <img className="CestaItemImage" src={value.LinkImage} />
                            </div>
                            <div style={{width:'70%',height:90, display:'flex', flexDirection:'column',alignItems:'flex-start', justifyContent:'space-around'}}>
                            <h6>{`Nome Produto: ${value.Nome}`}</h6>
                            <div style={{display:'flex', flexDirection:'row', alignItems:'center', height:'20%'}}>
                            <h6>{'Quantidade: '}</h6>
                            <h6 onClick={e=>alterarQuantidade(index, '-')} style={{fontSize:50,color:'rgb(39, 166, 189)', cursor:'pointer'}}>{`-`}</h6>
                            <h6>{value.Quantidade}</h6>
                            <h6 onClick={e=>alterarQuantidade(index, '+')} style={{fontSize:30,color:'rgb(39, 166, 189)', cursor:'pointer'}}>{`+`}</h6>
                            </div>
                     
                            <h6>{`Valor: ${value.Valor}`}</h6>
                            </div>
                            <br />
                        </div>
                    
                )
            })
        }
        else {
            return <></>
        }
    }
    return (
        <div className='CestaContainer' id='CestaContainer' style={{ left: props.width - 410 }}>
            <div className='Cesta' id='Cesta'>
                <br />
                <div className="CestaImageContainer">
                    <img src={bag} />
                </div>
                <br />
                <div className="CestaItensContainer">
                    {
                        mapItens()
                    }
                </div>
                <div className="CestaItensContainerButton">
                    <h6>{`Valor Total: R$ ${ValorTotal}`}</h6>
                    <button className="CestaItensButton"  onClick={realizarPagamento}>Finalizar</button>
                </div>
            </div>
        </div>
    );
}