import Homepage from "./components/Homepage/Homepage";
import NotFound from "./components/Template/NotFound";
import PermisosAdmin from "./components/Admin/Permisos/Permisos";
import Rol from "./components/Catalogos/Rol/Rol";
import SeccionPermiso from "./components/Catalogos/SeccionPermiso/SeccionPermiso";
import Permiso from "./components/Catalogos/Permiso/Permiso";
import Configuraciones from "./components/Catalogos/Configuraciones/Configuraciones";
import TipoConfiguracion from "./components/Catalogos/TipoConfiguracion/TipoConfiguracion";
import TipoEquipo from "./components/Catalogos/TipoEquipo/TipoEquipo";
import Equipo from "./components/Catalogos/Equipo/Equipo";
import AreaCA from "./components/Catalogos/AreaCA/AreaCA";
import TipoParametro from "./components/Catalogos/TipoParametro/TipoParametro";
import TipoPM from "./components/Catalogos/TipoPM/TipoPM";
import TipoMuestra from "./components/Catalogos/TipoMuestra/TipoMuestra";
import Parametro from "./components/Catalogos/Parametro/Parametro";
import Analisis from "./components/Catalogos/Analisis/Analisis";
import Pregunta from "./components/Catalogos/Pregunta/Pregunta";
import Motivo from "./components/Catalogos/Motivo/Motivo";
import Configuracion from "./components/Admin/Configuracion/Configuracion";
import EspecificacionEquipo from "./components/Admin/EspecificacionEquipo/EspecificacionEquipo";
import Operaciones from "./components/Operaciones/Operaciones";

const ROUTES=[
    {exact:true, path:'/', component:Homepage},
    {exact:true, path:'/admin/permisos',component:PermisosAdmin},
    {exact:true, path:'/admin/configuracion',component:Configuracion},
    {exact:true, path:'/admin/especificacionEquipo',component:EspecificacionEquipo},
    {exact:true, path:'/catalogos/rol',component:Rol},
    {exact:true, path:'/catalogos/seccionPermiso',component:SeccionPermiso},
    {exact:true, path:'/catalogos/permiso',component:Permiso},
    {exact:true, path:'/catalogos/tipoConfiguracion',component:TipoConfiguracion},
    {exact:true, path:'/catalogos/configuraciones',component:Configuraciones},
    {exact:true, path:'/catalogos/tipoEquipo',component:TipoEquipo},
    {exact:true, path:'/catalogos/equipo',component:Equipo},
    {exact:true, path:'/catalogos/areaCA',component:AreaCA},
    {exact:true, path:'/catalogos/analisis',component:Analisis},
    {exact:true, path:'/catalogos/tipoParametro',component:TipoParametro},
    {exact:true, path:'/catalogos/parametro',component:Parametro},
    {exact:true, path:'/catalogos/tipoPM',component:TipoPM},
    {exact:true, path:'/catalogos/tipoMuestra',component:TipoMuestra},
    {exact:true, path:'/catalogos/pregunta',component:Pregunta},
    {exact:true, path:'/catalogos/motivo',component:Motivo},
    {exact:true, path:'/operaciones',component:Operaciones},
    {component:NotFound}
];
export default ROUTES;
