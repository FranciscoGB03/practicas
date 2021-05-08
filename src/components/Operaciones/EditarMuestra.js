import React, {useEffect, useState} from 'react';
import i18next from "i18next";
import Select from "../Template/Select";
import produce from "immer";
import Boton from "../Template/Boton";
import {FaSave} from "react-icons/all";
import Campo from "../Template/Campo";
import {FaRegCheckSquare, FaRegSquare} from "react-icons/fa";

const EditarMuestra = ({tipos_pm, tipos_muestra, seleccionado, setSeleccionado, areas, analisis}) => {
    const [analisisAll, setAnalisisAll] = useState(analisis);
    //|------useEffect------|//
    useEffect(() => {
        (seleccionado.pms_visible?.length!==0)?matchAnalisis():setAnalisisAll(analisis);
    }, [seleccionado]);
    useEffect(()=>matchGuardado(),[analisisAll]);
    //|------operaciones------|//
    const matchAnalisis = () => {
            (analisisAll || []).map((ana, idx) => {
                (seleccionado.pms_visible || []).map((pm_visible, idx) => {
                    if (pm_visible?.analisis?.id === ana.id) {
                        setAnalisisAll(produce(analisisAll, d => {
                            d[idx].seleccionado = true;
                        }))
                    }
                })
            })
    }
    const matchGuardado = () => {
        let arr = [];
        (analisisAll || []).map((ana, idx) => {
            if (ana.seleccionado)
                arr.push(ana);
        })
        setSeleccionado(produce(seleccionado, d => {
            d.pms_visible = arr;
        }));
    }
    //|------API------|//
    const guardarPm = () => {
        console.log(seleccionado)
    }
    return (
        <div className="card mt-2 ">
            <div className="card-header info-color-dark text-white my-0 px-5 p-0 d-flex justify-content-between">
                <span className="ml-2"><strong>{i18next.t('operaciones:editarMuestra')}</strong></span>
                <div>
                    <Boton className="btn btn-success p-1" ejecuta={() => guardarPm()}
                           key_texto={i18next.t('general:guardar')} habilitado={true}><FaSave/></Boton>
                </div>
            </div>
            <div className="card-body">
                <hr className="m-1 p-0"/>
                <div>
                    <span className="mr-2">{i18next.t('operaciones:puntoMuestreo')}:</span>
                    <div className="btn-group">
                        {
                            (tipos_pm || []).map((tipo_pm, idx) =>
                                <button type="button"
                                        className={`btn ${seleccionado.tipo_pm?.id === tipo_pm.id ? 'btn-success' : 'info-color-dark'} text-white`}
                                        key={idx}
                                        onClick={() => setSeleccionado(produce(seleccionado, d => {
                                            d.tipo_pm = tipo_pm;
                                        }))}>
                                    {tipo_pm.nombre}
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className="d-flex justify-content-start mt-2">
                    <span className="text-nowrap mr-2">{i18next.t('operaciones:tipoMuestra')}:</span>
                    {seleccionado.tipo_pm?.nombre === 'otro' ?
                        <Campo mostrarEtiqueta={false}
                               value={seleccionado.nombre}
                               containerClass="w-100"
                               inputClass="form-control form-control-sm"
                               onChange={e => setSeleccionado(produce(seleccionado, d => {
                                   d.nombre = e.target.value;
                               }))}/>
                        :
                        <Select options={tipos_muestra}
                                selected={seleccionado.tipo_muestra || {}}
                                onSelect={e => setSeleccionado(produce(seleccionado, d => {
                                    d.tipo_muestra = e;
                                }))}
                        />}
                </div>
                <div className="mt-3">
                    <div>
                        <h5>{i18next.t('operaciones:tipoAnalisis')}</h5>
                        {(analisisAll || []).map((ana, idx) =>
                            <CheckBox key={idx} seleccionado={ana.seleccionado}
                                      texto={ana.nombre}
                                      colorCheck="blue"
                                      accion={() => setAnalisisAll(produce(analisisAll, d => {
                                          d[idx].seleccionado = !d[idx].seleccionado;
                                      }))}/>
                        )}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}
const CheckBox = ({seleccionado, accion = () => {}, texto = '', colorCheck='green' }) => {
    return (
        <div onClick={() => accion()} className="d-flex justify-content-start">
            {seleccionado ? <FaRegCheckSquare color={colorCheck} size={30}/> : <FaRegSquare size={30}/>}
            <span className="ml-2">{texto}</span>
        </div>
    );
}
export default EditarMuestra;