import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Keys from '../../../Keys';

export default function FinalizarCompra() {
    const [cep, setCEP] = useState('');
    const [cepError, setCEPError] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [estadoInput, setEstadoInput] = useState('');

    function realizarPagamento() {
        console.log('teste')
        let a = JSON.parse(localStorage.getItem('usuario'))
        if (a === null) {
            a = JSON.parse(sessionStorage.getItem('usuario'))
            if(a==null){
                window.location="/Login"
            }
        }
        let b = JSON.parse(localStorage.getItem('Cesta'))
        if (b === null) {
            b = JSON.parse(sessionStorage.getItem('Cesta'))
            if(b==null){
                window.location="/"
            }
        }
       
        if (rua === '') {
            console.log('Parou em rua')
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
            axios.post(`${Keys.backEnd}/RealizarPagamento`, {
                Produtos: b,
                Usuario: a,
                Endereco: Endereco
            })
                .then((response) => {
                    console.log(response)
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
                console.log(dados)
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

    return (
        <>
            <form style={{display:'flex', flexDirection:'row'}}>
                <label htmlFor="cep">CEP:</label>
                <input
                    id="cep"
                    name="cep"
                    type="text"
                    value={cep}
                    onChange={onChange}
                />
                <br />
                <label htmlFor="numero">Número:</label>
                <input id="numero" name="numero" type="number" min={0} value={numero} onChange={onChange} />
                <br />
            </form>
            <div style={{display:'flex', flexDirection:'row', width:1000, justifyContent:'space-between'}}>
            <h6><strong>produto sera entregue em: </strong></h6><p><strong>Rua:</strong> {rua}</p><p><strong>Bairro:</strong> {bairro}</p><p><strong>Numero:</strong> {numero}</p><p><strong>Cidade:</strong> {cidade}</p><p><strong>Estado:</strong> {estado }</p>
            </div>
            <button onClick={realizarPagamento}>Realizar pagamento</button>
        </>
    );
}

