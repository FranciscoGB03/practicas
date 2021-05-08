import React, {useEffect, useState} from 'react'
import Template from '../../Template/Template';
import {getActivosGenerico, guardaGenerico} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from '../../../services/authService';
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import Listado from "./Listado";
import Titulo from "../../Template/Titulo";
import i18next from "i18next";
import {MdDeviceHub} from "react-icons/md";
import Analisis from "./Analisis";

const EspecificacionEquipo = () => {
    //|----------------|hooks|-----------------|//
    const [registros, setRegistros] = useState([]);
    const [seleccionado,setSeleccionado]=useState({});
    const [analisis,setAnalisis]=useState([]);
    const [parametros,setParametros]=useState([]);
    //|------UseEffects------|//
    useEffect(() => {
        catalogos();
        cargarRegistros();
    }, []);
    //|------DatosIniciales------|//
    const cargarRegistros = () => {
        getActivosGenerico("equipo", ['tipo_equipo','rels_equipo_analisis.eq_especs.parametro','rels_equipo_analisis.analisis']).then(res => {
            cerrarAlert();
            setRegistros(res);
        }).catch(noop());
    };
    const catalogos=()=>{
        getActivosGenerico("analisis",["area_ca"]).then(res=>{
            cerrarAlert();
            setAnalisis(res);
        }).catch(noop());
        getActivosGenerico("parametro",["tipo_parametro"]).then(res=>{
            cerrarAlert();
            setParametros(res);
        }).catch(noop());;
    }
    //|------Render------|//
    return (
        <Template>
            {isLogged() ?
                <div className="container-fluid">
                    <div className="">
                        <Titulo titulo={i18next.t('admin:especificacionEquipo')} icono={MdDeviceHub}/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div><Listado registrosAll={registros} setSeleccionado={setSeleccionado} seleccionado={seleccionado}/></div>
                    {seleccionado.id?<Analisis equipo={seleccionado} analisis={analisis} parametros={parametros} cargarRegistros={cargarRegistros}/>:null}
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}

export default EspecificacionEquipo;