import {useStore} from "../index";

export const setLS = (key, value) => {
    localStorage.setItem(`ngStorage-${key}`, JSON.stringify(value));
};

export  const getLS = (key) => {
    return JSON.parse(localStorage.getItem(`ngStorage-${key}`));
};

export const limpiarLs = (key) => {
    const {limpiarPermisos}=useStore.getState();
    limpiarPermisos();
    localStorage.removeItem(`ngStorage-${key}`);
};