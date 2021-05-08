import React, {useEffect, useState} from 'react';
import i18next from "i18next";
import Boton from "../../Template/Boton";
import {FaSave} from "react-icons/all";
import Select from "../../Template/Select";
import produce from "immer";
import Campo from "../../Template/Campo";
import {FaPlusCircle, FaTrash} from "react-icons/fa";
import {guardarEspecificaciones} from "../../../api/adminApi";
import {cerrarAlert, ocultableInfo} from "../../../services/swalService";
import {noop} from "../../../services/generalService";
import TooltipHover from "../../Template/TooltipHover";
import {can} from '../../../services/seguridadService';

const Analisis = ({equipo, analisis, parametros, cargarRegistros}) => {
    //|------hooks------|//
    const [eqEspecs, setEqEspecs] = useState([]);
    const [invalido, setInvalido] = useState(false);
    //|------useEffect------|//
    useEffect(() => {
        setEqEspecs(equipo);
    }, [equipo]);
    //|------Operaciones------|//
    const agregarAnalisis = () => {
        setEqEspecs(produce(eqEspecs, d => {
            d.rels_equipo_analisis.push({analisis: {}, eq_especs: [], equipo_id: equipo.id})
        }))
    }
    const eliminarAnalisis = (idx) => {
        setEqEspecs(produce(eqEspecs, d => {
            d.rels_equipo_analisis.splice(idx, 1);
        }))
        setInvalido(false);
    }
    const agregarEspecificacion = (idx) => {
        setEqEspecs(produce(eqEspecs, d => {
            d.rels_equipo_analisis[idx].eq_especs.push({
                inicio_minimo: '',
                inicio_maximo: '',
                fin_minimo: '',
                fin_maximo: '',
                parametro: {}
            });
        }))
    }
    const eliminarEspecificacion = (idx, ind) => {
        setEqEspecs(produce(eqEspecs, d => {
            d.rels_equipo_analisis[idx].eq_especs.splice(ind, 1);
        }))
        setInvalido(false);
    }
    //|-------Api-------|//
    const guardar = () => {
        console.log(eqEspecs.rels_equipo_analisis);
        guardarEspecificaciones(eqEspecs).then(res => {
            cerrarAlert();
            cargarRegistros();
        }).catch(noop());
    }
    return (
        <div>
            <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
                <div className=" card-header d-flex justify-content-between text-center py-2">
                    <div>
                        <Boton key_texto={i18next.t('admin:agregarAnalisis')}
                               className="btn btn-outline-success"
                               habilitado={can('admin.agregar_analisis')}
                               ejecuta={() => agregarAnalisis()}>
                            <FaPlusCircle/>
                        </Boton>
                    </div>
                    <div>
                        <Boton key_texto={i18next.t('general:guardar')}
                               className="btn btn-outline-indigo"
                               habilitado={can('admin.guardar_especificacion')&&invalido===false}
                               ejecuta={() => guardar()}>
                            <FaSave/>
                        </Boton>
                    </div>
                </div>
                <div className="card-body">
                    {(eqEspecs.rels_equipo_analisis || []).map((eqAna, idx) =>
                        <div key={idx}>
                            <div className="d-flex justify-content-start mb-2">
                                <div className="d-flex justify-content-start">
                                    <span className="text-nowrap mr-2">{i18next.t('admin:tipoAnalisis')}:</span>
                                    <Select options={analisis}
                                            selected={eqAna.analisis}
                                            onSelect={e => setEqEspecs(produce(eqEspecs, d => {
                                                let resultado = null;
                                                if (e) {
                                                    resultado = d.rels_equipo_analisis.find(eq => eq.analisis.id === e.id);
                                                    if (resultado) {
                                                        d.rels_equipo_analisis[idx].analisis = {id: ''};
                                                        setInvalido(true);
                                                        ocultableInfo(i18next.t('general:registroDuplicado'));
                                                    } else {
                                                        d.rels_equipo_analisis[idx].analisis = e;
                                                        setInvalido(false);
                                                    }
                                                } else {
                                                    d.rels_equipo_analisis[idx].analisis = {id: ''};
                                                }
                                            }))}
                                            labelKey="nombre"
                                            className={`mr-2 ${eqAna.analisis.id === '' ? 'is-invalid' : ''}`}/>
                                </div>
                                <div>
                                    {can('admin.agregar_especificacion') ?
                                        <Boton key_texto={i18next.t('admin:agregarEspecificacion')}
                                               className="btn btn-outline-success text-nowrap py-1 px-1 mb-1 mr-1"
                                               habilitado={true}
                                               classNoHabilitado="w-70 p-0 m-0"
                                               ejecuta={() => agregarEspecificacion(idx)}>
                                            <FaPlusCircle/>
                                        </Boton> : null}
                                    {can('admin.eliminar_analisis') ?
                                        <Boton key_texto={i18next.t('admin:eliminarAnalisis')}
                                               className="btn btn-outline-danger text-nowrap py-1 px-1 mb-1"
                                               classNoHabilitado="w-50 p-0 m-0"
                                               habilitado={true}
                                               ejecuta={() => eliminarAnalisis(idx)}>
                                            <FaTrash/>
                                        </Boton> : null}
                                </div>
                            </div>
                            <div className="d-flex justify-content-start flex-wrap">
                                {(eqAna.eq_especs || []).map((esp, ind) =>
                                    <div key={ind} className="jumbotron mr-1 py-1 pt-1 px-2">
                                        {can('admin.eliminar_especificacion') ?
                                            <div className="d-flex justify-content-end mb-1">
                                                <TooltipHover posicion="bottom" texto={i18next.t('general:eliminar')}>
                                                    <button type="button" className="close" data-dismiss="alert"
                                                            aria-label="Close"
                                                            onClick={() => eliminarEspecificacion(idx, ind)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </TooltipHover>
                                            </div> : null}
                                        <div className="d-flex justify-content-start">
                                        <span className="text-nowrap mr-2">
                                            {i18next.t('admin:tipoParametro')}:
                                        </span>
                                            <Select options={parametros}
                                                    selected={esp.parametro || {id: ''}}
                                                    onSelect={e => setEqEspecs(produce(eqEspecs, d => {
                                                        let resultado = null;
                                                        if (e) {
                                                            resultado = d.rels_equipo_analisis[idx].eq_especs.find(eq => eq.parametro.id === e.id);
                                                            if (resultado) {
                                                                d.rels_equipo_analisis[idx].eq_especs[ind].parametro = {id: ''};
                                                                setInvalido(true);
                                                                ocultableInfo(i18next.t('general:registroDuplicado'));
                                                            } else {
                                                                d.rels_equipo_analisis[idx].eq_especs[ind].parametro = e;
                                                                setInvalido(false);
                                                            }
                                                        } else {
                                                            d.rels_equipo_analisis[idx].eq_especs[ind].parametro = {id: ''};
                                                        }
                                                    }))}
                                                    labelKey="nombre"
                                                    className={`mr-2 ${esp.parametro.id === '' ? 'is-invalid' : ''}`}/>
                                        </div>
                                        <Campo etiqueta={`${i18next.t('admin:valorInicioMinimo')}:`}
                                               value={esp.inicio_minimo || ''}
                                               onChange={e => setEqEspecs(produce(eqEspecs, d => {
                                                   d.rels_equipo_analisis[idx].eq_especs[ind].inicio_minimo = e.target.value;
                                               }))}
                                               type="number"
                                               containerClass="d-flex justify-content-start mt-1"
                                               labelClass="text-nowrap mr-2"
                                               inputClass="form-control form-control-sm"/>
                                        <Campo etiqueta={`${i18next.t('admin:valorInicioMaximo')}:`}
                                               value={esp.inicio_maximo || ''}
                                               onChange={e => setEqEspecs(produce(eqEspecs, d => {
                                                   d.rels_equipo_analisis[idx].eq_especs[ind].inicio_maximo = e.target.value;
                                               }))}
                                               type="number"
                                               containerClass="d-flex justify-content-start mt-1"
                                               labelClass="text-nowrap mr-2"
                                               inputClass="form-control form-control-sm"/>
                                        <Campo etiqueta={`${i18next.t('admin:valorFinMinimo')}:`}
                                               value={esp.fin_minimo || ''}
                                               onChange={e => setEqEspecs(produce(eqEspecs, d => {
                                                   d.rels_equipo_analisis[idx].eq_especs[ind].fin_minimo = e.target.value;
                                               }))}
                                               type="number"
                                               containerClass="d-flex justify-content-start mt-1"
                                               labelClass="text-nowrap mr-2"
                                               inputClass="form-control form-control-sm"/>
                                        <Campo etiqueta={`${i18next.t('admin:valorFinMaximo')}:`}
                                               value={esp.fin_maximo || ''}
                                               onChange={e => setEqEspecs(produce(eqEspecs, d => {
                                                   d.rels_equipo_analisis[idx].eq_especs[ind].fin_maximo = e.target.value;
                                               }))}
                                               type="number"
                                               containerClass="d-flex justify-content-start mt-1"
                                               labelClass="text-nowrap mr-2"
                                               inputClass="form-control form-control-sm"/>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analisis;