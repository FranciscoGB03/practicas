import React, {useState, useEffect} from 'react';
import {ordenarArrPorKey} from '../../../services/sortService';
import i18next from "i18next";
import BotonBuscar from "../../Template/BotonBuscar";
import BotonCopiarPortapapeles from "../../Template/BotonCopiarPortapapeles";
import filtrarArreglo from "../../../services/filterService";
import BotonNuevoRegistro from "../../Template/BotonNuevoRegistro";
import BotonEditar from "../../Template/BotonEditar";
import {FaChevronUp, FaChevronDown} from 'react-icons/fa';

const Listado = ({registrosAll, setSeleccionado, onEliminar}) => {
    //|------Hooks/Constantes------|//
    const [filtro, setFiltro] = useState({});
    const [sort, setSort] = useState({key: 'id', order: 'asc'});
    const [registros, setRegistros] = useState(registrosAll);
    const [ver_buscadores, setVerBuscadores] = useState(false);
    //|------useEffect------|//
    useEffect(() => {
        filtrarRegistros();
    }, [registrosAll, filtro]);
    useEffect(() => {
        ordenarRegistros();
    }, [sort]);
    //|------GUI------|//
    const filtrarRegistros = () => setRegistros(ordenarArrPorKey(filtrarArreglo(registrosAll, filtro), sort.key, sort.order));
    const ordenarRegistros = () => setRegistros(ordenarArrPorKey(registros, sort.key, sort.order));
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <div className=" card-header d-flex justify-content-between text-center py-0">
                <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                    <i className="py-2 px-2">{i18next.t('catalogos:registrosExistentes')}</i>
                </h5>
                <div className='d-flex justify-content-end text-titulo-tabla mt-2'>
                    <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>
                    <BotonCopiarPortapapeles div_tabla="div_tabla"/>
                    <BotonNuevoRegistro onNuevoRegistro={() => setSeleccionado({})}/>
                </div>
            </div>
            <div className="card-body p-0">
                <div id="div_tabla">
                    <table className=" table table-condensed responsive hover ">
                        <TheadTitulos sort={sort} setSort={setSort}/>
                        {ver_buscadores && <TheadBuscador filtro={filtro} setFiltro={setFiltro}/>}
                        <tbody className="text-subtitulos">
                        {(registros || []).map((reg, idx) => <tr key={idx}>
                            <td>{reg.seccion.nombre}</td>
                            <td>{reg.nombre}</td>
                            <td>{reg.descripcion}</td>
                            <td className='d-flex justify-content-end flex-nowrap'>
                                <BotonEditar onClick={() => setSeleccionado(reg)}/>
                            </td>
                        </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
//|------Subcomponentes------|//
const TheadTitulos = ({sort, setSort}) => {
    const handleSort = key => {
        if (key === sort.key)
            setSort({...sort, order: sort.order === 'asc' ? 'desc' : 'asc'});
        else
            setSort({key, order: 'asc'});
    };
    return (
        <thead className=''>
        <tr>
            <th className='text-center cursor'
                onClick={() => handleSort('seccion.nombre')}>
                <IconosSort key_sort={'seccion.nombre'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:seccion')}
            </th>
            <th className='text-center cursor'
                onClick={() => handleSort('nombre')}>
                <IconosSort key_sort={'nombre'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:nombre')}
            </th>
            <th className='text-center cursor'
                onClick={() => handleSort('descripcion')}>
                <IconosSort key_sort={'descripcion'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:descripcion')}
            </th>
            <th></th>
        </tr>
        </thead>
    );
}
const TheadBuscador = ({filtro, setFiltro}) => {
    return (
        <thead className=''>
        <tr>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.seccion?.nombre || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, seccion:{nombre: e.target.value}})}/>
            </th>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.nombre || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, nombre: e.target.value})}/>
            </th>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.descripcion || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, descripcion: e.target.value})}/>
            </th>
            <th></th>
        </tr>
        </thead>);
}

const IconosSort = ({key_actual, key_sort, order}) => {
    return (<React.Fragment>
        {key_sort === key_actual && order === 'asc' && <FaChevronUp/>}
        {key_sort === key_actual && order === 'desc' && <FaChevronDown/>}
    </React.Fragment>);
}
export default Listado;