import React from 'react';
import { useEffect, useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { GiMagnifyingGlass } from 'react-icons/gi';
import Check from '../../Template/Check';
import Buscador from '../../Template/Buscador';
import { guardarRolPermisos } from '../../../api/adminApi';
import Boton from '../../Template/Boton';
import i18next from 'i18next';
import {can} from '../../../services/seguridadService'

const buscadores = [
    { alias: 'id', posicion: 'id', placeholder: 'Buscador', mostrar: 'hidden' },
    { alias: 'nombre', posicion: 'nombre', placeholder: 'Buscador' },
    { alias: 'descripcion', posicion: 'descripcion', placeholder: 'Buscador' }
];

const PermisosAsignados = ({ seccionesAsig, setSeccionesAsig, rolSelect }) => {
    let secciones = [...seccionesAsig];
    const guardarDatos = (secciones) => {
        //validacion de datos
        let rol = rolSelect;
        rol.rels_rol_permiso = [];
        (secciones || []).map((seccion) => {
            (seccion.permisos || []).map((permiso, idxpermiso) => {
                if (permiso.aplica)
                    rol.rels_rol_permiso.push({ permiso: permiso, permiso_id: permiso.id });
            });
        });
        guardarRolPermisos(rol).then(response => {
        });
    };

    //----------------useEffects-------------------//
    useEffect(() => {
        let seccionesLocal = [...seccionesAsig];
        (seccionesLocal || []).map((seccion) => {
            (seccion.permisos || []).map((permiso) => {
                permiso.aplica = false;
                rolSelect.rels_rol_permiso.map((rol) => {
                    if (rol.permiso_id === permiso.id) {
                        permiso.aplica = true;
                    }
                })
            });
            seccion.aplica = true;
            (seccion.permisos || []).map(permiso => seccion.aplica = seccion.aplica && permiso.aplica);
        });
        setSeccionesAsig(seccionesLocal);
    }, [rolSelect]);
    //--------------./useEffects-------------------//
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <Encabezado />
            <Contenido
                secciones={secciones}
                setSeccionesAsig={setSeccionesAsig}
                guardarDatos={guardarDatos}
                buscadores={buscadores}
            />
        </div>
    );
}

const Encabezado = () => {
    return (
        <div className="card-header d-flex justify-content-center text-center py-0">
            <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                <i className="py-2 px-2">{i18next.t('admin:permisosAsig')}</i>
            </h5>
        </div>
    );
};

const Contenido = ({ secciones, setSeccionesAsig, guardarDatos, buscadores }) => {
    return (
        <div className="card-body p-0">
            <div id="div_tabla">
                <div>
                    <div className="my-2 mx-3">
                        <Boton key_texto={i18next.t("general:guardar")}
                               className="btn-outline-success w-100"
                               habilitado={can('admin.guardar_permisos_asignados')}
                               ejecuta={() => guardarDatos(secciones)}>
                            <IoIosSave />
                        </Boton>
                    </div>
                    <div className="mx-3">
                        {(secciones || []).map((seccion, seccionIdx) =>
                            <Renglon key={seccionIdx}
                                     seccionIdx={seccionIdx}
                                     seccion={seccion}
                                     setSeccionesAsig={setSeccionesAsig}
                                     secciones={secciones}
                                     buscadores={buscadores} />
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}

const Renglon = ({ seccionIdx, seccion, setSeccionesAsig, secciones, buscadores }) => {
    //variables locales
    const [permisosFiltro, setPermisosFiltro] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const iguales = (valores) => valores.aplica === true;
    const actualizaPermiso = (seccionIdx, indicePermiso, permiso) => {
        secciones[seccionIdx].permisos.map((per) => {
            if (per.id === permiso.id) {
                per.aplica = !per.aplica;
            }
        });
        secciones[seccionIdx].permisos.every(iguales) ? secciones[seccionIdx].aplica = true : secciones[seccionIdx].aplica = false;
        if (permisosFiltro > 0) {
            permisosFiltro[indicePermiso].aplica = !permisosFiltro[indicePermiso].aplica;
            setPermisosFiltro(permisosFiltro);
        }
        setSeccionesAsig(secciones);
    }
    const actualizaSeccion = (seccionIdx) => {
        if (secciones[seccionIdx].aplica === true) {
            secciones[seccionIdx].aplica = false;
            secciones[seccionIdx].permisos.map((permiso) => {
                permiso.aplica = false;
            });
            setSeccionesAsig(secciones);
        } else {
            secciones[seccionIdx].aplica = true;
            secciones[seccionIdx].permisos.map((permiso) => {
                permiso.aplica = true;
            });
            setSeccionesAsig(secciones);
        }
    }
    return (
        <div className="responsive">
            <div className="d-flex justify-content-start">
                <div className="mr-2">
                    <Check key={seccion.id} ejecuta={() => {
                        actualizaSeccion(seccionIdx)
                    }}
                           seleccionado={seccion.aplica} />
                </div>
                <div className="mr-1">
                    {seccion.nombre}
                </div>
                <div className="cursor text-info txts_gray"
                     onClick={() => {
                         mostrar ? setMostrar(false) : setMostrar(true);
                     }}>
                    <GiMagnifyingGlass />
                </div>
            </div>
            <div className="responsive">
                <table className="table ml-3 table-condensed table-borderless">
                    {mostrar &&
                    <thead className="mx-0">
                    <Buscador setFiltrado={setPermisosFiltro}
                              arr_sin_filtrar={seccion.permisos}
                              buscadores={buscadores}
                              estado_inicial={null} />
                    </thead>
                    }
                    <tbody className="">
                    {((permisosFiltro.length === 0 ? seccion.permisos : permisosFiltro) || []).map((permiso, indicePermiso) =>
                        <tr key={indicePermiso} className="">
                            <td>
                                <div className="mr-2">
                                    <Check key={permiso.id}
                                           ejecuta={() =>actualizaPermiso(seccionIdx, indicePermiso, permiso)}
                                           seleccionado={permiso.aplica} />
                                </div>
                            </td>
                            <td>
                                <div className="mr-5">
                                    {permiso.nombre}
                                </div>
                            </td>
                            <td className="">
                                {permiso.descripcion}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PermisosAsignados;