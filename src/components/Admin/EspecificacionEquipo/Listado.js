import i18next from "i18next";
import React, {useEffect, useState} from "react";
import {ordenarArrPorKey} from "../../../services/sortService";
import filtrarArreglo from "../../../services/filterService";
import BotonBuscar from "../../Template/BotonBuscar";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";

const Listado = ({registrosAll,setSeleccionado,seleccionado}) => {
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
        <div className=" d-flex flex-wrap">
            <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
                <div className=" card-header d-flex justify-content-between text-center py-2">
                    <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                        <i className="py-2 px-2">{i18next.t('catalogos:registrosExistentes')}</i>
                    </h5>
                    <div className='d-flex justify-content-end text-titulo-tabla mt-2'>
                        <BotonBuscar ver_buscadores={ver_buscadores} setVerBuscadores={setVerBuscadores}/>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div id="div_tabla" className="table-responsive">
                        <table className=" table table-condensed table-hover ">
                            <TheadTitulos sort={sort} setSort={setSort}/>
                            {ver_buscadores?<TheadBuscador filtro={filtro} setFiltro={setFiltro}/>:null}
                            <tbody className="text-subtitulos">
                            {(registros || []).map((reg, idx) =>
                                <tr key={idx} className={`cursor ${seleccionado.id===reg.id?'bg-primary text-white':''}`} onClick={()=>setSeleccionado(reg)}>
                                <td>{reg.tipo_equipo.nombre}</td>
                                <td>{reg.nombre}</td>
                                <td>{reg.uso === "M" ? i18next.t('catalogos:monitoreo') : i18next.t('catalogos:verificacion')}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
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
                onClick={() => handleSort('tipo_equipo.nombre')}>
                <IconosSort key_sort={'tipo_equipo.nombre'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:tipoEquipo')}
            </th>
            <th className='text-center cursor'
                onClick={() => handleSort('nombre')}>
                <IconosSort key_sort={'nombre'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:nombre')}
            </th>
            <th className='text-center cursor'
                onClick={() => handleSort('uso')}>
                <IconosSort key_sort={'uso'} key_actual={sort.key} order={sort.order}/>
                {i18next.t('catalogos:uso')}
            </th>
        </tr>
        </thead>
    );
}
const TheadBuscador = ({filtro, setFiltro}) => {
    return (
        <thead className=''>
        <tr>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.tipo_equipo?.nombre || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, tipo_equipo:{nombre: e.target.value}})}/>
            </th>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.nombre || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, nombre: e.target.value})}/>
            </th>
            <th className='py-1'>
                <input className='form-control form-control-sm' value={filtro.uso || ""}
                       placeholder={i18next.t('catalogos:buscar')}
                       onChange={(e) => setFiltro({...filtro, uso: e.target.value})}/>
            </th>
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