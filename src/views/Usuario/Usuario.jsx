import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getUser from "../../components/getUser";

export default function Usuario(props){
    const [usuario, setUsuario] = useState(getUser())
    return(
        <div>
            <p>{usuario.FirstName}</p>
        </div>
    );
}