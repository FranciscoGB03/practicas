export const propiedadValida = (obj, key) => {
    let valido = true;
    let propiedades = key.split(".");
    let obj_buscado = obj;
    propiedades.forEach((prop, index) => {
        if (typeof obj_buscado[prop] !== 'undefined' && obj_buscado[prop] !== null) {
            obj_buscado = obj_buscado[prop];
            if (index === propiedades.length - 1) {
                if (typeof obj_buscado === 'undefined' || obj_buscado === null || obj_buscado.length === 0)
                    valido = false;
            }
        } else {
            valido = false;
        }
    });
    return valido;
};

export const propiedadesValidas = (obj, props) => {
    let validos = true;
    if (props.length > 0) {
        (props).map((item) => {
            if (!propiedadValida(obj, item))
                validos = false;
        });
    } else {
        validos = false;
    }
    return validos;
};

export const propiedadesObjsValidas = (objs, props) => {
    let validos = true;
    if (typeof objs !== "undefined" && objs.length > 0) {
        (objs).map((obj) => {
            if (!propiedadesValidas(obj, props))
                validos = false;
        });
    } else {
        validos = false;
    }
    return validos;
};