import React, {useEffect, useState} from 'react'
import Template from '../../Template/Template';
import Titulo from '../../Template/Titulo';
import {getActivosGenerico, getAllGenerico, guardaGenerico} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from '../../../services/authService';
import i18next from "i18next";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import {RiHomeGearLine} from "react-icons/ri";
import {BiSave} from 'react-icons/bi';
import Campo from "../../Template/Campo";
import produce from "immer";
import Boton from "../../Template/Boton";
import {can} from "../../../services/seguridadService";


const Configuracion = () => {
    //|----------------|hooks|-----------------|//
    const [registros, setRegistros] = useState([]);
    //|------UseEffects------|//
    useEffect(() => {
        cargarRegistros();
    }, []);
    //|------DatosIniciales------|//
    const cargarRegistros = () => {
        getActivosGenerico("configuracion", ['tipo_configuracion']).then(res => {
            cerrarAlert();
            setRegistros(res);
        }).catch(noop());
    };
    //------Data------|//
    const onGuardar = (idx) => {
        guardaGenerico('configuracion', registros[idx])
            .then(res => {
                cerrarAlert();
            })
            .catch(noop());
    }
    //|------Render------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div className="container">
                        <Titulo titulo={i18next.t('admin:configuracion')} icono={RiHomeGearLine}/>
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap">
                        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
                            <div className=" card-header d-flex justify-content-center text-center py-2">
                                <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                                    <i className="py-2 px-2">{i18next.t('catalogos:registrosExistentes')}</i>
                                </h5>
                            </div>
                            <div className="card-body p-0">
                                <div id="div_tabla" className="table-responsive">
                                    <table className=" table table-condensed table-hover ">
                                        <Thead/>
                                        <tbody className="text-subtitulos">
                                        {(registros || []).map((reg, idx) => <tr key={idx}>
                                            <td>{reg.tipo_configuracion.nombre}</td>
                                            <td>{reg.nombre}</td>
                                            <td>{reg.descripcion}</td>
                                            <td>
                                                <Campo
                                                    mostrarEtiqueta={false}
                                                    containerClass="my-1"
                                                    inputClass="form-control form-control-sm"
                                                    value={reg.valor}
                                                    maxLength={200}
                                                    onChange={e => setRegistros(produce(registros, d => {
                                                        d[idx].valor = e.target.value;
                                                    }))}/>
                                            </td>
                                            <td>
                                                {can('admin.guardar_configuracion')&&
                                                <Boton ejecuta={() => onGuardar(idx)}
                                                       habilitado={can('admin.guardar_configuracion')}
                                                       className="btn btn-outline-success my-1 p-1">
                                                    <BiSave/>
                                                </Boton>}
                                            </td>
                                        </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}
const Thead = () => {
    return (
        <thead>
        <tr>
            <th>{i18next.t('catalogos:tipoConfiguracion')}</th>
            <th>{i18next.t('catalogos:nombre')}</th>
            <th>{i18next.t('catalogos:descripcion')}</th>
            <th>{i18next.t('catalogos:valor')}</th>
            <th></th>
        </tr>
        </thead>
    );
}
export default Configuracion;