import React from 'react'
import i18next from "i18next";

const SelectIterativo=({classContainer='',classSelect='', catalogo,descripcion='nombre',ejecuta=()=>{},value})=>{
    return(
        <div className={`${classContainer!==''?classContainer:''}`} >
            <select className={`form-control form-control-sm text-center ${classSelect}`}
                onChange={ejecuta}>
                {value!==''?<option value={value}>{getNombre(catalogo, value)}</option>:
                    <option value="-1">{i18next.t("general:seleccione")}</option>}
                {(catalogo || []).map((item,idx)=>
                    value!==item.id&&<option key={idx} value={item.id}>{getValor(item,descripcion)}</option>
                )}
            </select>

        </div>
    )
}
const getValor = (obj, buscado) => {
    let propiedades = buscado.split(".");
    let valor = '';
    let obj_buscado = obj;
    if (typeof obj_buscado !== "undefined" && obj_buscado !== null) {
        propiedades.forEach((prop, index) => {
            if (typeof obj_buscado[prop] !== 'undefined' && obj_buscado[prop] !== null) {
                obj_buscado = obj_buscado[prop];
                if (index == propiedades.length - 1)
                    valor = obj_buscado;
            }
        });
    }
    return valor;
}
const getNombre=(catalogo,valor)=>{
    const resultado=catalogo.find(cat=>cat.id===valor);
    return resultado.nombre;
}
export default SelectIterativo;