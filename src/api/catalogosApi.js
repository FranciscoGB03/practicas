import API from './axios';
import {cargando} from "../services/swalService";
import {returnGuardadoCorrecto, mostrarErrorCargar, mostrarErrorGuardar, returnCargadoCorrecto} from "./responses";

const ruta_base = "catalogos/";

export const getAllGenerico = (key, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getAllGenerico/${key}`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getActivosGenerico = (key, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getActivosGenerico/${key}`, {relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getCatalogos = (solicitados, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    if (mostrar_cargando)
        cargando();
    return API.post(`${ruta_base}getMultiAllGenerico`, { 'peticiones': solicitados })
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const getGenerico = (key,id, relaciones, mostrar_cargando = true, mostrar_cargado = false, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}getGenerico/${key}`, {id, relaciones})
        .then(res => mostrar_cargado ? returnCargadoCorrecto(res.data) : res.data)
        .catch((err) => mostrar_error && mostrarErrorCargar(err));
};
export const guardaGenerico = (key, info, relaciones, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}guardarGenerico/${key}`, info)
        .then(res => mostrar_cargado && returnGuardadoCorrecto(res.data))
        .catch((err) => mostrar_error && mostrarErrorGuardar(err));
};
export const eliminaGenerico = (key, registro_id, mostrar_cargando = true, mostrar_cargado = true, mostrar_error = true) => {
    cargando();
    return API.post(`${ruta_base}eliminarGenerico/${key}`, {registro_id})
        .then(res => mostrar_cargado ? returnGuardadoCorrecto(res.data) : res.data)
        .catch(err => mostrar_error ? mostrarErrorGuardar(err) : err);
};
