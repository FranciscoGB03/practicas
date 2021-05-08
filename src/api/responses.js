import {cargadoCorrecto, guardadoCorrecto, ocultableDanger} from "../services/swalService";
import i18next from "i18next";

export const mostrarErrorCargar = (error) => {
    let error_str = (((error || {}).response || {}).data || {}).mensaje || i18next.t('general:errorAlCargar');
    ocultableDanger(error_str, i18next.t('general:error'));
    throw (error);
};
export const mostrarErrorGuardar = (error) => {
    let error_str = (((error || {}).response || {}).data || {}).mensaje || i18next.t('general:errorAlGuardar');
    ocultableDanger(error_str, i18next.t('general:error'));
    throw (error);
};
export const returnGuardadoCorrecto = (data) => {
    guardadoCorrecto();
    return data;
};
export const returnCargadoCorrecto = (data) => {
    cargadoCorrecto();
    return data;
};
