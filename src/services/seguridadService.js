import API from '../api/axios';
import {getUId} from "../services/authService";
import {useStore} from "../index";

export const cargarPermisos = () => {
    const username_id = getUId();
    return API.post('getAllPermisos', {usernameId: username_id}).then((res) => {
        let data = (res.data||[]).map(permiso => `${permiso.seccion.nombre}.${permiso.nombre}`);
        return data;
    });
};

export const permisosCargados = (permisos) => {
    return permisos != null;
}

export const can = (permiso) => {
    const {permisos}=useStore.getState();
    return (permisos || []).indexOf(permiso) >= 0;
}