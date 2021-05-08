import React from 'react';
import { useState} from 'react';
import Sort from "../../Template/Sort";
import { ordenarArrPorKey } from "../../../services/sortService";
import i18next from "i18next";
const Roles = ({ roles,setRoles,rolSelect,setRolSelect }) => {
    return (
        <div className="card d-flex mx-4 border-tabla z-depth-2 animated bounceInUp">
            <Encabezado/>
            <Contenido
                roles={roles}
                setRoles={setRoles}
                rolSelect={rolSelect}
                setRolSelect={setRolSelect} />
        </div>
    );
};

const Encabezado = () => {
    return (
        <div className="card-header" className="d-flex justify-content-between text-center py-0">
            <h5 className="text-center text-titulo-tabla txts_gray pt-2">
                <i className="py-2 px-2">{i18next.t('admin:rolDisponible')}</i>
            </h5>
        </div>
    );
}

const Contenido = ({roles,setRoles,rolSelect,setRolSelect }) => {
    const [order, setOrder] = useState({ key: '', asc: true });
    const sort = (key) => {
        setOrder({ key: key, asc: !order.asc });
        setRoles(ordenarArrPorKey(roles, key, order.asc ? 'asc' : 'desc'));
    };
    return (
        <div className="card-body p-0">
            <div id="div_tabla">
                <table className=" table table-condensed responsive hover">
                    <thead className="text-center">
                    <tr>
                        <th>
                            <Sort order={order} posicion={"nombre"} sort={sort} lang={i18next.t('admin:nombre')} />
                        </th>
                    </tr>
                    </thead>

                    <tbody className="text-left">
                    {(roles || []).map((rol) =>
                        <Renglon key={rol.id}
                                 rol={rol}
                                 rolSelect={rolSelect}
                                 setRolSelect={setRolSelect}
                        />
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const Renglon = ({ rol,rolSelect,setRolSelect }) => {
    return (
        <tr className={"cursor "+ (rol.id === rolSelect.id ? 'bg-primary text-white' : '')}
            key={rol.id}
            onClick={() => {
                setRolSelect(rol);
            }}>
            <td>{rol.nombre}</td>
        </tr>
    );
}

export default Roles;