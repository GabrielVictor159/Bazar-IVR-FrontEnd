import React, { useEffect, useLayoutEffect, useState } from "react";
import Keys from "../../../../Keys";
import "./ImagesInstituto.scss";
const name = "ImagesInstituto";
export default function ImagesInstituto(props) {
    const [images, setImages] = useState(false);
    useLayoutEffect(() => {
        requestImages()

    }, [])
    const requestImages = () => {
        fetch(`${Keys.backEnd}AllImagesInstituto/`)
            .then((response) => response.json())
            .then((data) => setImages(data))
    }
    const deleteImage = (name) => {
        fetch(`${Keys.backEnd}ImagesInstituto/${props.admin.nome}/${props.admin.senha}/${name}`,{
            method:'DELETE'
        })
        .then((response)=> requestImages())
           
    }
    const mapImages = () => {
        if (images !== false) {
            return images.map((value, index) => {
                return (
                    <img onClick={e=>deleteImage(value.NomeImage)} src={value.LinkImage} />

                );
            })
        }
    }
    return (
        <div className={`${name}_body`}>

            <div className={`${name}_container`}>

                {mapImages()}
        <input />

            </div>
        </div>
    );
}