import API from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responses";

const ruta_base = "trabajadores/";

export const getTrabajadoresActivos = (relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getActivos`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getConRelsPorPeriodo = (periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getConRelsPorPeriodo`, {periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getTrabajadoresPorJefePeriodo = (jefe_id, periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getTrabadoresPorJefePeriodo`, {jefe_id, periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardaTrabajadoresDeJefe = (jefe_id, periodo_id, trabajadores, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}guardarTrabajadoresDeJefe`, {jefe_id, periodo_id, trabajadores})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const getJefesPorPeriodo=(periodo_id, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true)=>{
    cargando();
    return API.post(`${ruta_base}getJefesPorPeriodo`, {periodo_id})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
}
