import React, {useEffect, useState} from 'react';
import useDebounce from "../../services/debounceService";
import filtrarArreglo from "../../services/filterService";
import CampoCorrecto from "./CampoCorrecto";

const TypeAhead = ({display, onSelect, opciones, propBuscada, alias, correcto, placeholder = ''}) => {

    //|------State-------|//
    const [buscador_previo, setBuscadorPrevio] = useState('');
    const buscador = useDebounce(buscador_previo, 0);
    const [filtrado, setFiltrado] = useState([]);
    const [cont, setCont] = useState(0);

//|------Actions------|//
    const handleChange = (value) => {
        onSelect({[propBuscada]: value});
        let keys = propBuscada.split(".");
        let obj = value;
        let aux = {};
        for (let i = keys.length - 1; i >= 0; i--) {
            aux[keys[i]] = obj;
            obj = Object.assign({}, aux);
            aux = {};
        }
        setBuscadorPrevio(Object.assign({}, buscador_previo, obj));
    };

    useEffect(() => {
        if (buscador) {
            let nuevo_array = opciones !== null ? filtrarArreglo(opciones, buscador) : [];
            setFiltrado(nuevo_array);
        }
    }, [buscador]);

    const selecciona = (e) => {
        onSelect(e);
        setFiltrado([])
    };

    const validaProp = () => {
        setTimeout(() => {
            setFiltrado([]);
            setCont(0);
        }, 1000)
    };

    const validaKeyboard = (e) => {
        if (e.keyCode === 40) {
            if (cont < filtrado.length - 1) {
                setCont(cont + 1);
            } else {
                setCont(filtrado.length - 1);
            }

        } else if (e.keyCode === 38) {
            if (cont !== 0) {
                setCont(cont - 1);
            }
        }

        if (e.key === 'Enter') {
            if(filtrado.length > 0){
                onSelect(filtrado[cont]);
                setFiltrado([]);
            }
        }


    };

    return (
        <div className="w-100 ">
            <div className="d-flex justify-content-between">
                <input type="text"
                       key={alias}
                       placeholder={placeholder}
                       onKeyDown={(e) => validaKeyboard(e)}
                       value={getValor(display, propBuscada)}
                       onBlur={() => validaProp()}
                       className="form-control-sm form-control"
                       onChange={(e) => handleChange(e.target.value)}/>
                <div>
                    <CampoCorrecto
                        coreccto={correcto}/>
                </div>
            </div>
            {filtrado.length > 0 &&
            <div className="position-absolute card-body border border-dark bg-white" style={{zIndex: 1}}>
                {
                    filtrado.map((cat, index) =>
                        <ItemList
                            key={`il-${alias}>-${index}`}
                            cat={cat}
                            cont={cont}
                            index={index}
                            propBuscada={propBuscada}
                            seleccionar={selecciona}/>
                    )
                }
            </div>
            }


        </div>
    );
};


const ItemList = ({cat, seleccionar, cont, index, propBuscada}) => {
    const seleccionarItem = () => {
        seleccionar(cat);
    };

    return (
        <div className={`${cont === index ? ' blue lighten-4' : ''}  cursor condensed `}
             onClick={() => seleccionarItem()}>
            {getValor(cat, propBuscada)}
        </div>
    );
};



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
export default TypeAhead;