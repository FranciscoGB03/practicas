import API from './axios';
import {guardadoCorrecto, cargando} from "../services/swalService";
import {mostrarErrorGuardar, returnCargadoCorrecto, returnGuardadoCorrecto,mostrarErrorCargar} from "./responses";

const ruta_base = "admin/";
export const guardarRolUsuarios = (rol) => {
    return API.post(`${ruta_base}guardarRolUsuarios`, {rol: rol})
        .then(res => {
            guardadoCorrecto();
            return res.data;
        })
        .catch(error => mostrarErrorCargar(error));
};

export const guardarRolPermisos = (rol) => {
    return API.post(`${ruta_base}guardarRolPermisos`, {rol: rol})
        .then(res => {
            guardadoCorrecto();
            return res.data;
        })
        .catch(error => mostrarErrorCargar(error));
};
export const guardarEspecificaciones = (eqEspecs) => {
    return API.post(`${ruta_base}guardarEspecsEquipos`, {equipo:eqEspecs})
        .then(res => {
            guardadoCorrecto();
            return res.data;
        })
        .catch(error => mostrarErrorCargar(error));
};