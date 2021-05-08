import React, {useEffect, useState} from 'react'
import Template from '../../Template/Template';
import Titulo from '../../Template/Titulo';
import Listado from './Listado';
import Detalle from './Detalle';
import {getAllGenerico} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from '../../../services/authService';
import i18next from "i18next";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import {BsQuestionSquare} from 'react-icons/bs';

const Pregunta = () => {
    //|----------------|hooks|-----------------|//
    const [registrosAll, setRegistrosAll] = useState([]);
    const [seleccionado, setSeleccionado] = useState(null);
    //|------UseEffects------|//
    useEffect(() => cargarRegistros(), []);
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
        getAllGenerico("pregunta").then(res => {
            cerrarAlert();
            setRegistrosAll(res);
        }).catch(noop());
    };
//|------Render------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div className="container">
                        <Titulo titulo={i18next.t('catalogos:pregunta')} icono={BsQuestionSquare}/>
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap">
                        <div>
                            <Listado registrosAll={registrosAll} setSeleccionado={setSeleccionado}/>
                        </div>
                        <div>
                            {seleccionado && <Detalle seleccionado={seleccionado} onGuardar={onGuardar}/>}
                        </div>
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}
export default Pregunta;