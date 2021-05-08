import React, { useState, useEffect } from 'react';
import { FaUserTie, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { IoIosSave } from 'react-icons/io';
import TypeAhead from '../../Template/TypeAhead';
import { ocultableDanger } from '../../../services/swalService';
import { guardarRolUsuarios } from '../../../api/adminApi';
import Boton from '../../Template/Boton';
import i18next from "i18next";
import {can} from '../../../services/seguridadService';

const UsuariosAsignados = ({rolSelect, usuarios, setRolSelect }) => {

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});

    useEffect(() => {
        if (typeof usuarioSeleccionado.id !== "undefined") {
            let busqueda = rolSelect.rels_roles.findIndex(usuario => usuario.username.username === usuarioSeleccionado.username);
            if (busqueda === -1) {
                let rels_roles = rolSelect.rels_roles.push({ username: usuarioSeleccionado });
                setRolSelect(Object.assign({}, rolSelect, { rol_rels_roles: rels_roles }));
                setUsuarioSeleccionado({});
            } else {
                ocultableDanger(i18next.t('general:errorUsuario'));
                setUsuarioSeleccionado({});
            }
        }
    }, [usuarioSeleccionado]);

    const eliminaUsuario = (indice) => {
        let rels_roles = rolSelect.rels_roles.splice(indice, 1);
        setRolSelect(Object.assign({}, rolSelect, { rol_rels_roles: rels_roles }));
    }
    const guardarDatos=(rol)=>{
        guardarRolUsuarios(rol).then(res=>console.log('usuario asignado'));
    };
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <Encabezado/>
            <Contenido
                rol={rolSelect}
                usuarios={usuarios}
                usuarioSeleccionado={usuarioSeleccionado}
                setUsuarioSeleccionado={setUsuarioSeleccionado}
                eliminaUsuario={eliminaUsuario}
                guardarDatos={guardarDatos}

            />
        </div>
    );
}

const Encabezado = () => {
    return (
        <div className="card-header d-flex justify-content-between text-center py-0">
            <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                <i className="py-2 px-2">{i18next.t('admin:usuariosAsig')}</i>
            </h5>
        </div>
    );
}

const Contenido = ({ rol, usuarios, setUsuarioSeleccionado, usuarioSeleccionado, eliminaUsuario,guardarDatos }) => {
    return (
        <div className="card-body p-0">
            <div id="div_tabla">
                <div>
                    <div className="text-center mx-2 d-flex text-nowrap">
                        <div className="mt-1">
                            <TypeAhead display={usuarioSeleccionado}
                                       onSelect={setUsuarioSeleccionado}
                                       propBuscada="username"
                                       opciones={usuarios}
                                       correcto={usuarioSeleccionado.id}>
                            </TypeAhead>
                        </div>
                    </div>
                    <div>
                        {(rol.rels_roles || []).map((usuario, index) =>
                            <Renglon key={index}
                                     indice={index}
                                     usuario={usuario}
                                     eliminaUsuario={eliminaUsuario}
                            />
                        )}
                    </div>
                    <div className="my-2 mx-2">
                        <Boton key_texto={i18next.t("general:guardar")}
                               className="btn-outline-success w-100"
                               habilitado={can('admin.guardar_usuarios')}
                               ejecuta={() => guardarDatos(rol)}>
                            <IoIosSave />
                        </Boton>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Renglon = ({ indice, usuario, eliminaUsuario }) => {
    return (
        <div className={"cursor text-center mx-2"}
             key={indice}>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-start">
                    <div className="my-1 mr-1">
                        <span><FaUserTie /></span>
                    </div>
                    <div className="my-1">
                        {usuario.username.username}
                    </div>
                </div>
                <div>
                    <Boton key_texto=""
                           className="btn-outline-danger my-1 p-0"
                           habilitado={true}
                           ejecuta={() => eliminaUsuario(indice)}>
                        <FaTrashAlt />
                    </Boton>
                </div>
            </div>
        </div>
    );
}

export default UsuariosAsignados;