import React, {useEffect} from 'react';
import {useState} from 'react';
import {GiSave} from 'react-icons/gi';
import Boton from "../../Template/Boton";
import {propiedadValida} from "../../../services/validatorService";
import i18next from "i18next";
import {can} from '../../../services/seguridadService';
import EsNuevoEdit from "../../Template/EsNuevoEdit";
import {guardaGenerico} from "../../../api/catalogosApi";
import {cerrarAlert} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import Campo from "../../Template/Campo";
import Select from "../../Template/Select";
import TextAreaAutosize from "react-textarea-autosize";

const Detalle = ({seleccionado, onGuardar, catalogo}) => {
    //|------Hooks/Constantes------|//
    const [registro, setRegistro] = useState(seleccionado);
    const [errores, setErrores] = useState([]);

    //|------UseEffects------|//
    useEffect(() => {
        let errores_l = [];
        if (!registro.nombre)
            errores_l.push(`${i18next.t('catalogos:elCampo')}${i18next.t('catalogos:nombre')}${i18next.t('catalogos:esRequerido')}`);
        setErrores(errores_l);
    }, [registro]);
    useEffect(() => setRegistro(seleccionado), [seleccionado]);

    //|------API-------|//
    const guardarRegistro = () => {
        guardaGenerico('configuracion', registro)
            .then(res => {
                cerrarAlert();
                onGuardar(registro);
            })
            .catch(noop());
    }

    //|------Data-------|//
    const guardarDatos = e => {
        guardarRegistro();
    };

    return (
        <div className="card border-tabla z-depth-2">
            <div className="card-header d-flex justify-content-between py-0">
                <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                    <i className="py-2 px-2">{i18next.t('catalogos:detalleInfo')}</i>
                </h5>
                <div className="d-flex justify-content-center text-titulo-tabla mt-2">
                    <EsNuevoEdit es_nuevo={registro.id == null}/>
                </div>
            </div>
            <div className="m-2">
                <Campo etiqueta={`${i18next.t('catalogos:nombre')}: `}
                       data="nombre"
                       containerClass="d-flex justify-content-start"
                       inputClass={`form-control form-control-sm ml-1 ${!registro.nombre ? 'is-invalid' : ''}`}
                       value={registro.nombre || ''}
                       autoFocus={true}
                       maxLength={50}
                       onChange={e => setRegistro({...registro, nombre: e.target.value})}/>
                <div className="d-flex mb-2 mt-1">
                    <span className="py-0 pr-3 text-nowrap">{i18next.t('catalogos:tipoConfiguracion')}:</span>
                    <Select onSelect={e => setRegistro({...registro, tipo_configuracion: e})}
                            selected={registro.tipo_configuracion}
                            options={catalogo}
                            labelKey="nombre"/>
                </div>
                <div className="d-flex mb-2">
                    <span className="py-0 pr-3">{i18next.t('catalogos:descripcion')}:&nbsp;</span>
                    <TextAreaAutosize className={`form-control ${!registro.descripcion?'is-invalid':''}`}
                                      maxLength={250}
                                      value={registro.descripcion || ''}
                                      onChange={e => setRegistro({...registro,descripcion:e.target.value})}
                                      style={{overflowY: 'hidden'}}/>
                </div>
                <div className="mt-3">
                    <Boton
                        key_texto={i18next.t("general:guardar")}
                        className="btn-outline-blue w-100"
                        posicion={'right'}
                        habilitado={propiedadValida(registro, 'nombre') && can('catalogos.guardar_configuracion')}
                        ejecuta={guardarDatos}>
                        <GiSave/>
                    </Boton>
                </div>
            </div>
        </div>
    );
};

export default Detalle;