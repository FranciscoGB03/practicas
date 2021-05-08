import React from 'react';
import {useState, useEffect} from 'react';
import Template from "../../Template/Template";
import Titulo from "../../Template/Titulo";
import Roles from './Roles';
import UsuariosAsignados from './UsuariosAsignados';
import PermisosAsignados from './PermisosAsignados';
import {getCatalogos} from '../../../api/catalogosApi';
import SinSesion from '../../Template/SinSesion';
import {isLogged} from "../../../services/authService";
import {useTranslation} from "react-i18next";
import {FcRules} from "react-icons/fc";
import {cerrarAlert} from "../../../services/swalService";


const PermisosAdmin = () => {
    //|------Hooks------|//
    const [t] = useTranslation(['admin'])
    const [roles, setRoles] = useState([]);
    const [rolSelect, setRolSelect] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [seccionesAsig, setSeccionesAsig] = useState([]);
    //Banderas
    //|------./Hooks------|//
    //|-----------useEffects----------|//
    useEffect(() => {
        cargarDatosIniciales()
    }, [])
    //|----------./useEffects----------|//
    const cargarDatosIniciales = () => {
        {
            getCatalogos([
                {nombre: 'seccion_permiso', relaciones: ['permisos'], metodo: 'orderBy'},
                {
                    nombre: 'rol',
                    metodo: 'orderBy',
                    relaciones: ['rels_rol_permiso', 'rels_roles.username.username_trabajadores.trabajador']
                },
                {nombre: 'username', relaciones: [], metodo: 'orderBy'}
            ]).then(res => {
                setRoles(res.rol.data);
                setSeccionesAsig(res.seccion_permiso.data);
                setUsuarios(res.username.data);
                cerrarAlert();
            });
        }

    }
    //|------./Datos iniciales------|//
    return (
        <Template>
            {isLogged() ?
                <div>
                    <div>
                        <Titulo titulo={t('admin:tituloPermiso')} icono={FcRules}/>
                        <div className=" d-flex justify-content-center flex-wrap">
                            <div className="mb-2">
                                <Roles
                                    roles={roles}
                                    setRoles={setRoles}
                                    rolSelect={rolSelect}
                                    setRolSelect={setRolSelect}/>
                            </div>
                            {(rolSelect.id != null) &&
                            <div className="d-flex flex-wrap">
                                <div>
                                    <UsuariosAsignados
                                        rolSelect={rolSelect}
                                        usuarios={usuarios}
                                        setRolSelect={setRolSelect}
                                    />
                                </div>
                                <div>
                                    <PermisosAsignados
                                        seccionesAsig={seccionesAsig}
                                        setSeccionesAsig={setSeccionesAsig}
                                        rolSelect={rolSelect}
                                    />
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                : <SinSesion/>
            }
        </Template>
    );
}

export default PermisosAdmin;