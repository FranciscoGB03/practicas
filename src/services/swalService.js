import Swal from 'sweetalert2';
import i18next from "i18next";

// |------Predefinidos------| //
export const cargando = () => {
    return staticPlain(i18next.t('general:cargando'), i18next.t('general:espereCargando'));
};

export const errorCargar = () => {
    return ocultableDanger(i18next.t('general:errorAlCargar'), i18next.t('general:error'));
};

export const errorGuardar = () => {
    return ocultableDanger(i18next.t('general:errorAlGuardar'), i18next.t('general:error'));
};

export const cargadoCorrecto = () => {
    return ocultableSuccess(i18next.t('general:cargadoCorrecto'), i18next.t('general:correcto'));
};

export const guardadoCorrecto = () => {
    return ocultableSuccess(i18next.t('general:guardadoCorrecto'), i18next.t('general:correcto'));
};

export const guardando = () => {
    return ocultableSuccess(i18next.t('general:guardardandoinfo'), i18next.t('general:guardardando'));
};

export const seguroContinuar = () => {
    return confirmar('warning', i18next.t('general:operacionNoRevertir'), i18next.t('general:estaSeguro'));
};

// |------Genericas------| //
export const cerrarAlert = () => {
    Swal.close();
};

// |------Ocultables-------| //
export const ocultableSuccess = (mensaje, titulo = i18next.t('general:exito'), segundos = 3000) => {
    return ocultable('success', mensaje, titulo, segundos);
};

export const ocultableDanger = (mensaje, titulo = i18next.t('general:error'), segundos = 3000) => {
    return ocultable('error', mensaje, titulo, segundos);
};

export const ocultableWarning = (mensaje, titulo = i18next.t('general:error'), segundos = 3000) => {
    return ocultable('warning', mensaje, titulo, segundos);
};

export const ocultableInfo = (mensaje, titulo = i18next.t('general:error'), segundos = 3000) => {
    return ocultable('info', mensaje, titulo, segundos);
};

const ocultable = (type, mensaje, titulo, segundos = 3000) => {
    const options = {
        title: titulo,
        icon: type,
        html: mensaje,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        timer: segundos
    };
    return Swal.fire(options);
};

// |------Estáticos-------| //
export const staticSuccess = (mensaje, titulo = i18next.t('general:exito')) => {
    return estatico('success', mensaje, titulo);
};

export const staticDanger = (mensaje, titulo = i18next.t('general:error')) => {
    return estatico('error', mensaje, titulo);
};

export const staticWarning = (mensaje, titulo = i18next.t('general:error')) => {
    return estatico('warning', mensaje, titulo);
};

export const staticInfo = (mensaje, titulo = i18next.t('general:error')) => {
    return estatico('info', mensaje, titulo);
};

const staticPlain = (mensaje, titulo = i18next.t('general:error')) => {
    const options = {
        title: titulo,
        icon: '',
        html: mensaje,
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        },
    };
    return Swal.fire(options);
};

export const estatico = (type, mensaje, titulo) => {
    const options = {
        title: titulo,
        icon: type,
        html: mensaje,
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    };
    return Swal.fire(options);
};

// |------Estáticos ocultables-------| //
export const staticOcultableSuccess = (mensaje, titulo = i18next.t('general:exito')) => {
    return estaticoOcultable('success', mensaje, titulo);
};

export const staticOcultableDanger = (mensaje, titulo = i18next.t('general:error')) => {
    return estaticoOcultable('error', mensaje, titulo);
};

export const staticOcultableWarning = (mensaje, titulo = i18next.t('general:error')) => {
    return estaticoOcultable('warning', mensaje, titulo);
};

export const staticOcultableInfo = (mensaje, titulo = i18next.t('general:error')) => {
    return estaticoOcultable('info', mensaje, titulo);
};

export const staticOcultablePlain = (mensaje, titulo = i18next.t('general:error')) => {
    const options = {
        title: titulo,
        icon: '',
        html: mensaje,
        showCloseButton: false,
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        },
    };
    return Swal.fire(options);
};

export const estaticoOcultable = (type, mensaje, titulo) => {
    const options = {
        title: titulo,
        icon: type,
        html: mensaje,
        showCloseButton: false,
        showConfirmButton: true,
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
    };
    return Swal.fire(options);
};

export const confirmar = (type, mensaje, titulo) => {
    const options = {
        title: titulo,
        icon: type,
        html: mensaje,
        showCloseButton: false,
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true
    };
    return Swal.fire(options);
};


export const progressStatic = (type, mensaje, titulo) => {
    const options = {
        title: titulo,
        icon: type,
        html: mensaje,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading()
        }
    }
    return Swal.fire(options);
}