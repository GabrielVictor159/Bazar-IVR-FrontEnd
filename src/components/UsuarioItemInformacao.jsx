import React, { useState } from "react";
import Gear from "../assets/gear.png"
import Verified from "../assets/verified.png"
export default function UsuarioItemInformacao(props) {
    const [status, setStatus] = useState(false);
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    return (
        <div id={props.id} className="UsuarioItemInformacao">
            <div style={{width:'90%', display: 'flex',left:'3%', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                <h6 className="UsuarioTextInformacoes1">{props.text}</h6>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', left: 10 }}>
                    {status === false ?
                        <h6 className="UsuarioTextInformacoes2">{props.textUsuario}</h6>
                        :
                        props.numberInput === 2
                            ?
                            <>
                                <input type={props.inputType1} placeholder={props.placeholder1} onChange={e => setInput1(e.target.value)} />
                                <input type={props.inputType2} placeholder={props.placeholder2} onChange={e => setInput2(e.target.value)} />
                            </>
                            : props.numberInput === 3
                                ?
                                <>
                                    <input type={props.inputType1} placeholder={props.placeholder1} onChange={e => setInput1(e.target.value)} />
                                    <input type={props.inputType2} placeholder={props.placeholder2} onChange={e => setInput2(e.target.value)} />
                                    <input type={props.inputType3} placeholder={props.placeholder3} onChange={e => setInput3(e.target.value)} />
                                </>
                                :
                                <input type={props.inputType1} placeholder={props.placeholder1} onChange={e => setInput1(e.target.value)} />
                    }
                    {
                        status === false ?
                            <img style={{ position: 'relative', top: -2, left: 10, width: 25, height: 25, objectFit: 'cover', cursor: 'pointer' }} onClick={e => setStatus(!status)} src={Gear} />
                            : <img style={{ position: 'relative', top: -2, left: 10, width: 25, height: 25, objectFit: 'cover', cursor: 'pointer' }} onClick={e => { props.numberInput === 3 ? props.funcao(input1, input2, input3) : props.numberInput === 2 ? props.funcao(input1, input2) : props.funcao(input1), setStatus(!status) }} src={Verified} />
                    }
                </div>
            </div>
        </div>
    );
}