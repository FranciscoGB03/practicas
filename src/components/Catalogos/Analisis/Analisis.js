import React, {useEffect, useState} from 'react'
import Template from '../../Template/Template';
import Titulo from '../../Template/Titulo';
import Listado from './Listado';
import Detalle from './Detalle';
import {getAllGenerico, getCatalogos} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from '../../../services/authService';
import i18next from "i18next";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import {AiOutlineFileSearch} from "react-icons/ai";

const Analisis = () => {
    //|----------------|hooks|-----------------|//
    let peticiones=[{ 'nombre': 'area_ca', relaciones: [],  metodo:'orderBy' }];
    const [registrosAll, setRegistrosAll] = useState([]);
    const [seleccionado, setSeleccionado] = useState(null);
    const [catalogo, setCatalogo] = useState(null);
    //|------UseEffects------|//
    useEffect(() => {
        getCatalogo();
        cargarRegistros();
    }, []);
    //|------Funciones------|//
    //|------GUI------|//
    //|------API------|//
    const onGuardar = () => {
        cargarRegistros();
        setSeleccionado(null);
    }
//|------Operaciones------|//
//|------DatosIniciales------|//
    const cargarRegistros = () => {
        getAllGenerico("analisis",['area_ca']).then(res => {
            cerrarAlert();
            setRegistrosAll(res);
        }).catch(noop());
    };
    const getCatalogo=()=>{
        getCatalogos(peticiones, false).then(res => {
            setCatalogo(res.area_ca.data);
            cerrarAlert();
        });
    }
//|------Render------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div className="container">
                        <Titulo titulo={i18next.t('catalogos:tituloAnalisis')} icono={AiOutlineFileSearch}/>
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap">
                        <div>
                            <Listado registrosAll={registrosAll} setSeleccionado={setSeleccionado}/>
                        </div>
                        <div>
                            {seleccionado && <Detalle seleccionado={seleccionado} onGuardar={onGuardar} catalogo={catalogo}/>}
                        </div>
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}
export default Analisis;