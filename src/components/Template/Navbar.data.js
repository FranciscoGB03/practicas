import {RiAdminFill} from 'react-icons/ri';
import {FcRules} from "react-icons/fc";
import {BsBook, BsGearWideConnected, BsQuestionSquare, BsGear, BsPencilSquare} from "react-icons/bs";
import {ImUserTie, ImLab} from 'react-icons/im';
import {AiOutlineLineChart, AiOutlineFileSearch, AiOutlineSecurityScan} from 'react-icons/ai';
import {GrConfigure} from 'react-icons/gr';
import {BsGraphUp} from 'react-icons/bs';
import {VscGroupByRefType} from 'react-icons/vsc';
import {BiDevices} from "react-icons/bi";
import {FaReact} from 'react-icons/fa';
import {MdBubbleChart} from 'react-icons/md';
import {IoStatsChart} from 'react-icons/io5';
import {RiHomeGearLine} from 'react-icons/ri';
import {MdDeviceHub} from 'react-icons/md';

/**
 * Estructura de Menu
 * keyLang: Key a cargar en el lang
 * icono: Debe ser importado de react icons
 * permiso: permiso
 * publico: true| false hace referencia de si es publica o no la opción del navbar
 * tipo: navLink | simple | dropdown
 * nlOptions: Propiedades de navlink (to/)
 * onClick: Sólo funciona para tipo simple
 * separador:true|false coloca una linea separadora entre las opciones
 */

export const ITEMS_IZQUIERDA = {
    menus: [
        {
            keyLang: 'navbar:operaciones',
            icono: BsGraphUp,
            permiso: 'navbar.ver_progreso_periodo',
            tipo: 'navlink',
            publico: true,
            nlOptions: {to: '/operaciones'}
        }
    ]
};
export const ITEMS_DERECHA = {
    menus: [
        {
            keyLang: 'admin:admin',
            icono: RiAdminFill,
            permiso: 'navbar.ver_admin',
            publico: false,
            tipo: 'dropdown',
            navlinks: [
                {
                    keyLang: 'admin:especificacionEquipo',
                    to: "/admin/especificacionEquipo",
                    icono: MdDeviceHub,
                    permiso: 'navbar.ver_especificacion_admin',
                    publico: false
                },
                {
                    keyLang: 'admin:configuracion',
                    to: "/admin/configuracion",
                    icono: RiHomeGearLine,
                    permiso: 'navbar.ver_configuracion_admin',
                    publico: false
                },
                {
                    keyLang: 'admin:permisos',
                    to: "/admin/permisos",
                    icono: FcRules,
                    permiso: 'navbar.ver_permisos_admin',
                    publico: false
                }
            ]
        },
        {
            keyLang: 'catalogos:catalogos',
            icono: BsBook,
            permiso: 'navbar.ver_catalogos',
            tipo: 'dropdown',
            publico: false,
            navlinks: [
                {
                    keyLang: 'catalogos:tituloTipoParametro',
                    to: "/catalogos/tipoParametro",
                    icono: AiOutlineLineChart,
                    permiso: 'navbar.ver_tipo_parametro',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloParametro',
                    to: "/catalogos/parametro",
                    icono: IoStatsChart,
                    permiso: 'navbar.ver_parametro',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tipoPM',
                    to: "/catalogos/tipoPM",
                    icono: MdBubbleChart,
                    permiso: 'navbar.ver_tipo_pm',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloTipoMuestra',
                    to: "/catalogos/tipoMuestra",
                    icono: ImLab,
                    permiso: 'navbar.ver_tipo_muestra',
                    publico: false
                },
                {
                    keyLang: 'catalogos:areaCA',
                    to: "/catalogos/areaCA",
                    icono: FaReact,
                    permiso: 'navbar.ver_area_ca',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloAnalisis',
                    to: "/catalogos/analisis",
                    icono: AiOutlineFileSearch,
                    permiso: 'navbar.ver_analisis',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tipoEquipo',
                    to: "/catalogos/tipoEquipo",
                    icono: VscGroupByRefType,
                    permiso: 'navbar.ver_tipo_equipo',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloEquipo',
                    to: "/catalogos/equipo",
                    icono: BiDevices,
                    permiso: 'navbar.ver_equipo',
                    publico: false,
                    separador: true
                },
                {
                    keyLang: 'catalogos:pregunta',
                    to: "/catalogos/pregunta",
                    icono: BsQuestionSquare,
                    permiso: 'navbar.ver_pregunta',
                    publico: false
                },
                {
                    keyLang: 'catalogos:motivo',
                    to: "/catalogos/motivo",
                    icono: BsPencilSquare,
                    permiso: 'navbar.ver_motivo',
                    publico: false,
                    separador: true
                },
                {
                    keyLang: 'catalogos:tituloTipoConfiguracion',
                    to: "/catalogos/tipoConfiguracion",
                    icono: BsGear,
                    permiso: 'navbar.ver_tipo_configuracion',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloConfiguracion',
                    to: "/catalogos/configuraciones",
                    icono: GrConfigure,
                    permiso: 'navbar.ver_configuraciones',
                    publico: false,
                    separador: true
                },
                {
                    keyLang: 'catalogos:roles',
                    to: "/catalogos/rol",
                    icono: ImUserTie,
                    permiso: 'navbar.ver_roles',
                    publico: false
                },
                {
                    keyLang: 'catalogos:tituloSeccionPermisos',
                    to: "/catalogos/seccionPermiso",
                    icono: BsGearWideConnected,
                    permiso: 'navbar.ver_seccion_permisos',
                    publico: false
                },
                {
                    keyLang: 'catalogos:permisos',
                    to: "/catalogos/permiso",
                    icono: AiOutlineSecurityScan,
                    permiso: 'navbar.ver_permiso',
                    publico: false
                }
            ]
        }
    ]
    // menus: [
    //     {
    //         keyLang: 'general.catalogos',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'dropdown',
    //         navlinks: [
    //             {keyLang: 'nose.1', to: "reportes/uno"},
    //             {keyLang: 'nose.1', to: "reportes/dos", icono: FaList},
    //             {keyLang: 'nose.1', to: "reportes/tres"},
    //             {keyLang: 'nose.1', to: "reportes/cuatro"}
    //         ]
    //     },
    //     {
    //         keyLang: 'general.admin',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'dropdown',
    //         navlinks: [
    //             {keyLang: 'nose.1', to: "reportes/uno"},
    //             {keyLang: 'nose.1', to: "reportes/dos", icono: FaList},
    //             {keyLang: 'nose.1', to: "reportes/tres"},
    //             {keyLang: 'nose.1', to: "reportes/cuatro"}
    //         ]
    //     },
    //     {
    //         keyLang: 'general.jobs',
    //         icono: FaList,
    //         visible: true,
    //         tipo: 'navlink',
    //         nlOptions: {to: 'jobs'}
    //     },
    // ]
};